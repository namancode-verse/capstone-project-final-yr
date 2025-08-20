import React, { useState, useEffect } from 'react';
import { 
  FaHome, FaBook, FaCalendar, FaChartLine, FaGraduationCap, FaCog, 
  FaSearch, FaBell, FaBookmark, FaClock, FaBuilding, FaPlus, FaCheck,
  FaUser, FaStar, FaTrophy, FaLightbulb, FaRocket, FaChartBar,
  FaPlay, FaPause, FaStop, FaEdit, FaTrash, FaEye, FaDownload,
  FaUsers, FaAward, FaCalendarAlt, FaTasks, FaBookOpen, FaLaptop
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [editForm, setEditForm] = useState({
    full_name: '',
    major: '',
    year_level: '',
    gpa: ''
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data.data);
        setEditForm({
          full_name: data.data.user.full_name || '',
          major: data.data.user.major || '',
          year_level: data.data.user.year_level || '',
          gpa: data.data.user.gpa || ''
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use mock data for demonstration
      setDashboardData(getMockData());
    } finally {
      setLoading(false);
    }
  };

  const getMockData = () => ({
    user: {
      id: 1,
      username: 'janesmith',
      full_name: 'Jane Smith',
      major: 'Computer Science',
      year_level: 'Junior',
      gpa: 3.7,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    progress: {
      degree_progress: 85,
      courses_completed: 12,
      total_courses: 16,
      credits_earned: 42,
      credits_remaining: 18,
      core_requirements: { completed: 24, total: 30, percentage: 80 },
      electives: { completed: 12, total: 18, percentage: 67 },
      specialization: { completed: 6, total: 12, percentage: 50 }
    },
    recommended_courses: [
      {
        id: 1,
        title: 'Machine Learning Fundamentals',
        duration: '8 weeks',
        provider: 'CS Department',
        category: 'AI Track',
        label_type: 'AI Track',
        rating: 4.8,
        students: 156,
        price: 'Free'
      },
      {
        id: 2,
        title: 'Advanced Python Programming',
        duration: '6 weeks',
        provider: 'Coursera',
        category: 'Programming',
        label_type: 'Online',
        rating: 4.6,
        students: 89,
        price: '$49'
      },
      {
        id: 3,
        title: 'Cloud Computing Architecture',
        duration: 'Full semester',
        provider: 'State Tech',
        category: 'Cloud',
        label_type: 'Partner College',
        rating: 4.7,
        students: 234,
        price: '$299'
      }
    ],
    weekly_tasks: [
      {
        id: 1,
        title: 'Complete ML Fundamentals Assignment 3',
        course_code: 'CS-401',
        duration: '2 hrs',
        status: 'completed',
        priority: 'high',
        due_date: '2024-01-15'
      },
      {
        id: 2,
        title: 'Watch Python Decorators lecture',
        course_code: 'Online Course',
        duration: '1 hr',
        status: 'completed',
        priority: 'medium',
        due_date: '2024-01-14'
      },
      {
        id: 3,
        title: 'Prepare for Database Systems midterm',
        course_code: 'CS-305',
        duration: '3 hrs',
        status: 'pending',
        priority: 'high',
        due_date: '2024-01-20'
      }
    ],
    achievements: [
      { id: 1, title: 'First Course Completed', icon: '🎯', description: 'Completed your first course', earned: '2024-01-10' },
      { id: 2, title: 'Perfect Score', icon: '⭐', description: 'Got 100% on an assignment', earned: '2024-01-08' },
      { id: 3, title: 'Study Streak', icon: '🔥', description: '7 days of consistent study', earned: '2024-01-07' }
    ],
    recent_activity: [
      { id: 1, action: 'Completed assignment', course: 'CS-401', time: '2 hours ago' },
      { id: 2, action: 'Enrolled in course', course: 'CS-402', time: '1 day ago' },
      { id: 3, action: 'Updated profile', course: '', time: '2 days ago' }
    ]
  });

  const handleEditProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      
      if (response.ok) {
        setShowEditProfile(false);
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gradient-to-r from-cyan-400 to-pink-400 mx-auto mb-4"></div>
          <h2 className="text-3xl font-bold text-white mb-2">Loading Your Dashboard...</h2>
          <p className="text-cyan-200 text-lg">Preparing your personalized learning experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transform -skew-y-3 origin-top-left"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-white text-center lg:text-left mb-8 lg:mb-0">
              <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                Welcome back, {dashboardData?.user?.full_name?.split(' ')[0]}! 🎉
              </h1>
              <p className="text-xl lg:text-2xl text-purple-100 mb-6">
                Ready to continue your amazing learning journey?
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
                  <FaPlus className="w-5 h-5" />
                  <span>Add Course</span>
                </button>
                <button className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                  <FaCalendar className="w-5 h-5" />
                  <span>View Schedule</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-pink-400 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/30 shadow-2xl">
                <span className="text-6xl">🎓</span>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                <FaStar className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 border-l-4 border-gradient-to-b from-cyan-400 to-blue-500 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">Degree Progress</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  {dashboardData?.progress?.degree_progress}%
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaChartBar className="w-7 h-7 text-cyan-600" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${dashboardData?.progress?.degree_progress}%` }}
              ></div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 border-l-4 border-gradient-to-b from-emerald-400 to-green-500 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">Courses Completed</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                  {dashboardData?.progress?.courses_completed}/{dashboardData?.progress?.total_courses}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaBook className="w-7 h-7 text-emerald-600" />
              </div>
            </div>
            <p className="text-emerald-600 text-sm font-semibold">🚀 On track!</p>
          </div>

          <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 border-l-4 border-gradient-to-b from-violet-400 to-purple-500 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">Credits Earned</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                  {dashboardData?.progress?.credits_earned}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaGraduationCap className="w-7 h-7 text-violet-600" />
              </div>
            </div>
            <p className="text-violet-600 text-sm font-semibold">{dashboardData?.progress?.credits_remaining} remaining</p>
          </div>

          <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 border-l-4 border-gradient-to-b from-orange-400 to-red-500 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">Current GPA</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  {dashboardData?.user?.gpa}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaStar className="w-7 h-7 text-orange-600" />
              </div>
            </div>
            <p className="text-orange-600 text-sm font-semibold">🌟 Excellent!</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 mb-8 border border-gray-200">
          <div className="flex flex-wrap gap-2 bg-gradient-to-r from-cyan-100 to-purple-100 p-2 rounded-xl">
            {[
              { id: 'overview', label: 'Overview', icon: FaHome, color: 'from-cyan-500 to-blue-500' },
              { id: 'courses', label: 'Courses', icon: FaBookOpen, color: 'from-emerald-500 to-green-500' },
              { id: 'progress', label: 'Progress', icon: FaChartLine, color: 'from-violet-500 to-purple-500' },
              { id: 'achievements', label: 'Achievements', icon: FaTrophy, color: 'from-orange-500 to-red-500' }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Progress Requirements Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl shadow-2xl p-6 border-t-4 border-cyan-500 hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <FaBook className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Core Requirements</h3>
                </div>
                <p className="text-gray-600 mb-4">Completed: {dashboardData?.progress?.core_requirements?.completed}/{dashboardData?.progress?.core_requirements?.total} credits</p>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-1000" 
                      style={{ width: `${dashboardData?.progress?.core_requirements?.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-cyan-600 font-bold text-lg">{dashboardData?.progress?.core_requirements?.percentage}%</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-2xl p-6 border-t-4 border-emerald-500 hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <FaBookmark className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Electives</h3>
                </div>
                <p className="text-gray-600 mb-4">Completed: {dashboardData?.progress?.electives?.completed}/{dashboardData?.progress?.electives?.total} credits</p>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-green-500 h-3 rounded-full transition-all duration-1000" 
                      style={{ width: `${dashboardData?.progress?.electives?.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-emerald-600 font-bold text-lg">{dashboardData?.progress?.electives?.percentage}%</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-violet-50 rounded-2xl shadow-2xl p-6 border-t-4 border-violet-500 hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <FaRocket className="w-6 h-6 text-violet-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Specialization</h3>
                </div>
                <p className="text-gray-600 mb-4">Completed: {dashboardData?.progress?.specialization?.completed}/{dashboardData?.progress?.specialization?.total} credits</p>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-violet-400 to-purple-500 h-3 rounded-full transition-all duration-1000" 
                      style={{ width: `${dashboardData?.progress?.specialization?.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-violet-600 font-bold text-lg">{dashboardData?.progress?.specialization?.percentage}%</span>
                </div>
              </div>
            </div>

            {/* Weekly Tasks */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <FaTasks className="w-5 h-5 text-cyan-600" />
                  </div>
                  This Week's Tasks
                </h3>
                <button className="text-cyan-600 hover:text-cyan-700 font-semibold hover:underline">View All →</button>
              </div>
              
              <div className="space-y-4">
                {dashboardData?.weekly_tasks?.map((task) => (
                  <div key={task.id} className="group p-4 bg-gradient-to-r from-gray-50 to-cyan-50 rounded-xl border border-gray-200 hover:border-cyan-300 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${
                          task.priority === 'high' ? 'bg-gradient-to-r from-red-400 to-pink-500 animate-pulse' : 
                          task.priority === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-emerald-400 to-green-500'
                        }`}></div>
                        <div>
                          <h4 className="font-semibold text-gray-800 group-hover:text-cyan-700 transition-colors duration-200">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.course_code} • {task.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {task.status === 'completed' ? (
                          <span className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 border border-emerald-200">
                            <FaCheck className="w-3 h-3" />
                            <span>Completed</span>
                          </span>
                        ) : (
                          <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium border border-yellow-200">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <FaBookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                Recommended Courses
              </h3>
              <button className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline">View all courses →</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData?.recommended_courses?.map((course, index) => (
                <div key={course.id} className="group bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                  <div className="relative">
                    <div className={`w-full h-40 ${
                      index === 0 ? 'bg-gradient-to-br from-cyan-400 to-blue-500' :
                      index === 1 ? 'bg-gradient-to-br from-emerald-400 to-green-500' : 
                      'bg-gradient-to-br from-violet-400 to-purple-500'
                    }`}></div>
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        index === 0 ? 'bg-cyan-700 text-white' :
                        index === 1 ? 'bg-emerald-700 text-white' : 
                        'bg-violet-700 text-white'
                      }`}>
                        {course.label_type}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <FaStar className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs font-bold text-gray-800">{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="font-bold text-gray-800 mb-3 text-lg line-clamp-2 group-hover:text-cyan-600 transition-colors duration-200">{course.title}</h4>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <div className="w-4 h-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mr-2">
                          <FaClock className="w-3 h-3 text-cyan-600" />
                        </div>
                        {course.duration}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <div className="w-4 h-4 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mr-2">
                          <FaBuilding className="w-3 h-3 text-emerald-600" />
                        </div>
                        {course.provider}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500 flex items-center">
                        <div className="w-4 h-4 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mr-1">
                          <FaUsers className="w-3 h-3 text-violet-600" />
                        </div>
                        {course.students} students
                      </span>
                      <span className="font-bold text-lg text-cyan-600">{course.price}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl">
                      Add to Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <FaChartLine className="w-5 h-5 text-violet-600" />
              </div>
              Detailed Progress
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="font-bold text-gray-700 text-lg border-b border-gray-200 pb-2">Core Requirements Progress</h4>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Mathematics</span>
                      <span className="text-sm font-bold text-cyan-600">8/10 credits</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Programming</span>
                      <span className="text-sm font-bold text-emerald-600">6/8 credits</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-400 to-green-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="font-bold text-gray-700 text-lg border-b border-gray-200 pb-2">Elective Progress</h4>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-xl border border-violet-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Web Development</span>
                      <span className="text-sm font-bold text-violet-600">4/6 credits</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-violet-400 to-purple-500 h-3 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <FaTrophy className="w-5 h-5 text-orange-600" />
              </div>
              Your Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData?.achievements?.map((achievement, index) => (
                <div key={achievement.id} className={`rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300' :
                  index === 1 ? 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-300' :
                  'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300'
                }`}>
                  <div className="text-5xl mb-4 animate-bounce">{achievement.icon}</div>
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">{achievement.title}</h4>
                  <p className="text-gray-600 mb-3">{achievement.description}</p>
                  <p className="text-sm text-orange-600 font-semibold">Earned {achievement.earned}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 w-96 max-w-md mx-4 shadow-3xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                <input
                  type="text"
                  value={editForm.major}
                  onChange={(e) => setEditForm({...editForm, major: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year Level</label>
                <select
                  value={editForm.year_level}
                  onChange={(e) => setEditForm({...editForm, year_level: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200"
                >
                  <option value="">Select Year</option>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={editForm.gpa}
                  onChange={(e) => setEditForm({...editForm, gpa: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowEditProfile(false)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProfile}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;