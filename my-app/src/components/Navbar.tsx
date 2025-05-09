
import { useNavigate } from 'react-router-dom';
import { GlobeIcon, LogInIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../controller/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, login } = useAuth();

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Log out the user
      logout(); // Log out the user
      navigate('/'); // Navigate to login page
    } else {
      // Log in the user
      login('username', 'password'); // Log in the user
      navigate('/dashboard'); // Navigate to the dashboard or home page
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <GlobeIcon className="w-8 h-8 text-cyan-900" />
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
              MyCountries
            </span>
          </div>
          <button
            onClick={handleLoginLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          >
            {isLoggedIn ? (
              <>
                <LogOutIcon className="w-4 h-4 mr-2" />
                Logout
              </>
            ) : (
              <>
                <LogInIcon className="w-4 h-4 mr-2" />
                Login
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
