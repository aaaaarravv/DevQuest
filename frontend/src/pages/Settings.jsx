import { useState } from 'react';
import { Settings as SettingsIcon, User, Monitor, Key, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Settings() {
  const { 
    user, 
    theme, setTheme, 
    animationsEnabled, setAnimationsEnabled, 
    particlesEnabled, setParticlesEnabled, 
    soundsEnabled, setSoundsEnabled 
  } = useAppContext();
  
  const [activeTab, setActiveTab] = useState('profile');

  // Dummy states for UI feedback
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleUpdatePassword = () => {
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Dummy Action: Account deletion is disabled in demo mode.");
    }
  };

  const handleSaveInterface = () => {
    alert("Interface settings saved successfully!");
  };

  const handleSaveProfile = () => {
    alert("Profile changes saved successfully!");
  };

  const themes = [
    { id: 'midnight', name: 'Midnight', color: 'bg-[#0f172a]', accent: 'bg-[#38bdf8]' },
    { id: 'cyberpunk', name: 'Cyberpunk', color: 'bg-[#09090b]', accent: 'bg-[#0ff]' },
    { id: 'nord', name: 'Nord Frost', color: 'bg-[#f3f4f6]', accent: 'bg-[#3b82f6]' },
    { id: 'emerald', name: 'Emerald', color: 'bg-[#064e3b]', accent: 'bg-[#4ade80]' },
    { id: 'crimson', name: 'Crimson', color: 'bg-[#450a0a]', accent: 'bg-[#ef4444]' },
    { id: 'onyx', name: 'Onyx', color: 'bg-black', accent: 'bg-white' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className={`mb-10 ${animationsEnabled ? 'animate-fade-in-up' : ''}`}>
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-4">
          <div className="p-3 bg-[var(--color-neon-blue)]/10 rounded-2xl">
            <SettingsIcon className="text-[var(--color-neon-blue)]" size={32} />
          </div>
          Interface & Settings
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-3 text-lg">Personalize your developer experience and secure your guild data.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Navigation Sidebar */}
        <div className={`w-full lg:w-72 space-y-3 ${animationsEnabled ? 'animate-fade-in-up delay-100 opacity-0' : ''}`} style={!animationsEnabled ? {opacity: 1} : {}}>
          {[
            { id: 'profile', icon: <User size={20} />, label: 'Profile' },
            { id: 'interface', icon: <Monitor size={20} />, label: 'Interface' },
            { id: 'security', icon: <Key size={20} />, label: 'Security' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-5 py-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-[var(--color-neon-blue)] text-[var(--color-accent-text)] font-bold shadow-lg shadow-[var(--color-neon-blue)]/20 scale-[1.02]' 
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-dark-panel)] hover:text-[var(--color-text-primary)]'
              }`}>
               {tab.icon} {tab.label}
            </button>

          ))}
        </div>

        {/* Content Area */}
        <div className={`flex-1 glass-panel p-8 min-h-[600px] ${animationsEnabled ? 'animate-fade-in-up delay-200 opacity-0' : ''} relative overflow-hidden`} style={!animationsEnabled ? {opacity: 1} : {}}>
          {/* Subtle glow effect */}
          {particlesEnabled && <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-neon-blue)] rounded-full mix-blend-screen filter blur-[100px] opacity-10 pointer-events-none"></div>}

          {activeTab === 'profile' && (
            <div className={animationsEnabled ? 'animate-fade-in' : ''}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[var(--color-neon-blue)] rounded-full"></div>
                Player Profile
              </h2>
              
              <div className="space-y-8">
                 <div className="flex items-center gap-8">
                    <div className="relative group">
                      <div className="w-24 h-24 bg-[var(--color-dark-bg)] border-2 border-[var(--color-neon-blue)] rounded-2xl flex items-center justify-center text-4xl font-bold shadow-2xl transition-transform duration-300 group-hover:scale-105">
                         {user?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--color-neon-blue)] rounded-lg flex items-center justify-center shadow-lg border-2 border-[var(--color-dark-panel)]">
                         <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                       <button className="px-5 py-2.5 glass-card text-sm font-bold hover:text-[var(--color-neon-blue)]">
                          Change Avatar
                       </button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                       <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2 ml-1">Display Name</label>
                       <input 
                          type="text" 
                          defaultValue={user?.name || ''}
                          className="input-field"
                          placeholder="Your username"
                       />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2 ml-1">Guild Email</label>
                       <input 
                          type="email" 
                          defaultValue="player@gitguild.dev"
                          className="input-field"
                          placeholder="your@email.com"
                       />
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2 ml-1">Bio (Lore)</label>
                    <textarea 
                       rows="4"
                       defaultValue="A wandering developer seeking legendary quests and ancient code snippets."
                       className="input-field resize-none"
                       placeholder="Write your story..."
                    ></textarea>
                 </div>

                 <div className="pt-8 mt-4 border-t border-[var(--color-dark-border)] flex justify-end">
                    <button onClick={handleSaveProfile} className="game-button">
                       Save Changes
                    </button>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'interface' && (
            <div className={animationsEnabled ? 'animate-fade-in' : ''}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[var(--color-neon-blue)] rounded-full"></div>
                Interface Settings
              </h2>
              
              <div className="space-y-10">
                 <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-5 ml-1 uppercase tracking-widest">Visual Themes</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                       {themes.map(t => (
                         <div 
                           key={t.id}
                           onClick={() => setTheme(t.id)}
                           className={`group relative glass-card p-4 cursor-pointer transition-all duration-300 ${
                             theme === t.id ? 'ring-2 ring-[var(--color-neon-blue)] ring-offset-4 ring-offset-[var(--color-dark-bg)] bg-[var(--color-dark-panel)]' : 'hover:border-[var(--color-neon-blue)]/50'
                           }`}
                         >
                            <div className="flex items-center justify-between mb-4">
                              <span className={`font-bold text-sm ${theme === t.id ? 'text-[var(--color-neon-blue)]' : 'text-[var(--color-text-primary)]'}`}>{t.name}</span>
                              {theme === t.id && <Check size={16} className="text-[var(--color-neon-blue)]" />}
                            </div>
                            <div className={`h-16 rounded-lg ${t.color} border border-[var(--color-dark-border)] overflow-hidden flex`}>
                               <div className="w-1/3 bg-white/5 border-r border-white/5"></div>
                               <div className="flex-1 p-3 space-y-2">
                                   <div className={`h-2 w-full ${t.accent} rounded-full opacity-60`}></div>
                                   <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-5 ml-1 uppercase tracking-widest">Experience & FX</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { id: 'animations', state: animationsEnabled, setter: setAnimationsEnabled, label: 'Interface Animations', desc: 'Smooth transitions and motion effects.' },
                          { id: 'particles', state: particlesEnabled, setter: setParticlesEnabled, label: 'Particle Systems', desc: 'Ambient background and interaction FX.' },
                          { id: 'sounds', state: soundsEnabled, setter: setSoundsEnabled, label: 'Auditory Feedback', desc: 'Immersive UI soundscape.' }
                        ].map(fx => (
                          <label key={fx.id} className="flex items-center gap-4 p-4 glass-card cursor-pointer group">
                              <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${fx.state ? 'bg-[var(--color-neon-blue)]' : 'bg-gray-700'}`}>
                                <input 
                                  type="checkbox" 
                                  className="hidden"
                                  checked={fx.state}
                                  onChange={(e) => fx.setter(e.target.checked)}
                                />
                                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${fx.state ? 'translate-x-6' : 'translate-x-0'}`}></div>
                              </div>
                              <div>
                                  <div className="font-bold text-[var(--color-text-primary)] text-sm">{fx.label}</div>
                                  <div className="text-xs text-[var(--color-text-secondary)]">{fx.desc}</div>
                              </div>
                          </label>
                        ))}
                    </div>
                 </div>

                 <div className="pt-8 mt-4 border-t border-[var(--color-dark-border)] flex justify-end">
                    <button onClick={handleSaveInterface} className="game-button">
                       Apply Settings
                    </button>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className={animationsEnabled ? 'animate-fade-in' : ''}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[var(--color-neon-blue)] rounded-full"></div>
                Security & Authentication
              </h2>
              
              <div className="space-y-10">
                 <div className="glass-card p-6">
                    <h3 className="text-sm font-bold text-[var(--color-neon-blue)] mb-6 uppercase tracking-widest">Update Password</h3>
                    <div className="space-y-5">
                        <div>
                           <label className="block text-sm text-[var(--color-text-secondary)] mb-2 ml-1">Current Password</label>
                           <input 
                              type="password" 
                              placeholder="••••••••"
                              className="input-field"
                           />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                               <label className="block text-sm text-[var(--color-text-secondary)] mb-2 ml-1">New Password</label>
                               <input 
                                  type="password" 
                                  className="input-field"
                               />
                            </div>
                            <div>
                               <label className="block text-sm text-[var(--color-text-secondary)] mb-2 ml-1">Confirm Password</label>
                               <input 
                                  type="password" 
                                  className="input-field"
                               />
                            </div>
                        </div>
                        <div className="flex items-center gap-6 pt-2">
                            <button 
                              onClick={handleUpdatePassword}
                              className="px-6 py-2.5 glass-card text-sm font-bold hover:text-[var(--color-neon-blue)]"
                            >
                               Update Password
                            </button>
                            {passwordSaved && <span className="text-[var(--color-neon-green)] flex items-center gap-2 text-sm font-bold animate-fade-in"><Check size={18} /> Credentials Updated</span>}
                        </div>
                    </div>
                 </div>

                 <div>
                    <h3 className="text-sm font-bold text-[var(--color-text-secondary)] mb-5 uppercase tracking-widest ml-1">Multi-Factor Auth</h3>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 glass-card border-l-4 border-l-[var(--color-neon-purple)]">
                        <div>
                            <div className="font-bold text-[var(--color-text-primary)] text-lg mb-1">Two-Factor Authentication</div>
                            <div className="text-sm text-[var(--color-text-secondary)]">Add an extra layer of security to your account using an authenticator app.</div>
                        </div>
                        <button 
                          onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                          className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${is2FAEnabled ? 'bg-[var(--color-neon-green)]/10 text-[var(--color-neon-green)] border border-[var(--color-neon-green)]/30' : 'bg-[var(--color-neon-purple)]/10 text-[var(--color-neon-purple)] border border-[var(--color-neon-purple)]/30'}`}
                        >
                            {is2FAEnabled ? 'Disable 2FA' : 'Setup 2FA'}
                        </button>
                    </div>
                 </div>

                 <div className="pt-8 mt-4 border-t border-[var(--color-dark-border)]">
                    <h3 className="text-sm font-bold text-red-500 mb-5 uppercase tracking-widest ml-1">Danger Zone</h3>
                    <div className="glass-card border-red-500/20 p-6 bg-red-500/5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="font-bold text-white text-lg mb-1">Delete Account</div>
                                <div className="text-sm text-gray-400">Permanently remove all your quest data and achievements. This is irreversible.</div>
                            </div>
                            <button 
                              onClick={handleDeleteAccount}
                              className="px-6 py-3 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl text-sm font-bold transition-all duration-300"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
