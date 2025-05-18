import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="About">
      <div className="mb-4">
        <strong className="text-lg">/about</strong> route
      </div>
      <p className="mb-4">
        This is an example of a page in your PWA application. You can use React Router to navigate
        between pages while maintaining the offline capabilities of your PWA.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go Home
      </Link>
    </div>
  );
}

export default About;
