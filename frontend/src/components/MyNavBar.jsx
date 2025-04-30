import React, { useState, useRef } from 'react';
import { Navbar, Nav, Container, Button, Overlay } from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';
import logo from '../assets/projectlogo.png';
import { Link, useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

function MyNavbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileIconRef = useRef(null);
  const navigate = useNavigate();

  const handleProfile = () => {
    setShowProfileMenu(false);
    navigate('/profile');
  };

  const handleSettings = () => {
    setShowProfileMenu(false);
    navigate('/settings');
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    // Add logout logic here
    navigate('/home');
  };

  return (
    <div>
      <Navbar bg='secondary' expand='lg'>
        <Container>
          <Navbar.Brand as={Link} to='/' className='fw-bold d-flex align-items-center'>
            <img
              src={logo}
              alt="Logo"
              style={{ width: 32, height: 32, marginRight: 10, borderRadius: '50%' }}
            />
            Queue Away
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className='ms-auto d-flex align-items-center gap-3'>
              <Link className="nav-link" to='/home'>Home</Link>
              <Link className="nav-link" to='/queue-directory'>Queue Directory</Link>
              <Link className="nav-link" to='/myqueues'>My Queues</Link>
              <Link className="nav-link" to='/about'>About</Link>
              <Link className="nav-link" to='/help'>Help</Link>
              <span ref={profileIconRef} style={{ cursor: 'pointer' }} onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <BsPersonCircle size={24} />
              </span>
              <Overlay
                show={showProfileMenu}
                target={profileIconRef.current}
                placement="bottom-end"
                containerPadding={20}
                rootClose
                onHide={() => setShowProfileMenu(false)}
              >
                <div>
                  <ProfileMenu
                    onProfile={handleProfile}
                    onSettings={handleSettings}
                    onLogout={handleLogout}
                  />
                </div>
              </Overlay>
              <Link to='/business-login' style={{ textDecoration: 'none' }}>
                <Button variant='dark' size='sm'>Business Login</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNavbar;