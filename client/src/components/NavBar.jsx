/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar({user}) {
    return (
        <Navbar className="navbar-orange sticky-top" expand="sm" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {user ? (
            <>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto ml-3">
              <Nav.Link href="/" active>Proposals</Nav.Link>
              <Nav.Link href={user.role === "teacher" ? "/applications": "#applications"}>Applications</Nav.Link>
              <Nav.Link href="#CV">CV</Nav.Link>
          </Nav>
          </Navbar.Collapse>
          <NavDropdown title="Account" id="basic-nav-dropdown" style={{color:"white", paddingInline:10}}>
            <NavDropdown.Item href="#action/3.1">My info</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              My Applications
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Settings
            </NavDropdown.Item>
        </NavDropdown>
        <Button 
          variant="outline-light" 
          className="mr-3" 
          style={{ marginRight: '10px' }}
          onClick={() => window.location.href = "/"}
          >Log out</Button>
          </>
          ):(
          <Button 
          variant="outline-light" 
          className="mr-3" 
          style={{ marginRight: '10px' }}
          onClick={() => window.location.href = "/login"}
          >Log In</Button>
          )}
        </Navbar>
      );
}

export default NavBar;