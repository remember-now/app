import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import reactLogo from './assets/react.svg';
import appLogo from '/favicon.svg';
import PWABadge from './PWABadge';
import './App.css';

function App() {
  const queryClient = useQueryClient();

  // Query to read the count (starts at 0)
  const { data: count = 0 } = useQuery<number>({
    queryKey: ['count'],
    queryFn: () => Promise.resolve(0),
    initialData: 0,
  });

  // Mutation to increment
  const { mutate: increment } = useMutation({
    mutationFn: () => Promise.resolve(count + 1),
    onSuccess: (newCount) => {
      queryClient.setQueryData(['count'], newCount);
    },
  });

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
        <Button onClick={() => increment()} className="mb-6">
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
