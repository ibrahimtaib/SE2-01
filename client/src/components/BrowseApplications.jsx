/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API';
import { sendMail } from '../api/api';

const ProposalCard = ({ application, onAccept, onReject, isRequest=false }) => {
  const [hoveredTitle, setHoveredTitle] = useState(false);
  const [hoveredStudent, setHoveredStudent] = useState(false);
  const navigate = useNavigate();

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
              date,
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleStudentClick = async () => {
    if (application) {
      const { student } = application;
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

  const handleAccept = async () => {
    const confirmation = window.confirm("Are you sure you want to accept this proposal?");
    
    if (confirmation) {
      try {
        await onAccept(application.application.id);
        await sendMail(application.proposal.title, application.student,application.proposal.teacher, 'accept');
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const handleReject = async () => {
    const confirmation = window.confirm("Are you sure you want to reject this proposal?");
    
    if (confirmation) {
      try {
        await onReject(application.application.id);
        await sendMail(application.proposal.title, application.student,application.proposal.teacher, 'reject');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col md={4}>
            <Card.Title
              style={{
                cursor: 'pointer',
                fontWeight: hoveredTitle ? 'bold' : 'normal',
                textDecoration: hoveredTitle ? 'underline' : 'none',
              }}
              onClick={!isRequest?() => handleTitleClick(application): null}
              onMouseEnter={() => setHoveredTitle(true)}
              onMouseLeave={() => setHoveredTitle(false)}
            >
              {application.proposal.title}
            </Card.Title>
          </Col>
          <Col md={4}>
            <Card.Subtitle
              className="mb-2 text-muted"
              style={{
                cursor: 'pointer',
                fontWeight: hoveredStudent ? 'bold' : 'normal',
                color: 'black',
                textDecoration: hoveredStudent ? 'underline' : 'none',
              }}
              onClick={handleStudentClick}
              onMouseEnter={() => setHoveredStudent(true)}
              onMouseLeave={() => setHoveredStudent(false)}
            >
              {`${application.student.name} ${application.student.surname}`}
              <br />
              Degree: {application.student.degree.TITLE_DEGREE}
              <br />
              Date: {formatDate(application.application.date)}
            </Card.Subtitle>
          </Col>
          <Col md={4} className="d-flex justify-content-end align-items-center">
            <div style={{ marginRight: '10px' }}>
              {application.application.status === 'accept' && (
                <div style={{ color: 'green' }}>Accepted</div>
              )}
              {application.application.status === 'refuse' && (
                <div style={{ color: 'red' }}>Refused</div>
              )}
            </div>

            {application.application.status === 'pending' && (
              <>
                <Button onClick={handleAccept} variant="success" style={{ marginRight: '10px' }}>
                  Accept
                </Button>
                <Button onClick={handleReject} variant="danger">
                  Refuse
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const ProposalList = ({ applications, loading, onAccept, onReject, isRequest=false }) => {
  console.log("first application",applications[0]);
  return (
    <Container>
      <br />
      <h1>{!isRequest?"Thesis Applications": "Thesis Requests"}</h1>
      <br />
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      ) : applications ? (
        applications.length > 0 ? (
          applications.map((selectedApplication, index) => (
            <ProposalCard
              key={index}
              application={selectedApplication}
              onAccept={onAccept}
              onReject={onReject}
              isRequest={isRequest}
            />
          ))
        ) : (
          <div>No {isRequest?"requests":"applications"} found.</div>
        )
      ) : (
        <div>{isRequest?"Requests":"applications"} not defined.</div>
      )}
    </Container>
  );
};

export default ProposalList;
