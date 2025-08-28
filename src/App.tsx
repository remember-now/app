import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Chat from './pages/Chat';
import { ROUTE_CONFIG } from './config/routes';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Chat />} />

        {Object.entries(ROUTE_CONFIG).map(([key, { path, element }]) => (
          <Route key={key} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
