import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import BottomNav from './components/BottomNav';
import ConsentModal from './components/ConsentModal';

// Pages
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Legal from './pages/Legal';

// Layout Component
const AppLayout = () => (
  <>
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
    <BottomNav />
    <ConsentModal />
  </>
);

const App: React.FC = () => {
  return (
    <FinanceProvider>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/legal" element={<Legal />} />
          </Route>
        </Routes>
      </Router>
    </FinanceProvider>
  );
};

export default App;