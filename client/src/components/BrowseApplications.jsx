/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API';

const ProposalList = ({ applications , loading }) => {
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [hoveredStudent, setHoveredStudent] = useState(null);
  const navigate = useNavigate();


  const handleApplicationAction = (applicationId, studentId, action) => {
    console.log(`Application ID: ${applicationId}, Student ID: ${studentId}, Action: ${action}`);
  };

  const handleTitleClick = async (selectedApplication) => {
    if (selectedApplication) {
      const { proposal, student, status, comment, date } = selectedApplication;
      if (proposal && student) {
        try {
          const proposalDetails = await API.getProposalById(proposal.id);

          navigate(`/applications/proposal/${proposal.id}`, {
            state: {
              proposal: proposalDetails.proposal,
              teacher: proposalDetails.teacher,
              degree: proposalDetails.degree,
              student,
              status,
              comment,
              date
            }
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };


  
  const handleStudentClick = async (selectedApplication) => {
    if (selectedApplication) {
      const { student } = selectedApplication;
      if (student) {
        try {
          const studentDetails = await API.getExamAndStudentById(student.id);
  
          navigate(`/students/${student.id}`, {
            state: {
              student: studentDetails.student, 
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <Container>
      <br></br>
      <h1 className="text-3xl font-bold tracking-tight text-indigo-800 mb-6 text-center">
        Thesis Applications
      </h1>
      {loading ? (
        <Container className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading...</p>
        </Container>
      ) : (
        applications.map((selectedApplication, index) => (
          <Row
            key={index}
            className="mt-6 border rounded p-4 bg-white shadow-md"
            onMouseEnter={() => setHoveredTitle(null)} 
            onMouseLeave={() => {
              setHoveredTitle(null);
              setHoveredStudent(null);
            }}
          >
            <Col md={6}>
              <div
                onClick={() => handleTitleClick(selectedApplication)}
                onMouseEnter={() => setHoveredTitle(index)}
                onMouseLeave={() => setHoveredTitle(null)}
                style={{
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  textDecoration: hoveredTitle === index ? 'underline' : 'none'
                }}
                className="hover:underline"
              >
                <h2 className="text-xl font-semibold text-indigo-600">
                  {selectedApplication.proposal.title}
                </h2>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex flex-column align-items-start">
                <span
                  onClick={() => handleStudentClick(selectedApplication)}
                  onMouseEnter={() => setHoveredStudent(index)}
                  onMouseLeave={() => setHoveredStudent(null)}
                  style={{
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: 'black',
                    textDecoration: hoveredStudent === index ? 'underline' : 'none'
                  }}
                  className="hover:underline font-semibold text-black mb-2"
                >
                  {`${selectedApplication.student.name} ${selectedApplication.student.surname}`}
                </span>
                <p className="text-sm text-gray-600">
                  Degree: {selectedApplication.student.degree.TITLE_DEGREE}
                </p>
              </div>
            </Col>
            <Col md={12} className="mt-3 d-flex justify-content-end">
              <Button
                onClick={() =>
                  handleApplicationAction(selectedApplication.id, selectedApplication.student.id, 'accept')
                }
                className="bg-success text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300 mx-2" 
              >
                Accept
              </Button>
              <Button
                onClick={() =>
                  handleApplicationAction(selectedApplication.id, selectedApplication.student.id, 'reject')
                }
                className="bg-danger text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
              >
                Refuse
              </Button>
            </Col>
          </Row>
        ))
      )}
    </Container>
  );
};

export default ProposalList;
