import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CheckSquare, Plus, Trash2, Circle, CheckCircle2 } from 'lucide-react';

export default function Tasks() {
  const { tasks, addTask, toggleTask, deleteTask, addXp } = useAppContext();
  const [newTask, setNewTask] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask({ title: newTask, difficulty });
    setNewTask('');
  };

  const handleToggle = (id, prevCompleted, diff) => {
    toggleTask(id);
    if (!prevCompleted) {
      // Award XP when completing a task
      let xpAward = 10;
      if (diff === 'medium') xpAward = 25;
      if (diff === 'hard') xpAward = 50;
      addXp(xpAward);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between animate-fade-in-up">
         <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
               <CheckSquare className="text-[var(--color-neon-green)]" size={32} /> Task Board
            </h1>
            <p className="text-[var(--color-text-secondary)] mt-2">Complete tasks to earn XP and level up.</p>
         </div>
         <div className="flex items-center gap-2 bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] px-4 py-2 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-[var(--color-neon-green)] animate-pulse"></span>
            <span className="text-sm font-bold">{tasks.filter(t => !t.completed).length} active</span>
         </div>
      </div>

      <div className="glass-panel p-6 mb-8 animate-fade-in-up delay-100 opacity-0 relative z-20">
        <form onSubmit={handleAddTask} className="flex gap-4">
          <input 
            type="text" 
            value={newTask} onChange={e => setNewTask(e.target.value)}
            placeholder="What needs to be done?" 
            className="flex-1 bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-lg p-3 outline-none focus:border-[var(--color-neon-green)]"
          />
          <select 
            value={difficulty} onChange={e => setDifficulty(e.target.value)}
            className="bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-lg p-3 outline-none focus:border-[var(--color-neon-green)] px-4"
          >
            <option value="easy">Easy (10 XP)</option>
            <option value="medium">Medium (25 XP)</option>
            <option value="hard">Hard (50 XP)</option>
          </select>
          <button type="submit" className="game-button bg-[var(--color-neon-green)] text-[var(--color-dark-bg)] font-bold px-6 rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.4)]">
            <Plus size={20} /> Add
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div 
            key={task.id} 
            style={{ animationDelay: `${(index % 5 + 2) * 100}ms` }}
            className={`glass-panel p-4 flex items-center gap-4 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01] hover:z-10 animate-fade-in-up opacity-0 shadow-sm hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] overflow-hidden relative group ${
              task.completed ? 'opacity-60 border-[var(--color-neon-green)]/30 bg-[var(--color-dark-bg)]/80 scale-[0.98]' : 'hover:border-[var(--color-neon-green)]/50'
            }`}
          >
            {/* Background dynamic glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-neon-green)]/0 via-[var(--color-neon-green)]/0 to-[var(--color-neon-green)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <button 
              onClick={() => handleToggle(task.id, task.completed, task.difficulty)}
              className="text-[var(--color-neon-green)] flex-shrink-0 focus:outline-none transition-transform hover:scale-125 relative z-10"
            >
              {task.completed ? <CheckCircle2 size={24} className="drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]" /> : <Circle size={24} />}
            </button>
            
            <span className={`flex-1 text-lg z-10 transition-colors ${task.completed ? 'line-through text-gray-500' : 'text-[var(--color-text-primary)] group-hover:text-white'}`}>
              {task.title}
            </span>
            
            <div className="flex items-center gap-4 z-10">
               <span className={`text-[10px] px-3 py-1 rounded-full uppercase font-bold tracking-wider shadow-sm transition-colors group-hover:shadow-md ${
                 task.difficulty === 'hard' ? 'bg-red-500/10 text-red-400 border border-red-500/20 group-hover:bg-red-500/20 group-hover:border-red-500/40 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.4)]' :
                 task.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 group-hover:bg-yellow-500/20 group-hover:border-yellow-500/40 group-hover:shadow-[0_0_8px_rgba(234,179,8,0.4)]' :
                 'bg-green-500/10 text-green-400 border border-green-500/20 group-hover:bg-green-500/20 group-hover:border-green-500/40 group-hover:shadow-[0_0_8px_rgba(34,197,94,0.4)]'
               }`}>
                 {task.difficulty}
               </span>
               <button 
                 onClick={() => deleteTask(task.id)}
                 className="text-gray-500 hover:text-red-500 transition-all p-2 rounded-lg hover:bg-red-500/10 hover:rotate-12 hover:scale-110"
               >
                 <Trash2 size={18} />
               </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-20 bg-[var(--color-dark-bg)]/50 rounded-xl border border-dashed border-[var(--color-dark-border)] hover:border-[var(--color-neon-green)]/50 transition-colors duration-500 group">
             <CheckSquare size={48} className="mx-auto text-gray-600 mb-4 opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--color-neon-green)] group-hover:opacity-80 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
             <p className="text-gray-500 transition-colors group-hover:text-gray-400">Your task board is empty. Add a task above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
