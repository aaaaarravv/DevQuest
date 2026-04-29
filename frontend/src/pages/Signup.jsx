import { Link, useNavigate } from 'react-router-dom';
import { Fingerprint, Cpu, Sparkles, User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { GitGuildLogo } from '../components/GitGuildLogo';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedClass, setSelectedClass] = useState('warrior');
  const [isRegistering, setIsRegistering] = useState(false);
  const [statusText, setStatusText] = useState('');
  const navigate = useNavigate();
  const { registerNewUser } = useAppContext();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    
    setIsRegistering(true);
    setStatusText('ALLOCATING SOUL SHARD...');

    try {
      setTimeout(() => setStatusText('FORGING CHARACTER RECORD...'), 600);
      await registerNewUser(name, email, password, selectedClass || 'warrior');
      setStatusText('REALM ACCESS AUTHORIZED');
      setTimeout(() => navigate('/'), 600);
    } catch (err) {
      setIsRegistering(false);
      setStatusText('');
      alert(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden font-sans selection:bg-[var(--color-neon-purple)] selection:text-white">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-black to-blue-900/20"></div>
        {/* Animated Particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-full animate-float pointer-events-none"
              style={{
                width: Math.random() * 3 + 'px',
                height: Math.random() * 3 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 8 + 7 + 's'
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-xl px-4 relative z-10 flex flex-col items-center">
        
        {/* Logo Section */}
        <div className="mb-10 text-center">
           <div className="relative mb-6 inline-block">
             <div className="absolute inset-0 bg-[var(--color-neon-purple)] blur-3xl opacity-20 animate-pulse"></div>
             <div className="w-20 h-20 relative z-10 drop-shadow-[0_0_15px_var(--color-neon-purple)]">
                <GitGuildLogo className="w-full h-full text-white" />
             </div>
           </div>
           <h1 className="text-4xl font-black tracking-tighter text-white">
             Create <span className="text-[var(--color-neon-purple)]">Legend</span>
           </h1>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mt-2">New Character Initialization</p>
        </div>

        <div className="w-full glass-panel p-10 bg-white/[0.02] border-white/5 relative overflow-hidden">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-neon-purple)]/10 blur-[60px]"></div>
          
          {!isRegistering ? (
            <form onSubmit={handleSignup} className="space-y-6 relative z-10">
              
              <div className="space-y-2">
                 <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Character Name</label>
                 <div className="relative group">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--color-neon-purple)] transition-colors" />
                    <input 
                      type="text" required
                      value={name} onChange={e => setName(e.target.value)}
                      placeholder="e.g. ShadowCoder"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[var(--color-neon-purple)]/50 focus:ring-4 focus:ring-[var(--color-neon-purple)]/5 transition-all"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Uplink Address (Email)</label>
                 <div className="relative group">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--color-neon-purple)] transition-colors" />
                    <input 
                      type="email" required
                      value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="hero@realm.dev"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[var(--color-neon-purple)]/50 focus:ring-4 focus:ring-[var(--color-neon-purple)]/5 transition-all"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Secure Passcode</label>
                 <div className="relative group">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--color-neon-purple)] transition-colors" />
                    <input 
                      type="password" required
                      value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[var(--color-neon-purple)]/50 focus:ring-4 focus:ring-[var(--color-neon-purple)]/5 transition-all"
                    />
                 </div>
              </div>

              <div className="pt-6">
                 <button 
                   type="submit" 
                   className="w-full h-16 bg-gradient-to-r from-[var(--color-neon-purple)] to-purple-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-1 transition-all"
                 >
                    Begin Journey
                 </button>
              </div>
              
              <div className="text-center">
                 <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-[var(--color-neon-purple)] transition-colors">
                    Character already exists? Log in
                 </Link>
              </div>
            </form>
          ) : (
            <div className="py-16 flex flex-col items-center justify-center">
               <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[var(--color-neon-purple)] border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <ShieldCheck size={32} className="text-[var(--color-neon-purple)] animate-pulse" />
                  </div>
               </div>
               <div className="text-sm font-black text-[var(--color-neon-purple)] uppercase tracking-[0.3em] animate-pulse">
                 {statusText}
               </div>
            </div>
          )}
        </div>
        
        {/* Footer info */}
        <div className="mt-8 flex items-center gap-4 text-[10px] font-bold text-white/20 uppercase tracking-widest">
           <div className="flex items-center gap-1"><Cpu size={12} /> Server: Alpha-01</div>
           <div className="w-1 h-1 bg-white/10 rounded-full"></div>
           <div className="flex items-center gap-1"><Sparkles size={12} /> Version: 1.2.4</div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-80px) translateX(15px); opacity: 0.5; }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
