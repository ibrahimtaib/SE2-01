import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API';

const ProposalCard = ({ application, onAccept, onReject }) => {
  const [hoveredTitle, setHoveredTitle] = useState(false);
  const [hoveredStudent, setHoveredStudent] = useState(false);
  const navigate = useNavigate();

  const handleTitleClick = async () => {
    if (application) {
      const { proposal, student, status, comment, date } = application;
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
    try {
      await onAccept(application.application.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async () => {
    try {
      await onReject(application.application.id);
    } catch (error) {
      console.error(error);
    }
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
              onClick={handleTitleClick}
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

const ProposalList = ({ applications, loading, onAccept, onReject }) => {
  console.log(applications)
  return (
    <Container>
      <br />
      <h1>Thesis Applications</h1>
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
            />
          ))
        ) : (
          <div>No applications found.</div>
        )
      ) : (
        <div>Applications not defined.</div>
      )}
    </Container>
  );
};

export default ProposalList;
