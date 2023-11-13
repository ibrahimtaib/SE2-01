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
          <div>
            {/* <button
              className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-full mr-3 font-semibold"
              onClick={() => { navigateTo('/add') }}
            >
              New Proposal
            </button> */}
            <button
              className="bg-white text-gray-700 hover:text-gray-900 py-2 px-4 rounded-full mr-3 border-solid border border-gray-600 font-semibold"
              onClick={() => { navigateTo('/login') }}
            >
              Sign In
            </button>

          </div>
        </Navbar>

      );
}

export default NavBar;