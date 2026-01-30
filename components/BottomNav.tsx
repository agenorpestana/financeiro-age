import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, PieChart, Settings } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  
  const navItemClass = (path: string) => `
    flex flex-col items-center justify-center w-full h-full space-y-1
    ${isActive(path) ? 'text-primary' : 'text-gray-500'}
  `;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-surface border-t border-gray-100 flex justify-between items-center px-4 max-w-[480px] mx-auto z-40 pb-2">
      <Link to="/" className={navItemClass('/')}>
        <div className={`p-1 rounded-full ${isActive('/') ? 'bg-surfaceVariant' : ''}`}>
          <Home size={24} />
        </div>
        <span className="text-xs font-medium">Início</span>
      </Link>
      
      <Link to="/reports" className={navItemClass('/reports')}>
        <div className={`p-1 rounded-full ${isActive('/reports') ? 'bg-surfaceVariant' : ''}`}>
          <PieChart size={24} />
        </div>
        <span className="text-xs font-medium">Relatórios</span>
      </Link>

      <Link to="/add" className="flex flex-col items-center justify-center w-full -mt-6">
        <div className="bg-primary text-white p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <PlusCircle size={32} />
        </div>
      </Link>

      <Link to="/legal" className={navItemClass('/legal')}>
        {/* Placeholder for future features or just keeping spacing balanced */}
        <div className={`p-1 rounded-full ${isActive('/legal') ? 'bg-surfaceVariant' : ''}`}>
             <ShieldCheckIcon size={24} />
        </div>
        <span className="text-xs font-medium">Legal</span>
      </Link>

      <Link to="/settings" className={navItemClass('/settings')}>
        <div className={`p-1 rounded-full ${isActive('/settings') ? 'bg-surfaceVariant' : ''}`}>
          <Settings size={24} />
        </div>
        <span className="text-xs font-medium">Ajustes</span>
      </Link>
    </nav>
  );
};

// Helper for the icon above
import { ShieldCheck as ShieldCheckIcon } from 'lucide-react';

export default BottomNav;