import { useAppContext } from '../context/AppContext';
import { Bell, Search, Hexagon } from 'lucide-react';

export default function Navbar() {
  const { user } = useAppContext();

  return (
    <header className="h-20 border-b border-[var(--color-dark-border)] bg-[var(--color-dark-bg)]/50 backdrop-blur-md flex items-center justify-between px-10 z-10 sticky top-0">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] transition-colors group-focus-within:text-[var(--color-neon-blue)]" size={18} />
          <input 
            type="text" 
            placeholder="Search the realm..." 
            className="w-full bg-[var(--color-dark-panel)] border border-[var(--color-dark-border)] rounded-2xl py-2.5 pl-12 pr-4 text-sm outline-none focus:border-[var(--color-neon-blue)]/50 focus:ring-4 focus:ring-[var(--color-neon-blue)]/5 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-8">
        <button className="relative p-2.5 glass-card rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-neon-blue)] hover:border-[var(--color-neon-blue)]/30 transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[var(--color-neon-blue)] rounded-full animate-ping opacity-75"></span>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[var(--color-neon-blue)] rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-5 glass-card pl-5 pr-2 py-1.5 rounded-2xl hover:border-[var(--color-neon-blue)]/20">
          <div className="flex flex-col items-end">
            <span className="text-sm font-extrabold tracking-tight">{user.name}</span>
            <span className="text-[10px] text-[var(--color-neon-blue)] font-black uppercase tracking-widest opacity-80">
              Grandmaster
            </span>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-[var(--color-neon-purple)] rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-[var(--color-dark-bg)] border-2 border-[var(--color-neon-purple)] rounded-xl w-11 h-11 flex items-center justify-center font-black text-sm shadow-lg">
              {user.level}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

