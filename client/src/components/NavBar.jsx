import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
    return (
        <Navbar className="navbar-orange sticky-top" expand="sm" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto ml-3">
              <Nav.Link href="#proposte" active>Proposals</Nav.Link>
              <Nav.Link href="#applicazioni">Applications</Nav.Link>
              <Nav.Link href="#CV">CV</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
}

export default NavBar;