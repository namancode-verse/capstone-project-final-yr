import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBell, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const authLinks = (
    <>
      <div className="hidden md:flex items-center space-x-6">
        <Link 
          to="/dashboard" 
          className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          <FaHome className="w-4 h-4 mr-2" />
          Dashboard
        </Link>
        <Link 
          to="/curriculum" 
          className={`nav-link ${location.pathname === '/curriculum' ? 'active' : ''}`}
        >
          Curriculum
        </Link>
        <Link 
          to="/enrolled-subjects" 
          className={`nav-link ${location.pathname === '/enrolled-subjects' ? 'active' : ''}`}
        >
          My Courses
        </Link>
        <Link 
          to="/available-subjects" 
          className={`nav-link ${location.pathname === '/available-subjects' ? 'active' : ''}`}
        >
          Browse Courses
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-64 pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
            <FaBell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              3
            </span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <FaUser className="w-4 h-4" />
            </div>
            <span className="hidden lg:block">{user?.full_name || 'User'}</span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.full_name || 'User'}</p>
                <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
              </div>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <FaUser className="w-4 h-4 mr-2 inline" />
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <FaCog className="w-4 h-4 mr-2 inline" />
                Settings
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <FaSignOutAlt className="w-4 h-4 mr-2 inline" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const guestLinks = (
    <div className="hidden md:flex items-center space-x-4">
      <Link 
        to="/login" 
        className="text-white hover:text-gray-200 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
      >
        Login
      </Link>
      <Link 
        to="/register" 
        className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium"
      >
        Get Started
      </Link>
    </div>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors duration-200">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">🎓</span>
              </div>
              <span className="text-xl font-bold">LearnPath</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated ? authLinks : guestLinks}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/curriculum"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Curriculum
                  </Link>
                  <Link
                    to="/enrolled-subjects"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Courses
                  </Link>
                  <Link
                    to="/available-subjects"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse Courses
                  </Link>
                  <div className="border-t border-white/20 pt-2">
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CSS for nav-link class */}
      <style jsx>{`
        .nav-link {
          @apply flex items-center px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium;
        }
        .nav-link.active {
          @apply text-white bg-white/20;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;