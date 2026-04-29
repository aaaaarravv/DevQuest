import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Target, Plus, X, Server, Layers } from 'lucide-react';

export default function Projects() {
  const { projects, addProject, deleteProject } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newQuest, setNewQuest] = useState({ title: '', theme: '', techStack: '', days: 7, description: '' });

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newQuest.title) return;
    addProject(newQuest);
    setIsModalOpen(false);
    setNewQuest({ title: '', theme: '', techStack: '', days: 7, description: '' });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Target className="text-[var(--color-neon-purple)]" size={32} /> Quests Registry
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-2">Manage your active projects and milestones.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="game-button bg-[var(--color-neon-purple)] text-white px-5 py-2.5 flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
        >
          <Plus size={18} /> Add Quest
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            onClick={() => setSelectedProject(project)}
            className="glass-panel overflow-hidden group animate-fade-in-up opacity-0 cursor-pointer hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:border-[var(--color-neon-purple)]/50 focus-within:border-[var(--color-neon-purple)]" 
            style={{ animationDelay: `${(index % 3 + 1) * 100}ms` }}
          >
            <div className="h-2 bg-[var(--color-dark-bg)]">
              <div className="h-full bg-[var(--color-neon-purple)] transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:neon-text-purple transition-all">{project.title}</h3>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }} 
                  className="text-gray-500 hover:text-red-500 transition-colors bg-[var(--color-dark-bg)] p-1.5 rounded-md hover:bg-red-500/10 z-10"
                >
                  <X size={18} />
                </button>
              </div>
              
              <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2">
                {project.description}
              </p>
              
              <div className="bg-[var(--color-dark-bg)] p-3 rounded-lg border border-[var(--color-dark-border)] mb-4 flex flex-col gap-2">
                 <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Server size={14} className="text-[var(--color-neon-blue)]" /> {project.techStack}
                 </div>
                 <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Layers size={14} className="text-[var(--color-neon-green)]" /> Theme: {project.theme}
                 </div>
              </div>

              <div className="flex items-center justify-between mt-4 text-sm">
                <span className="bg-[var(--color-dark-panel)] px-3 py-1 rounded-full border border-[var(--color-dark-border)]">
                  {project.days} days remain
                </span>
                <span className="font-bold text-[var(--color-neon-purple)]">{project.progress}% Complete</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-panel w-full max-w-md p-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">New Quest Request</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-[var(--color-text-secondary)]">Quest Title</label>
                <input 
                  type="text" required
                  value={newQuest.title} onChange={e => setNewQuest({...newQuest, title: e.target.value})}
                  className="w-full bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-lg p-2.5 outline-none focus:border-[var(--color-neon-purple)] transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-[var(--color-text-secondary)]">Theme</label>
                  <input 
                    type="text" 
                    value={newQuest.theme} onChange={e => setNewQuest({...newQuest, theme: e.target.value})}
                    className="w-full bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-lg p-2.5 outline-none focus:border-[var(--color-neon-purple)]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-[var(--color-text-secondary)]">Time Limit (Days)</label>
                  <input 
                    type="number" min="1" required
                    value={newQuest.days} onChange={e => setNewQuest({...newQuest, days: parseInt(e.target.value)})}
                    className="w-full bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-lg p-2.5 outline-none focus:border-[var(--color-neon-purple)]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1 text-[var(--color-text-secondary)]">Tech Stack</label>
                <input 
                  type="text" 
                  value={newQuest.techStack} onChange={e => setNewQuest({...newQuest, techStack: e.target.value})}
                  className="w-full bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-lg p-2.5 outline-none focus:border-[var(--color-neon-purple)]"
                  placeholder="React, Node, etc."
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-[var(--color-text-secondary)]">Quest Description</label>
                <textarea 
                  rows="3"
                  value={newQuest.description} onChange={e => setNewQuest({...newQuest, description: e.target.value})}
                  className="w-full bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-lg p-2.5 outline-none focus:border-[var(--color-neon-purple)] resize-none"
                ></textarea>
              </div>
              
              <button type="submit" className="w-full game-button bg-[var(--color-neon-purple)] text-white py-3 rounded-lg mt-4 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                Commission Quest
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedProject(null)}>
          <div className="glass-panel w-full max-w-2xl p-0 animate-in zoom-in-95 overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="h-2 bg-[var(--color-dark-bg)] w-full">
               <div className="h-full bg-[var(--color-neon-purple)] transition-all duration-1000" style={{ width: `${selectedProject.progress}%` }}></div>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-wider">{selectedProject.title}</h2>
                  <div className="flex items-center gap-3 mt-2">
                     <span className="text-xs bg-[var(--color-neon-purple)]/20 text-[var(--color-neon-purple)] px-2 py-1 border border-[var(--color-neon-purple)]/30 rounded uppercase tracking-widest font-bold">
                        Theme: {selectedProject.theme}
                     </span>
                     <span className="text-xs bg-[var(--color-neon-blue)]/20 text-[var(--color-neon-blue)] px-2 py-1 border border-[var(--color-neon-blue)]/30 rounded uppercase tracking-widest font-bold">
                        {selectedProject.techStack}
                     </span>
                  </div>
                </div>
                <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-white bg-[var(--color-dark-bg)] p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="mt-8 mb-8 grid grid-cols-2 gap-4">
                 <div className="bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] p-4 rounded-xl flex flex-col justify-between">
                    <span className="text-xs text-gray-500 tracking-widest uppercase mb-1">Time Remaining</span>
                    <span className="text-2xl font-bold">{selectedProject.days} Days</span>
                 </div>
                 <div className="bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] p-4 rounded-xl flex flex-col justify-between">
                    <span className="text-xs text-gray-500 tracking-widest uppercase mb-1">Overall Progress</span>
                    <span className="text-2xl font-bold text-[var(--color-neon-purple)]">{selectedProject.progress}%</span>
                 </div>
              </div>

              <div className="mb-8">
                 <h3 className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-4">Mission Directives</h3>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                       <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                         <svg className="w-3 h-3 text-[var(--color-dark-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                       </div>
                       <span className="text-gray-300 text-sm line-through">Initialize core repository and scaffold architecture</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[var(--color-neon-purple)]/10 border border-[var(--color-neon-purple)]/40 rounded-lg relative overflow-hidden group">
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-neon-purple)]"></div>
                       <div className="w-5 h-5 rounded-full border-2 border-[var(--color-neon-purple)] flex items-center justify-center flex-shrink-0 relative">
                          <div className="w-2 h-2 bg-[var(--color-neon-purple)] rounded-full animate-pulse"></div>
                       </div>
                       <span className="text-white font-bold text-sm">Implement main features & UI components</span>
                       <span className="ml-auto text-[10px] bg-[var(--color-neon-purple)] text-white px-2 py-0.5 rounded uppercase tracking-wider">Active</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-lg opacity-50">
                       <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex items-center justify-center flex-shrink-0">
                       </div>
                       <span className="text-gray-400 text-sm">Deploy to production environment</span>
                       <span className="ml-auto text-[10px] border border-gray-600 text-gray-400 px-2 py-0.5 rounded uppercase tracking-wider">Locked</span>
                    </div>
                 </div>
              </div>
              
              <div className="bg-[#050B14] border border-[var(--color-neon-blue)]/30 rounded-xl p-5 relative overflow-hidden">
                 <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-neon-blue)]/10 to-transparent pointer-events-none"></div>
                 <h3 className="text-xs font-bold text-[var(--color-neon-blue)] uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Target size={14} /> Next Action Required
                 </h3>
                 <p className="text-white text-sm font-light">
                    You currently have <strong className="text-[var(--color-neon-purple)]">2 sub-tasks</strong> remaining to complete the active directive. Proceed to the Task Board to execute.
                 </p>
                 <button onClick={() => setSelectedProject(null)} className="mt-4 bg-[var(--color-dark-panel)] border border-[var(--color-dark-border)] hover:border-[var(--color-neon-blue)] text-white text-xs uppercase px-4 py-2 rounded font-bold transition-all hover:bg-[var(--color-neon-blue)]/10">
                    Acknowledge
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
