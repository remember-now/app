import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Memories from './pages/Memories';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Account from './pages/Account';
import Billing from './pages/Billing';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Chat />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/account" element={<Account />} />
        <Route path="/billing" element={<Billing />} />
      </Route>
    </Routes>
  );
}

export default App;
