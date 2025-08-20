import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, firebaseUser, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold text-primary">
          Student Learning Platform
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {isAuthenticated || firebaseUser ? (
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            ) : null}
          </Nav>
          
          <Nav>
            {isAuthenticated || firebaseUser ? (
              <>
                <NavDropdown 
                  title={
                    <span>
                      <i className="bi bi-person-circle me-1"></i>
                      {user?.name || firebaseUser?.displayName || 'Profile'}
                    </span>
                  } 
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/dashboard/profile">
                    <i className="bi bi-person me-2"></i>
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/dashboard/courses">
                    <i className="bi bi-book me-2"></i>
                    My Courses
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="me-2">
                  <Button variant="outline-primary">Login</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button variant="primary">Register</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;