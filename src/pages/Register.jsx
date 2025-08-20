import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGraduationCap, FaRocket, FaBuilding, FaCalendarAlt, FaStar, FaBrain, FaShieldAlt, FaAward } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    full_name: '',
    major: '',
    year_level: '',
    gpa: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useContext(AuthContext);
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

    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={7}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mr-4 shadow-2xl">
                  <FaGraduationCap className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                  LearnPath
                </h1>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Join the Learning Revolution!</h2>
              <p className="text-emerald-200 text-lg">Create your account and start your personalized learning journey</p>
            </div>

            {/* Registration Form Card */}
            <Card className="border-0 shadow-3xl rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50">
              <Card.Body className="p-8">
                {error && (
                  <Alert variant="danger" className="mb-4 border-0 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-l-4 border-red-500">
                    <strong>Error:</strong> {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    {/* Personal Information */}
                    <Col md={6}>
                      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                          <FaUser className="w-5 h-5 text-cyan-600" />
                        </div>
                        Personal Information
                      </h4>
                      
                      <Form.Group className="mb-4">
                        <Form.Label className="text-gray-700 font-semibold mb-2">Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="text-gray-700 font-semibold mb-2">Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Choose a username"
                          className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="text-gray-700 font-semibold mb-2">Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200"
                          required
                        />
                      </Form.Group>
                    </Col>

                    {/* Academic Information */}
                    <Col md={6}>
                      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                          <FaBuilding className="w-5 h-5 text-emerald-600" />
                        </div>
                        Academic Information
                      </h4>
                      
                      <Form.Group className="mb-4">
                        <Form.Label className="text-gray-700 font-semibold mb-2">Major/Field of Study</Form.Label>
                        <Form.Control
                          type="text"
                          name="major"
                          value={formData.major}
                          onChange={handleChange}
                          placeholder="e.g., Computer Science"
                          className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="text-gray-700 font-semibold mb-2">Year Level</Form.Label>
                        <Form.Select
                          name="year_level"
                          value={formData.year_level}
                          onChange={handleChange}
                          className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                          required
                        >
                          <option value="">Select Year Level</option>
                          <option value="Freshman">Freshman</option>
                          <option value="Sophomore">Sophomore</option>
                          <option value="Junior">Junior</option>
                          <option value="Senior">Senior</option>
                          <option value="Graduate">Graduate</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="text-gray-700 font-semibold mb-2">Current GPA</Form.Label>
                        <Form.Control
                          type="number"
                          step="0.01"
                          min="0"
                          max="4"
                          name="gpa"
                          value={formData.gpa}
                          onChange={handleChange}
                          placeholder="e.g., 3.75"
                          className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Password Section */}
                  <div className="mt-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                        <FaLock className="w-5 h-5 text-violet-600" />
                      </div>
                      Security
                    </h4>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="text-gray-700 font-semibold mb-2">Password</Form.Label>
                          <div className="relative">
                            <Form.Control
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Create a strong password"
                              className="border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200"
                              required
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-violet-500 transition-colors duration-200"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                            </button>
                          </div>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="text-gray-700 font-semibold mb-2">Confirm Password</Form.Label>
                          <div className="relative">
                            <Form.Control
                              type={showPassword2 ? 'text' : 'password'}
                              name="password2"
                              value={formData.password2}
                              onChange={handleChange}
                              placeholder="Confirm your password"
                              className="border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200"
                              required
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-violet-500 transition-colors duration-200"
                              onClick={() => setShowPassword2(!showPassword2)}
                            >
                              {showPassword2 ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                            </button>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>

                  <div className="mt-6">
                    <Form.Check
                      type="checkbox"
                      id="terms"
                      label="I agree to the Terms of Service and Privacy Policy"
                      className="text-gray-600 mb-4"
                      required
                    />
                    
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-100 bg-gradient-to-r from-emerald-500 to-green-500 border-0 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="d-flex align-items-center justify-center">
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Creating Account...
                        </div>
                      ) : (
                        <div className="d-flex align-items-center justify-center">
                          <FaRocket className="w-5 h-5 mr-2" />
                          Create Account
                        </div>
                      )}
                    </Button>
                  </div>
                </Form>

                <div className="text-center mt-6">
                  <p className="text-gray-600 mb-0">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
                    >
                      Sign in here
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
                    Go to Dashboard (No Registration Required)
                  </Button>
                </Link>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <FaUser className="w-6 h-6 text-white" />
                </div>
                <p className="text-cyan-200 text-sm">Personal Profile</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <FaAward className="w-6 h-6 text-white" />
                </div>
                <p className="text-emerald-200 text-sm">Academic Tracking</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <FaShieldAlt className="w-6 h-6 text-white" />
                </div>
                <p className="text-violet-200 text-sm">Secure Platform</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <FaBrain className="w-6 h-6 text-white" />
                </div>
                <p className="text-orange-200 text-sm">Smart Learning</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;