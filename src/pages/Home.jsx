import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { FaRocket, FaGraduationCap, FaChartLine, FaBook, FaPlay, FaStar, FaUsers, FaAward, FaLaptop, FaBrain, FaGlobe, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transform -skew-y-3 origin-top-left"></div>
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Welcome to <span className="text-cyan-300">LearnPath</span> 🚀
            </h1>
            <p className="text-xl lg:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Your personalized learning journey starts here. Track progress, discover courses, and achieve your academic goals with our intelligent learning platform.
            </p>
            
            <Alert variant="info" className="text-center mb-8 bg-white/20 border-white/30 text-white">
              <strong>🧪 Development Mode:</strong> Dashboard buttons are visible for testing.
              In production, these would only show for authenticated users.
            </Alert>

            <div className="flex flex-wrap gap-6 justify-center">
              <Link to="/dashboard">
                <Button 
                  variant="light" 
                  size="lg" 
                  className="px-8 py-4 text-slate-800 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600"
                >
                  <FaRocket className="w-5 h-5 mr-2" />
                  🚀 Go to Dashboard
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="px-8 py-4 border-2 hover:bg-white hover:text-slate-800 transition-all duration-300 transform hover:scale-105 font-bold text-lg"
                >
                  <FaGraduationCap className="w-5 h-5 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  variant="warning" 
                  size="lg" 
                  className="px-8 py-4 text-white hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  <FaStar className="w-5 h-5 mr-2" />
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-cyan-400">LearnPath</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the future of education with our cutting-edge features designed to enhance your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature Card 1 */}
          <div className="group bg-gradient-to-br from-white to-cyan-50 rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border-t-4 border-cyan-500">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FaChartLine className="w-8 h-8 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Smart Progress Tracking</h3>
            <p className="text-gray-600">Monitor your academic progress with intelligent analytics and personalized insights.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="group bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border-t-4 border-emerald-500">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FaBook className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Curated Course Library</h3>
            <p className="text-gray-600">Access a vast collection of courses tailored to your academic interests and career goals.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="group bg-gradient-to-br from-white to-violet-50 rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border-t-4 border-violet-500">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FaUsers className="w-8 h-8 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Community Learning</h3>
            <p className="text-gray-600">Connect with peers, share knowledge, and collaborate on projects in a supportive environment.</p>
          </div>

          {/* Feature Card 4 */}
          <div className="group bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border-t-4 border-orange-500">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FaAward className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Achievement System</h3>
            <p className="text-gray-600">Earn badges and certificates as you complete milestones and demonstrate your skills.</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-gradient-to-br from-white to-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your path and begin your learning adventure today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Action Card 1 */}
            <div className="group bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-cyan-200 hover:border-cyan-300">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaPlay className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Try Dashboard</h3>
              <p className="text-gray-600 mb-6">Experience the full dashboard functionality with sample data and interactive features.</p>
              <Link to="/dashboard">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 border-0 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold"
                >
                  Explore Dashboard
                </Button>
              </Link>
            </div>

            {/* Action Card 2 */}
            <div className="group bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-emerald-200 hover:border-emerald-300">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaBook className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Browse Courses</h3>
              <p className="text-gray-600 mb-6">Discover a wide range of courses across different subjects and skill levels.</p>
              <Link to="/available-subjects">
                <Button 
                  variant="success" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 border-0 hover:from-emerald-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold"
                >
                  View Courses
                </Button>
              </Link>
            </div>

            {/* Action Card 3 */}
            <div className="group bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-violet-200 hover:border-violet-300">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaChartLine className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Track Progress</h3>
              <p className="text-gray-600 mb-6">Monitor your learning journey with detailed analytics and progress tracking.</p>
              <Link to="/dashboard">
                <Button 
                  variant="info" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-500 border-0 hover:from-violet-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold"
                >
                  Plan Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              LearnPath by the Numbers
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Join thousands of students who are already transforming their education with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">10K+</div>
              <div className="text-purple-200">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-purple-200">Courses Available</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">95%</div>
              <div className="text-purple-200">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-purple-200">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Advanced Learning Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the cutting-edge tools that make LearnPath the ultimate learning platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-cyan-900 to-blue-900 rounded-2xl p-8 text-center border border-cyan-700 hover:border-cyan-500 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaLaptop className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI-Powered Learning</h3>
              <p className="text-cyan-200">Intelligent algorithms adapt to your learning style and pace.</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-900 to-green-900 rounded-2xl p-8 text-center border border-emerald-700 hover:border-emerald-500 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaBrain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Smart Recommendations</h3>
              <p className="text-emerald-200">Get personalized course suggestions based on your interests.</p>
            </div>

            <div className="bg-gradient-to-br from-violet-900 to-purple-900 rounded-2xl p-8 text-center border border-violet-700 hover:border-violet-500 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaGlobe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Global Community</h3>
              <p className="text-violet-200">Connect with learners from around the world.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-white to-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already experiencing the future of education with LearnPath.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <Button 
                variant="warning" 
                size="lg" 
                className="px-8 py-4 text-white hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                <FaStar className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                variant="outline-primary" 
                size="lg" 
                className="px-8 py-4 border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-105 font-bold text-lg"
              >
                <FaRocket className="w-5 h-5 mr-2" />
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;