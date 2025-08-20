import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGraduationCap, FaRocket, FaBrain, FaShieldAlt } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-2xl">
                  <FaGraduationCap className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  LearnPath
                </h1>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
              <p className="text-cyan-200 text-lg">Sign in to continue your learning journey</p>
            </div>

            {/* Login Form Card */}
            <Card className="border-0 shadow-3xl rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50">
              <Card.Body className="p-8">
                {error && (
                  <Alert variant="danger" className="mb-4 border-0 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-l-4 border-red-500">
                    <strong>Error:</strong> {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-gray-700 font-semibold mb-2 flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center mr-2">
                        <FaEnvelope className="w-3 h-3 text-cyan-600" />
                      </div>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="form-control-lg border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-6">
                    <Form.Label className="text-gray-700 font-semibold mb-2 flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center mr-2">
                        <FaLock className="w-3 h-3 text-emerald-600" />
                      </div>
                      Password
                    </Form.Label>
                    <div className="relative">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="form-control-lg border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                      </button>
                    </div>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-6">
                    <Form.Check
                      type="checkbox"
                      id="remember-me"
                      label="Remember me"
                      className="text-gray-600"
                    />
                    <Link 
                      to="/forgot-password" 
                      className="text-cyan-600 hover:text-cyan-700 font-medium hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 bg-gradient-to-r from-cyan-500 to-blue-500 border-0 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="d-flex align-items-center justify-center">
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Signing In...
                      </div>
                    ) : (
                      <div className="d-flex align-items-center justify-center">
                        <FaRocket className="w-5 h-5 mr-2" />
                        Sign In
                      </div>
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-6">
                  <p className="text-gray-600 mb-0">
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      className="text-cyan-600 hover:text-cyan-700 font-semibold hover:underline"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* Quick Access for Testing */}
            <div className="text-center mt-6">
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-4 border-2 border-violet-200">
                <p className="text-violet-700 text-sm mb-2 flex items-center justify-center">
                  <FaBrain className="w-4 h-4 mr-2" />
                  <strong>🧪 Development Mode:</strong> Quick access for testing
                </p>
                <Link to="/dashboard">
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="border-violet-500 text-violet-600 hover:bg-violet-500 hover:text-white bg-gradient-to-r from-violet-50 to-purple-50"
                  >
                    Go to Dashboard (No Login Required)
                  </Button>
                </Link>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <FaShieldAlt className="w-6 h-6 text-white" />
                </div>
                <p className="text-cyan-200 text-sm">Secure Login</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <FaBrain className="w-6 h-6 text-white" />
                </div>
                <p className="text-emerald-200 text-sm">Smart Platform</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <FaRocket className="w-6 h-6 text-white" />
                </div>
                <p className="text-violet-200 text-sm">Fast Access</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;