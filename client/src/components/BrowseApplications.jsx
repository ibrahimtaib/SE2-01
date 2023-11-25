/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API';
import { sendMail } from '../api/api';

const ProposalList = ({ applications , loading }) => {
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [hoveredStudent, setHoveredStudent] = useState(null);
  const navigate = useNavigate();


  const handleApplicationAction = async (applicationId, studentId, action) => {
    const studentDetails = await API.getExamAndStudentById(studentId);
    await sendMail(applicationId, studentDetails, action);
    console.log(`Application ID: ${applicationId}, Student ID: ${hoveredStudent}, Action: ${action}`);
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
          console.log(studentDetails);
  
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
    <div>
      <h1>Thesis Applications</h1>
      <br></br>
      {loading ? (
        <div>Loading...</div>
      ) : applications ? (
        applications.length > 0 ? (
          applications.map((selectedApplication, index) => (
            <>
            <div
              key={index}
              onMouseLeave={() => {
                setHoveredTitle(null);
                setHoveredStudent(null);
              }}
            >
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
                {selectedApplication.proposal.title}
              </div>
              <div
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
                <br />
                Degree: {selectedApplication.student.degree.TITLE_DEGREE}
              </div>
              <button
                onClick={() => handleApplicationAction(selectedApplication.id, selectedApplication.student.id, 'accept')}
                className="bg-success text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300 mx-2"
              >
                Accept
              </button>
              <button
                onClick={() => handleApplicationAction(selectedApplication.id, selectedApplication.student.id, 'reject')}
                className="bg-danger text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
              >
                Refuse
              </button>
            </div>
            <br></br>
            </>
          ))
        ) : (
          <div>No applications found.</div>
        )
      ) : (
        <div>Applications not defined.</div>
      )}
    </div>
    </Container>
  );
};

export default ProposalList;
