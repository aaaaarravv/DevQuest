import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../lib/api';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Player One',
    level: 1,
    xp: 0,
    nextLevelXp: 1000,
    isAuthenticated: false,
  });

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState('## Welcome to DevQuest\n\nWrite your thoughts here...');
  const [hasClaimedDaily, setHasClaimedDaily] = useState(false);

  // Settings state
  const [theme, setTheme] = useState(() => localStorage.getItem('devquest-theme') || 'midnight');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [soundsEnabled, setSoundsEnabled] = useState(true);

  // ─── Apply theme ────────────────────────────────────────────────────────────

  useEffect(() => {
    document.body.className = `theme-${theme}`;
    localStorage.setItem('devquest-theme', theme);
  }, [theme]);

  // ─── Auto-login from stored token ───────────────────────────────────────────

  useEffect(() => {
    const token = api.getToken();
    if (!token) return;

    api.auth.me()
      .then(({ user: u }) => {
        setUser({
          name: u.name,
          level: u.level,
          xp: u.xp,
          nextLevelXp: u.next_level_xp,
          isAuthenticated: true,
          characterClass: u.character_class,
          hasClaimedDaily: u.has_claimed_daily,
        });
        setHasClaimedDaily(u.has_claimed_daily);
      })
      .catch(() => {
        // Token expired or invalid — clear it
        api.clearToken();
      });
  }, []);

  // ─── Fetch data when authenticated ──────────────────────────────────────────

  useEffect(() => {
    if (!user.isAuthenticated) return;

    const fetchData = async () => {
      try {
        const [pRes, tRes, nRes] = await Promise.all([
          api.projects.list(),
          api.tasks.list(),
          api.notes.get(),
        ]);
        setProjects(pRes.projects || []);
        setTasks(tRes.tasks || []);
        setNotes(nRes.content || '');
      } catch (err) {
        console.error('Failed to load data:', err.message);
      }
    };

    fetchData();
  }, [user.isAuthenticated]);

  // ─── Projects ───────────────────────────────────────────────────────────────

  const addProject = async (project) => {
    const tempId = `temp-${Date.now()}`;
    setProjects(prev => [...prev, { ...project, _id: tempId, progress: 0 }]);
    try {
      const { project: saved } = await api.projects.create({ ...project, progress: 0 });
      setProjects(prev => prev.map(p => p._id === tempId ? saved : p));
    } catch (err) {
      console.error('Failed to save project:', err.message);
      setProjects(prev => prev.filter(p => p._id !== tempId));
    }
  };

  const deleteProject = async (id) => {
    setProjects(prev => prev.filter(p => p._id !== id && p.id !== id));
    try {
      await api.projects.remove(id);
    } catch (err) {
      console.error('Failed to delete project:', err.message);
    }
  };

  const updateProject = async (id, updates) => {
    setProjects(prev => prev.map(p => (p._id === id || p.id === id) ? { ...p, ...updates } : p));
    try {
      await api.projects.update(id, updates);
    } catch (err) {
      console.error('Failed to update project:', err.message);
    }
  };

  // ─── Tasks ──────────────────────────────────────────────────────────────────

  const addTask = async (task) => {
    const tempId = `temp-${Date.now()}`;
    setTasks(prev => [...prev, { ...task, _id: tempId, completed: false }]);
    try {
      const { task: saved } = await api.tasks.create({ ...task, completed: false });
      setTasks(prev => prev.map(t => t._id === tempId ? saved : t));
    } catch (err) {
      console.error('Failed to save task:', err.message);
      setTasks(prev => prev.filter(t => t._id !== tempId));
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t._id === id || t.id === id);
    if (!task) return;

    const newCompleted = !task.completed;
    setTasks(prev => prev.map(t => (t._id === id || t.id === id) ? { ...t, completed: newCompleted } : t));

    try {
      const { xpGained } = await api.tasks.update(id, { completed: newCompleted });
      if (xpGained) addXp(xpGained);
    } catch (err) {
      console.error('Failed to toggle task:', err.message);
      // Revert
      setTasks(prev => prev.map(t => (t._id === id || t.id === id) ? { ...t, completed: task.completed } : t));
    }
  };

  const deleteTask = async (id) => {
    setTasks(prev => prev.filter(t => t._id !== id && t.id !== id));
    try {
      await api.tasks.remove(id);
    } catch (err) {
      console.error('Failed to delete task:', err.message);
    }
  };

  // ─── Notes ──────────────────────────────────────────────────────────────────

  const saveNotes = async (content) => {
    setNotes(content);
    try {
      await api.notes.save(content);
    } catch (err) {
      console.error('Failed to save notes:', err.message);
    }
  };

  // ─── XP / Leveling ──────────────────────────────────────────────────────────

  const addXp = (amount) => {
    setUser(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let nextLevel = prev.nextLevelXp;
      if (newXp >= nextLevel) {
        newLevel += 1;
        newXp -= nextLevel;
        nextLevel = Math.floor(nextLevel * 1.2);
      }
      return { ...prev, xp: newXp, level: newLevel, nextLevelXp: nextLevel };
    });
  };

  const claimDaily = async () => {
    if (hasClaimedDaily) return;
    try {
      const { xpGained } = await api.auth.claimDaily();
      addXp(xpGained);
      setHasClaimedDaily(true);
    } catch (err) {
      if (err.status === 409) setHasClaimedDaily(true); // already claimed
      else console.error('Failed to claim daily:', err.message);
    }
  };

  // ─── Auth ────────────────────────────────────────────────────────────────────

  const loginExistingUser = async (email, password) => {
    const { token, user: u } = await api.auth.login(email, password);
    api.setToken(token);
    setUser({
      name: u.name,
      level: u.level,
      xp: u.xp,
      nextLevelXp: u.next_level_xp,
      isAuthenticated: true,
      characterClass: u.character_class,
    });
    setHasClaimedDaily(u.has_claimed_daily);
  };

  const registerNewUser = async (name, email, password, character_class = 'warrior') => {
    const { token, user: u } = await api.auth.register(name, email, password, character_class);
    api.setToken(token);
    setUser({
      name: u.name,
      level: u.level,
      xp: u.xp,
      nextLevelXp: u.next_level_xp,
      isAuthenticated: true,
      characterClass: u.character_class,
    });
    setProjects([]);
    setTasks([]);
    setHasClaimedDaily(false);
  };

  const logoutUser = () => {
    api.clearToken();
    setUser({ name: 'Player One', level: 1, xp: 0, nextLevelXp: 1000, isAuthenticated: false });
    setProjects([]);
    setTasks([]);
    setNotes('');
    setHasClaimedDaily(false);
  };

  return (
    <AppContext.Provider value={{
      user, setUser,
      projects, addProject, deleteProject, updateProject,
      tasks, addTask, toggleTask, deleteTask,
      notes, setNotes: saveNotes,
      addXp,
      hasClaimedDaily, claimDaily,
      loginExistingUser,
      registerNewUser,
      logoutUser,
      theme, setTheme,
      animationsEnabled, setAnimationsEnabled,
      particlesEnabled, setParticlesEnabled,
      soundsEnabled, setSoundsEnabled,
    }}>
      {children}
    </AppContext.Provider>
  );
};
