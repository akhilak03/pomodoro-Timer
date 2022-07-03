import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Route, Routes, NavLink } from 'react-router-dom'
import Home from './Home';
import "./Header.css"
import Login from './Login';

import Signup from './Signup';
import Timer from './Timer';

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { clearLoginStatus } from '../Slices/userSlice'


function Header() {
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  )

  //get dispath function
  let dispath = useDispatch()

  //get navigate function
  let navigate = useNavigate()

  //logout user
  const userLogout = () => {
    localStorage.clear();
    dispath(clearLoginStatus());
    navigate("/login");
  }


  return (
    <>

      <Navbar collapseOnSelect bg="dark"  variant='dark'>
        <Container>
          <Navbar.Brand>
         POMODORO TIMER 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto navbar">
              {isSuccess !== true ? (
                <>
                  {/* These links can be visible when no user logged in */}
                  <Nav.Item>
                    <Nav.Link eventKey={1} as={NavLink} to="/">
                      Home
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey={2} as={NavLink} to="/Signup">
                      Signup
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey={3} as={NavLink} to="/login">
                      Login
                    </Nav.Link>
                  </Nav.Item>
                </>
              ) : (
                <>
                  {/* This dropdown is visible only when a user is logged in */}
                  <NavDropdown title={userObj.username} id="collasible-nav-dropdown">
                    <NavDropdown.Item>
                      <Nav.Link as={NavLink} to="/Timer" className='text-dark'>
                        Timer
                      </Nav.Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={userLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Timer" element={<Timer/>}/>   
        <Route path="/Signup" element={<Signup />} />
        
      </Routes>
    </>
  )
}

export default Header