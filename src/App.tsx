import { Outlet } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import appLogo from '/favicon.svg';
import ReloadPrompt from './components/pwa/ReloadPrompt';

function App() {
  return (
    <div className="max-w-5xl mx-auto p-8 text-center">
      <div className="flex justify-center items-center gap-4 mb-8">
        <a href="https://vite.dev" target="_blank" rel="noreferrer" className="group">
          <img
            src={appLogo}
            alt="remember-now logo"
            className="h-24 p-6 transition-all duration-300 group-hover:drop-shadow-[0_0_0.5em_#646cffaa]"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer" className="group">
          <img
            src={reactLogo}
            alt="React logo"
            className="h-24 p-6 transition-all duration-300 animate-[spin_20s_linear_infinite] group-hover:drop-shadow-[0_0_0.5em_#61dafbaa]"
          />
        </a>
      </div>

      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
        remember-now
      </h1>

      <div className="p-8 bg-gray-50 rounded-lg shadow-sm mb-8">
        <Outlet />
      </div>

      <p className="text-gray-400 text-sm">Click on the Vite and React logos to learn more</p>

      <ReloadPrompt />
    </div>
  );
}

export default App;
