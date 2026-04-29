import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Zap, Fingerprint, Swords, Wand2, Shield, User } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { GitGuildLogo } from '../components/GitGuildLogo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [selectedClass, setSelectedClass] = useState('warrior');
  const [showForm, setShowForm] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const navigate = useNavigate();
  const { loginExistingUser } = useAppContext();

  const handleMouseMove = (e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 15,
      y: (e.clientY / window.innerHeight - 0.5) * 15
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsAuthenticating(true);
    setStatusText('LINKING TO REALM...');

    try {
      setTimeout(() => setStatusText('SYNCHRONIZING SOUL...'), 600);
      await loginExistingUser(email, password);
      setStatusText('AUTHENTICATION COMPLETE');
      setTimeout(() => navigate('/'), 600);
    } catch (err) {
      setIsAuthenticating(false);
      setStatusText('');
      alert(err.message || 'Login failed. Check your credentials.');
    }
  };

  const classes = [
    { 
      id: 'warrior', name: 'Warrior', icon: <Swords size={18} />, 
      color: 'from-orange-500 to-red-600', desc: 'Frontline developer', 
      glow: 'shadow-orange-500/40', stats: { power: 95, speed: 40, magic: 20 } 
    },
    { 
      id: 'mage', name: 'Mage', icon: <Wand2 size={18} />, 
      color: 'from-blue-500 to-indigo-600', desc: 'Architect & Strategist', 
      glow: 'shadow-blue-500/40', stats: { power: 30, speed: 60, magic: 98 } 
    },
    { 
      id: 'rogue', name: 'Rogue', icon: <Shield size={18} />, 
      color: 'from-emerald-500 to-teal-600', desc: 'Speed & Optimization', 
      glow: 'shadow-emerald-500/40', stats: { power: 50, speed: 95, magic: 45 } 
    }
  ];

  const currentClass = classes.find(c => c.id === selectedClass);

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden font-sans selection:bg-[var(--color-neon-blue)] selection:text-white"
    >
      
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20 transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) scale(1.05)` }}
        ></div>
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
             style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
        
        {/* Animated Particles with Parallax */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-full animate-float pointer-events-none"
              style={{
                width: Math.random() * 3 + 'px',
                height: Math.random() * 3 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 12 + 8 + 's',
                transform: `translate(${mousePos.x * (i % 5 + 1) * 0.2}px, ${mousePos.y * (i % 5 + 1) * 0.2}px)`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl px-6 relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <div className={`mb-10 transition-all duration-1000 transform ${showForm ? 'scale-75 -translate-y-8' : 'scale-100'}`}>
           <div className="flex flex-col items-center relative">
              <div className="relative mb-6 group cursor-default">
                <div className="absolute inset-0 bg-[var(--color-neon-blue)] blur-[60px] opacity-20 animate-pulse"></div>
                <div className="w-24 h-24 relative z-10 drop-shadow-[0_0_25px_var(--neon-glow)] transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110">
                   <GitGuildLogo className="w-full h-full text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-black tracking-tighter text-white text-center leading-none">
                Dev<span className="text-[var(--color-neon-blue)] drop-shadow-[0_0_15px_var(--neon-glow)]">Quest</span>
              </h1>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Entry Protocol</p>
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
           </div>
        </div>

        {!showForm ? (
          /* Landing Stage: Start Button */
          <div className="flex flex-col items-center group animate-fade-in">
             <button 
               onClick={() => setShowForm(true)}
               className="group relative px-12 py-5 overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[var(--color-neon-blue)]/50 transition-all duration-700 hover:shadow-[0_0_40px_rgba(14,165,233,0.1)]"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-neon-blue)]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 text-xl font-black uppercase tracking-[0.3em] text-white group-hover:text-[var(--color-neon-blue)] transition-colors">
                  Press Start
                </span>
             </button>
             <p className="mt-10 text-[9px] text-white/20 font-black uppercase tracking-[0.4em] animate-pulse">Uplink Ready</p>
          </div>
        ) : (
          /* Authentication Stage: Class Selection & Form */
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in-up items-start">
            
            {/* Left Column: Character Selection */}
            <div className="space-y-6">
              <div className="glass-panel p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-white/10 opacity-20 animate-[scan_6s_linear_infinite] pointer-events-none"></div>
                
                <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-blue)]"></div>
                  Character Selection
                </h3>
                
                <div className="space-y-4">
                  {classes.map(c => (
                    <div 
                      key={c.id}
                      onClick={() => setSelectedClass(c.id)}
                      className={`group/card flex items-center gap-6 p-4 rounded-2xl cursor-pointer transition-all duration-500 relative overflow-hidden ${
                        selectedClass === c.id 
                          ? `bg-white/10 border border-white/20 translate-x-3 shadow-xl ${c.glow}` 
                          : 'hover:bg-white/5 border border-transparent hover:translate-x-1'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow-lg transition-all duration-500 group-hover/card:rotate-[15deg]`}>
                        {c.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-base text-white uppercase tracking-tight">{c.name}</div>
                        <div className="text-[9px] text-white/30 font-bold uppercase tracking-widest">{c.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats Reveal */}
                <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                   {['power', 'speed', 'magic'].map(stat => (
                     <div key={stat} className="space-y-1.5">
                        <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
                           <span>{stat}</span>
                           <span>{currentClass.stats[stat]}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div 
                             className={`h-full bg-gradient-to-r ${currentClass.color} transition-all duration-1000 ease-out`}
                             style={{ width: `${currentClass.stats[stat]}%` }}
                           ></div>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Right Column: Login Form */}
            <div className="relative">
              <div className="glass-panel p-10 bg-white/[0.02] relative overflow-hidden">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-neon-blue)]/10 blur-[60px]"></div>
                 
                 <div className="mb-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Security Access</h2>
                    <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em] mt-2">Biometric Verification Required</p>
                 </div>

                 {!isAuthenticating ? (
                   <form onSubmit={handleLogin} className="space-y-6">
                     <div className="space-y-3">
                        <div className="relative group/input">
                           <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[var(--color-neon-blue)] transition-colors" />
                           <input 
                             type="email" required
                             value={email} onChange={e => setEmail(e.target.value)}
                             placeholder="CHARACTER_EMAIL"
                             className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-[var(--color-neon-blue)]/50 focus:ring-4 focus:ring-[var(--color-neon-blue)]/5 transition-all text-xs font-bold"
                           />
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="relative group/input">
                           <Fingerprint size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[var(--color-neon-blue)] transition-colors" />
                           <input 
                             type="password" required
                             value={password} onChange={e => setPassword(e.target.value)}
                             placeholder="SECURE_PASSCODE"
                             className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-[var(--color-neon-blue)]/50 focus:ring-4 focus:ring-[var(--color-neon-blue)]/5 transition-all text-xs font-bold"
                           />
                        </div>
                     </div>

                     <div className="pt-4 relative group/btn">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-2xl blur-sm opacity-20 group-hover/btn:opacity-40 transition-opacity"></div>
                        <button type="submit" className="game-button relative w-full h-16 text-lg font-black uppercase tracking-[0.3em] transition-all hover:translate-y-[-2px] active:translate-y-[0]">
                           Spawn Hero
                        </button>
                     </div>
                     
                     <div className="text-center">
                        <Link to="/signup" className="group/link text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all flex items-center justify-center gap-2">
                           Create Record <span className="text-[var(--color-neon-blue)] group-hover/link:translate-x-1 transition-transform">→</span>
                        </Link>
                     </div>
                   </form>
                 ) : (
                   <div className="py-20 flex flex-col items-center justify-center">
                      <div className="w-20 h-20 relative mb-8">
                        <div className="absolute inset-0 border-2 border-[var(--color-neon-blue)]/10 rounded-full"></div>
                        <div className="absolute inset-0 border-2 border-[var(--color-neon-blue)] border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <GitGuildLogo className="w-10 h-10 text-[var(--color-neon-blue)] animate-pulse" />
                        </div>
                      </div>
                      <div className="text-xs font-black text-[var(--color-neon-blue)] uppercase tracking-[0.4em] animate-pulse text-center">
                        {statusText}
                      </div>
                   </div>
                 )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-80px) translateX(15px); opacity: 0.6; }
        }
        @keyframes scan {
          from { top: -100%; }
          to { top: 200%; }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

