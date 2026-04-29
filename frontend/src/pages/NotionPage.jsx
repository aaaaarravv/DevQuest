import { useAppContext } from '../context/AppContext';
import { FileText, Save } from 'lucide-react';
import { useState } from 'react';

export default function NotionPage() {
  const { notes, setNotes } = useAppContext();
  const [localNotes, setLocalNotes] = useState(notes);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setNotes(localNotes);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-6 flex items-center justify-between shrink-0 animate-fade-in-up">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FileText className="text-[var(--color-neon-blue)]" size={32} /> Grimoire
        </h1>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
            isSaving 
              ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' 
              : 'bg-[var(--color-dark-panel)] text-white hover:bg-[var(--color-dark-border)] border border-[var(--color-dark-border)]'
          }`}
        >
          <Save size={18} /> {isSaving ? 'Saved!' : 'Save Runes'}
        </button>
      </div>

      <div className="flex-1 glass-panel overflow-hidden flex flex-col animate-fade-in-up delay-100 opacity-0 translate-y-10 group transition-all duration-1000 ease-out hover:border-[var(--color-neon-blue)]/50 focus-within:border-[var(--color-neon-blue)]">
        <div className="h-10 border-b border-[var(--color-dark-border)] bg-[var(--color-dark-bg)]/50 flex items-center px-4 gap-4 text-sm text-gray-400">
           <button className="hover:text-white font-bold">H1</button>
           <button className="hover:text-white font-bold">H2</button>
           <button className="hover:text-white font-italic italic">I</button>
           <button className="hover:text-white line-through">S</button>
           <button className="hover:text-white font-mono bg-gray-800 px-1 rounded">&lt;/&gt;</button>
        </div>
        <textarea
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
          className="flex-1 w-full bg-transparent p-8 outline-none resize-none font-mono text-sm leading-relaxed"
          placeholder="Start writing..."
          spellCheck="false"
        />
      </div>
    </div>
  );
}
