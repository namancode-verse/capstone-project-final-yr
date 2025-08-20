import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaPlus, FaGraduationCap, FaChartLine, FaBook, FaBrain, FaUsers, FaAward } from 'react-icons/fa';

const DashboardFloatingButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Main Floating Button */}
      <button
        onClick={toggleExpanded}
        className="w-16 h-16 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group animate-pulse"
        title="Quick Actions"
      >
        <FaRocket className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`} />
      </button>

      {/* Expanded Action Buttons */}
      {isExpanded && (
        <div className="absolute bottom-20 right-0 space-y-3 animate-fade-in">
          {/* Dashboard Button */}
          <Link to="/dashboard">
            <div className="group flex items-center space-x-3 bg-gradient-to-r from-white to-cyan-50 text-gray-700 hover:text-cyan-600 px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-cyan-200 hover:border-cyan-400">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaChartLine className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold whitespace-nowrap">Dashboard</span>
            </div>
          </Link>

          {/* Add Course Button */}
          <Link to="/available-subjects">
            <div className="group flex items-center space-x-3 bg-gradient-to-r from-white to-emerald-50 text-gray-700 hover:text-emerald-600 px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-emerald-200 hover:border-emerald-400">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaPlus className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold whitespace-nowrap">Add Course</span>
            </div>
          </Link>

          {/* My Courses Button */}
          <Link to="/enrolled-subjects">
            <div className="group flex items-center space-x-3 bg-gradient-to-r from-white to-violet-50 text-gray-700 hover:text-violet-600 px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-violet-200 hover:border-violet-400">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaBook className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold whitespace-nowrap">My Courses</span>
            </div>
          </Link>

          {/* Progress Button */}
          <Link to="/dashboard">
            <div className="group flex items-center space-x-3 bg-gradient-to-r from-white to-orange-50 text-gray-700 hover:text-orange-600 px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-orange-200 hover:border-orange-400">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaGraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold whitespace-nowrap">Progress</span>
            </div>
          </Link>

          {/* Community Button */}
          <Link to="/dashboard">
            <div className="group flex items-center space-x-3 bg-gradient-to-r from-white to-pink-50 text-gray-700 hover:text-pink-600 px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-pink-200 hover:border-pink-400">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaUsers className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold whitespace-nowrap">Community</span>
            </div>
          </Link>

          {/* Achievements Button */}
          <Link to="/dashboard">
            <div className="group flex items-center space-x-3 bg-gradient-to-r from-white to-yellow-50 text-gray-700 hover:text-yellow-600 px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-yellow-200 hover:border-yellow-400">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaAward className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold whitespace-nowrap">Achievements</span>
            </div>
          </Link>
        </div>
      )}

      {/* Backdrop for closing expanded menu */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-40"
          onClick={toggleExpanded}
        />
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default DashboardFloatingButton;
