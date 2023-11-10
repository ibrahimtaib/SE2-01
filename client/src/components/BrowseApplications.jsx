import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProposalList = ({ data }) => {
  const [proposals, setProposals] = useState(data);
  const navigate = useNavigate();

  const handleApplicationAction = (proposalId, studentId, action) => {
    console.log(`Proposal ID: ${proposalId}, Student ID: ${studentId}, Action: ${action}`);
  };

  const handleTitleClick = (selectedProposal) => {
    if (selectedProposal) {
      const { proposal, student } = selectedProposal;
      if (proposal && student) {
        navigate(`/proposal/${proposal.id}`, { state: { proposal, student } });
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-indigo-800 mb-6">Thesis Applications</h1>

      {proposals.map((selectedProposal) => (
        <div
          key={selectedProposal.proposal.id}
          className="mt-6 border rounded p-4 bg-white shadow-md flex items-center justify-between"
        >
          <div
            onClick={() => handleTitleClick(selectedProposal)}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
            className="hover:underline"
          >
            <h2 className="text-xl font-semibold text-indigo-600">{selectedProposal.proposal.title}</h2>
          </div>

          <div className="flex items-center">
            <div className="ml-4">
              <span className="text-gray-800 font-semibold">{`${selectedProposal.student.name} ${selectedProposal.student.surname}`}</span>
              <p className="text-sm text-gray-600">Degree: {selectedProposal.student.degree.TITLE_DEGREE}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => handleApplicationAction(selectedProposal.proposal.id, selectedProposal.student.id, 'accept')}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
            >
              Accetta
            </button>
            <button
              onClick={() => handleApplicationAction(selectedProposal.proposal.id, selectedProposal.student.id, 'reject')}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
            >
              Rifiuta
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProposalList;
