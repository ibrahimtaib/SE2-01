import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ProposalDetails = () => {
  const location = useLocation();
  const { proposal } = location.state || {};

  if (!proposal) {
    return <div className="max-w-4xl mx-auto mt-8 text-red-500">Dati mancanti o non validi.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Link to="/applications" className="text-indigo-500 hover:text-indigo-700 flex items-center mb-4 text-center">
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" style={{ marginTop: '40px', marginLeft: '50px'}} />
        Back
      </Link>

      <div className="max-w-2xl mx-auto bg-white overflow-hidden shadow-sm rounded-lg p-6 mb-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6">Proposal Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-indigo-600 mx-auto">
            <p className="text-black mb-2">
              <span className="font-semibold">Title:</span> <span style={{color: 'gray'}}>{proposal.title}</span>
            </p>
            <p className="text-black mb-2">
              <span className="font-semibold">Supervisor:</span> <span style={{color: 'gray'}}>{proposal.teacher.name} {proposal.teacher.surname}</span>
            </p>
            <p className="text-black mb-2">
              <span className="font-semibold">Co-supervisors:</span> <span style={{color: 'gray'}}>{proposal.coSupervisors}</span>
            </p>
            <p className="text-black mb-2">
              <span className="font-semibold">Type:</span> <span style={{color: 'gray'}}> {proposal.type}</span>
            </p>
            <p className="text-black mb-2">
              <span className="font-semibold">Level:</span> <span style={{color: 'gray'}}> {proposal.level}</span>
            </p>
          </div>

          <div className="text-black mx-auto">
            <p className="mb-2">
              <span className="font-semibold">Description:</span> <span style={{color: 'gray'}}>{proposal.description}</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Notes:</span> <span style={{color: 'gray'}}>{proposal.notes}</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Expiration Date:</span> <span style={{color: 'gray'}}>{proposal.expiration}</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Groups:</span> <span style={{color: 'gray'}}>{proposal.groups.join(', ')}</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Required Knowledge:</span><span style={{color: 'gray'}}> {proposal.requiredKnowledge}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetails;
