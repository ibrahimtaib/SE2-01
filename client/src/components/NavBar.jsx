/* eslint-disable react/prop-types */
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import API from '../API';
import VirtualClock from './VirtualClock';

function NavBar({ user , resetProposal }) {
  const navigateTo = useNavigate();
  return (
    <Navbar style={{ backgroundColor: "rgb(252, 122, 8)" }} className="sticky-top" expand="sm" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {user ? (
        <>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav defaultActiveKey="proposals" className="mr-auto ml-3">
              <Nav.Link eventKey="proposals" onClick={() => navigateTo(`/`)}>Proposals</Nav.Link>
              {user.role === "teacher" && <Nav.Link eventKey="teacherApps" onClick={() => navigateTo(`/applications`)}  >Applications</Nav.Link>}
              {user.role === "teacher" && <Nav.Link onClick={() => navigateTo(`/thesis-requests`)}  >Thesis Requests</Nav.Link>}

              {user.role === "student" && <Nav.Link eventKey="studentApps" onClick={() => navigateTo(`student/applications`)}  >Applications</Nav.Link>}
              {user.role === "student" && <Nav.Link eventKey="studentRequestForm" onClick={() => navigateTo(`student/requestForm`)}  >Request Form</Nav.Link>}

              {user.role === "secretary" && <Nav.Link onClick={() => navigateTo(`/thesis-requests`)} active>Thesis Requests</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
          <NavDropdown title={user.name} id='dropdown-button-drop-start' style={{ color: "white", marginRight: "5%"}}>
            {user.role === "teacher" ? <>
              <NavDropdown.Item onClick={() => {
                resetProposal()
                navigateTo('/add');
              }}>Add proposal</NavDropdown.Item>
            </> : <></>}
            {user.role === "student" ?
              <><NavDropdown.Item onClick={async () => {
                try {
                  const studentDetails = await API.getExamAndStudentById(user.id);
                  navigateTo(`/students/${user.id}`, {
                    state: {
                      student: studentDetails.student,
                    },
                  });
                } catch (error) {
                  console.error(error);
                }
              }}>Curriculum</NavDropdown.Item>
              </> : <></>}
            <VirtualClock />
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => window.location.href = "/logout"}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </>
      ) : (
        <></>
      )}
    </Navbar>
  );
}

export default NavBar;