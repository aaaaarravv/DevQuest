import { useAppContext } from '../context/AppContext';
import { Target, CheckSquare, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, projects, tasks, hasClaimedDaily, claimDaily } = useAppContext();

  const xpPercentage = Math.round((user.xp / user.nextLevelXp) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in-up">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Welcome Back, <span className="text-[var(--color-neon-blue)] drop-shadow-[0_0_15px_var(--neon-glow)]">{user.name}</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg">The realm is evolving. Continue your legend to unlock new powers.</p>
        </div>
        <button 
          onClick={claimDaily}
          disabled={hasClaimedDaily}
          className={`group relative overflow-hidden px-8 py-3.5 rounded-2xl transition-all duration-300 font-black uppercase tracking-[0.2em] text-sm ${
            hasClaimedDaily 
              ? 'bg-[var(--color-dark-panel)] text-gray-500 border border-[var(--color-dark-border)] opacity-60' 
              : 'game-button'
          }`}
        >
          <div className="flex items-center gap-3 relative z-10">
            <Zap size={18} className={hasClaimedDaily ? 'text-gray-600' : 'animate-pulse'} fill="currentColor" />
            {hasClaimedDaily ? 'Reward Claimed' : 'Claim Daily Loot'}
          </div>
        </button>
      </div>

      <div className="glass-panel p-10 relative overflow-hidden animate-fade-in-up delay-100 opacity-0 group">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-neon-blue)] rounded-full mix-blend-screen filter blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-neon-purple)] rounded-full mix-blend-screen filter blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
          <div className="relative">
            <div className="w-40 h-40 rounded-3xl bg-[var(--color-dark-bg)] border-2 border-[var(--color-dark-border)] flex items-center justify-center p-2 relative overflow-hidden group-hover:border-[var(--color-neon-blue)]/50 transition-colors">
               <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-neon-blue)]/10 to-transparent"></div>
               <div className="text-center relative z-10">
                 <div className="text-5xl font-black text-[var(--color-text-primary)] drop-shadow-[0_0_10px_var(--neon-glow)]">{user.level}</div>
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-secondary)] mt-1">Level</div>
               </div>
            </div>
            {/* Progress ring decoration */}
            <div className="absolute -inset-4 border border-[var(--color-dark-border)] rounded-[2.5rem] opacity-20 group-hover:scale-110 transition-transform"></div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">Experience Mastery</span>
                <h3 className="text-2xl font-bold mt-1">Path to Sovereignty</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[var(--color-neon-blue)]">{user.xp}</span>
                <span className="text-sm font-bold text-[var(--color-text-secondary)] ml-2">/ {user.nextLevelXp} XP</span>
              </div>
            </div>
            <div className="h-4 bg-[var(--color-dark-bg)] rounded-full overflow-hidden border border-[var(--color-dark-border)] p-1 flex items-center">
              <div 
                className="h-full bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-full relative transition-all duration-1000 ease-out"
                style={{ width: `${xpPercentage}%` }}
              >
                <div className="absolute inset-0 bg-[image:linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[move_2s_linear_infinite]"></div>
              </div>
            </div>
            <style>{`
              @keyframes move {
                from { background-position: 0 0; }
                to { background-position: 40px 0; }
              }
            `}</style>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="glass-card p-8 flex flex-col h-[450px] animate-fade-in-up delay-200 opacity-0">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-4">
              <div className="w-10 h-10 bg-[var(--color-neon-purple)]/10 rounded-xl flex items-center justify-center">
                <Target size={20} className="text-[var(--color-neon-purple)]" />
              </div>
              Legendary Quests
            </h2>
            <Link to="/projects" className="text-xs font-black uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-neon-purple)] transition-colors">Explorer All</Link>
          </div>
          
          <div className="space-y-4 overflow-y-auto flex-1 pr-3 custom-scrollbar">
            {projects.map(project => (
              <div key={project.id} className="group glass-card p-5 hover:border-[var(--color-neon-purple)]/50 cursor-pointer relative overflow-hidden transition-all duration-300">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-neon-purple)] opacity-20 group-hover:opacity-100 transition-all"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-[var(--color-neon-purple)] transition-colors">{project.title}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">Quest Timeline: {project.days} cycles remaining</p>
                  </div>
                  <div className="text-xl font-black opacity-20 group-hover:opacity-100 transition-opacity">{project.progress}%</div>
                </div>
                <div className="h-1.5 bg-[var(--color-dark-bg)] rounded-full overflow-hidden border border-[var(--color-dark-border)]">
                  <div className="h-full bg-[var(--color-neon-purple)] shadow-[0_0_10px_var(--color-neon-purple)]" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-[var(--color-text-secondary)]">
                <div className="opacity-20 mb-4 scale-150"><Target size={48} /></div>
                <p className="font-bold uppercase tracking-widest text-xs">No active quests found</p>
              </div>
            )}
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col h-[450px] animate-fade-in-up delay-300 opacity-0">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-4">
              <div className="w-10 h-10 bg-[var(--color-neon-green)]/10 rounded-xl flex items-center justify-center">
                <CheckSquare size={20} className="text-[var(--color-neon-green)]" />
              </div>
              Daily Targets
            </h2>
            <Link to="/tasks" className="text-xs font-black uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-neon-green)] transition-colors">Strategize</Link>
          </div>
          
          <div className="space-y-4 overflow-y-auto flex-1 pr-3 custom-scrollbar">
            {tasks.slice(0, 5).map(task => (
              <div key={task.id} className="flex items-center gap-5 glass-card p-4 hover:border-[var(--color-neon-green)]/30 transition-all group">
                <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${
                  task.completed ? 'bg-[var(--color-neon-green)] border-[var(--color-neon-green)]' : 'border-[var(--color-dark-border)] group-hover:border-[var(--color-neon-green)]/50'
                }`}>
                  {task.completed && <CheckSquare size={14} className="text-white" />}
                </div>
                <span className={`flex-1 font-bold text-sm transition-all ${task.completed ? 'text-[var(--color-text-secondary)] line-through opacity-50' : 'text-[var(--color-text-primary)]'}`}>
                  {task.title}
                </span>
                <span className={`text-[9px] px-3 py-1 rounded-lg uppercase font-black tracking-widest ${
                  task.difficulty === 'hard' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  task.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                  'bg-green-500/10 text-green-400 border border-green-500/20'
                }`}>
                  {task.difficulty}
                </span>
              </div>
            ))}
             {tasks.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-[var(--color-text-secondary)]">
                <div className="opacity-20 mb-4 scale-150"><CheckSquare size={48} /></div>
                <p className="font-bold uppercase tracking-widest text-xs">All objectives complete</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

