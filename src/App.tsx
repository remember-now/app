import { useAtom } from 'jotai';
import { countAtom } from './atoms';
import { Button } from '@/components/ui/button';
import reactLogo from './assets/react.svg';
import appLogo from '/favicon.svg';
import PWABadge from './PWABadge';
import './App.css';

function App() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <>
      <div className="flex justify-center w-full">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={appLogo} className="logo" alt="remember-now logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>remember-now</h1>

      <div className="card">
        <Button className="mb-6" onClick={() => setCount((c: number) => c + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

      <PWABadge />
    </>
  );
}

export default App;
