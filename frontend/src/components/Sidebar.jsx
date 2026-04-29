import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Target, CheckSquare, FileText, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { GitGuildLogo } from './GitGuildLogo';

export default function Sidebar() {
  const navigate = useNavigate();

  const links = [
    { to: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { to: '/projects', name: 'Quests', icon: <Target size={20} /> },
    { to: '/tasks', name: 'Task Log', icon: <CheckSquare size={20} /> },
    { to: '/notes', name: 'Grimoire', icon: <FileText size={20} /> },
    { to: '/github', name: 'Armory', icon: <GithubIcon size={20} /> },
    { to: '/settings', name: 'Settings', icon: <SettingsIcon size={20} /> },
  ];

  return (
    <div className="w-64 glass-panel border-y-0 border-l-0 rounded-none h-full flex flex-col pt-8 z-10">
      <div className="px-8 mb-10 flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/')}>
        <div className="flex-shrink-0 transition-transform duration-500 group-hover:rotate-[360deg]">
           <GitGuildLogo className="w-10 h-10 drop-shadow-[0_0_12px_var(--neon-glow)]" />
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-[var(--color-text-primary)]">
          Dev<span className="text-[var(--color-neon-blue)]">Quest</span>
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active shadow-lg shadow-[var(--color-neon-blue)]/10 font-bold' : ''}`
            }
          >
            <span className="transition-transform duration-300 group-hover:scale-110">{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-6 mt-auto space-y-4">
        <button 
          onClick={() => navigate('/login')}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 glass-card border-red-500/10 text-red-400 hover:text-red-300 hover:border-red-500/40 hover:bg-red-500/5 transition-all font-bold uppercase tracking-widest text-xs"
        >
          <LogOut size={16} /> Logout
        </button>
        <div className="text-[10px] text-center text-[var(--color-text-secondary)] font-medium uppercase tracking-[0.2em] opacity-40">
          Release 1.2.4
        </div>
      </div>
    </div>
  );
}

