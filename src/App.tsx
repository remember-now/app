import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Main from './pages/Main';
import Memories from './pages/Memories';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Billing from './pages/Billing';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/account" element={<Account />} />
        <Route path="/billing" element={<Billing />} />
      </Route>
    </Routes>
  );
}

export default App;
