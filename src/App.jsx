import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Navbar from './components/layout/Navbar';
import DashboardFloatingButton from './components/DashboardFloatingButton';

// Protected route component - TEMPORARILY DISABLED FOR TESTING
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // TEMPORARY: Allow access to dashboard for testing
  // In production, uncomment the authentication check below
  
  // Show loading state while authentication is being checked
  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }
  
  // TEMPORARILY DISABLED: Always allow access for testing
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }
  
  return children;
};

function AppContent() {
  return (
    <Router>
      <Navbar />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <DashboardFloatingButton />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
