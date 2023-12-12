/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function NavBar({ user , resetProposal }) {
  const navigateTo = useNavigate();
  return (
    <Navbar style={{ backgroundColor: "rgb(252, 122, 8)" }} className="sticky-top" expand="sm" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {user ? (
        <>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto ml-3">
              {user.role === "teacher" && <Nav.Link onClick={() => navigateTo(`/`)} active>Proposals</Nav.Link>}
              {user.role === "secretary" && <Nav.Link onClick={() => navigateTo(`/thesis-requests`)} active>Thesis Requests</Nav.Link>}
              {user.role === "teacher" && <Nav.Link onClick={() => navigateTo(`/applications`)}  >Applications</Nav.Link>}
              {user.role === "teacher" && <Nav.Link onClick={() => navigateTo(`/thesis-requests`)}  >Thesis Requests</Nav.Link>}

              {user.role === "student" && <Nav.Link onClick={() => navigateTo(`student/applications`)}  >Applications</Nav.Link>}
              {user.role === "student" && <Nav.Link onClick={() => navigateTo(`student/requestForm`)}  >Request Form</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
          <NavDropdown title={user.name} id="basic-nav-dropdown" style={{ color: "white", paddingInline: 10 }}>
            <NavDropdown.Item href="#action/3.1">Archived</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Settings
            </NavDropdown.Item>
          </NavDropdown>

          {user.role === "teacher" ? <Button
            variant="outline-light"
            className="mr-3"
            style={{ marginRight: '10px' }}
            onClick={() => {
              resetProposal()
              navigateTo('/add');
            }}
          >
            Add proposal
            </Button> : <></>}

          <Button
            variant="outline-light"
            className="mr-3"
            style={{ marginRight: '10px' }}
            onClick={() => window.location.href = "/logout"}
          >Log out</Button>
        </>
      ) : (
        <></>
      )}
    </Navbar>
  );
}

export default NavBar;