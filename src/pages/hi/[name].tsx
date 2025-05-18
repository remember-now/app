import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Hi() {
  const params = useParams();

  return (
    <div className="Hi">
      <div className="mb-4">
        <strong className="text-lg">/hi</strong> route
      </div>
      <p className="text-2xl mb-4">Hi, {params.name}! 👋</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go Home
      </Link>
    </div>
  );
}

export default Hi;
