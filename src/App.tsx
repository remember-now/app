import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Main from './pages/Main';
import Memories from './pages/Memories';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
