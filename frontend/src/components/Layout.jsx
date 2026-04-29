import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Chatbot from './Chatbot';

export default function Layout() {
  return (
    <div className="flex h-screen bg-[var(--color-dark-bg)] text-[var(--color-text-primary)] overflow-hidden transition-colors duration-500">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full relative">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 relative">
          <Outlet />
        </main>
        <Chatbot />
      </div>
    </div>
  );
}

