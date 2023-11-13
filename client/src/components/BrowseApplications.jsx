import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const ProposalList = ({ data }) => {
  const [proposals, setProposals] = useState(data);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
      setProposals(data);
    }
  }, [data]);
  

  const handleApplicationAction = (proposalId, studentId, action) => {
    console.log(`Proposal ID: ${proposalId}, Student ID: ${studentId}, Action: ${action}`);
  };

  const handleTitleClick = (selectedProposal) => {
    if (selectedProposal) {
      const { proposal, student } = selectedProposal;
      if (proposal && student) {
        // Redirect to the proposal details page
        navigate(`/proposal/${proposal.id}`, { state: { proposal } });
      }
    }
  };

  const handleStudentClick = (selectedProposal) => {
    if (selectedProposal) {
      const { proposal, student } = selectedProposal;
      if (proposal && student) {
        // Redirect to the proposal details page
        navigate(`/student/${student.id}`, { state: { student } });
      }
    }
  };

  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight text-indigo-800 mb-6 text-center">Thesis Applications</h1>

      {loading ? (
        <Container className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading...</p>
        </Container>
      ) : (
        proposals.map((selectedProposal) => (
          <Row key={selectedProposal.proposal.id} className="mt-6 border rounded p-4 bg-white shadow-md">
            <Col md={6}>
              <div
                onClick={() => handleTitleClick(selectedProposal)}
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
                className="hover:underline"
              >
                <h2 className="text-xl font-semibold text-indigo-600">{selectedProposal.proposal.title}</h2>
              </div>
            </Col>

            <Col md={6}>
              <div className="d-flex flex-column align-items-start">
                <span
                  onClick={() => handleStudentClick(selectedProposal)}
                  style={{ cursor: 'pointer', fontWeight: 'bold', color: 'black' }}
                  className="hover:underline font-semibold text-black mb-2"
                >
                  {`${selectedProposal.student.name} ${selectedProposal.student.surname}`}
                </span>
                <p className="text-sm text-gray-600">
                  Degree: {selectedProposal.student.degree.TITLE_DEGREE}
                </p>
              </div>
            </Col>

            <Col md={12} className="mt-3 d-flex justify-content-end">
              <Button
                onClick={() => handleApplicationAction(selectedProposal.proposal.id, selectedProposal.student.id, 'accept')}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
              >
                Accetta
              </Button>
              <Button
                onClick={() => handleApplicationAction(selectedProposal.proposal.id, selectedProposal.student.id, 'reject')}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300 ml-2"
              >
                Rifiuta
              </Button>
            </Col>
          </Row>
        ))
      )}
    </Container>
  );
};

export default ProposalList;
