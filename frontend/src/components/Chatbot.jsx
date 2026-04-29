import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { chat } from '../lib/api';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Greetings, traveler! How can I assist you on your quest today?", sender: "bot" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);
    
    try {
      const { reply } = await chat.send(userMessage);
      setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        text: "The oracle is unreachable. Check your connection and try again.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-[var(--color-neon-purple)] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-transform hover:scale-110 z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={24} className="text-white" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 glass-panel flex flex-col shadow-2xl z-50 border-[var(--color-neon-purple)]/50 animate-in slide-in-from-bottom-5">
          <div className="h-12 border-b border-[var(--color-dark-border)] flex items-center justify-between px-4 bg-[var(--color-dark-bg)]/50 rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-sm">Guild Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white pb-1">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[var(--color-neon-purple)] text-white rounded-br-sm' 
                    : 'bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-[var(--color-dark-border)] flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask for guidance..." 
              className="flex-1 bg-[var(--color-dark-bg)] text-sm rounded-full px-4 py-2 border border-[var(--color-dark-border)] outline-none focus:border-[var(--color-neon-purple)]"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading} className="w-10 h-10 bg-[var(--color-neon-purple)] rounded-full flex items-center justify-center text-white shrink-0 hover:bg-purple-500 transition-colors disabled:opacity-50">
              {isLoading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send size={16} className="-ml-0.5" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
