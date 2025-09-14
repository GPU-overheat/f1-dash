import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  const linkClasses = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium transition-colors";
  const activeLinkClasses = "bg-red-600 text-white rounded-md px-3 py-2 text-sm font-medium";

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white tracking-wider">
              F<span className="text-red-500">1-D</span>ASH
            </Link>
          </div>

          <div className="ml-10 flex items-baseline space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeLinkClasses : linkClasses)}
            >
              Latest Results
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) => (isActive ? activeLinkClasses : linkClasses)}
            >
              Search
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;