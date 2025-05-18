import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [name, setName] = useState('');

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name) {
      navigate(`/hi/${name}`);
    }
  };

  return (
    <div className="card">
      <Button onClick={() => increment()} className="mb-6">
        count is {count}
      </Button>

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 justify-center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            aria-label="What's your name?"
            placeholder="What's your name?"
            className="px-3 py-2 border rounded"
          />
          <Button type="submit">GO</Button>
        </form>
      </div>

      <div className="mt-4">
        <Link to="/about" className="text-blue-500 hover:underline">
          About
        </Link>
      </div>

      <p className="mt-4">
        Edit <code>src/pages/Home.tsx</code> and save to test HMR
      </p>
    </div>
  );
}

export default Home;
