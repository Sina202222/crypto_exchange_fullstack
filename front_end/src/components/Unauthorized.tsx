import { Link, useLocation } from 'react-router-dom';

const Unauthorized = () => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p className="text-lg mb-6">
        You don't have permission to access <code>{location.pathname}</code>
      </p>
      <Link 
        to="/" 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;