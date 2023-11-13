import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ProposalDetails = () => {
  const location = useLocation();
  const { proposal } = location.state || {};

  if (!proposal) {
    return <div>Dati mancanti o non validi.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Modificare il percorso ("/") quando i percorsi corretti sono definiti */}
      <Link to="/" className="text-indigo-500 hover:text-indigo-700 flex items-center">
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back
      </Link>

      <h1 className="text-3xl font-bold text-indigo-800 mb-6">Proposal Details</h1>

      <div className="card border-indigo-500 shadow-md rounded p-6 mb-6">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">{proposal.title}</h2>
          <ul className="list-none">
            <li className="list-item"><span className="font-semibold">Supervisor:</span> {proposal.teacher.name} {proposal.teacher.surname}</li>
            <li className="list-item"><span className="font-semibold">Co-supervisors:</span> {proposal.coSupervisors}</li>
            <li className="list-item"><span className="font-semibold">Type:</span> {proposal.type}</li>
            <li className="list-item"><span className="font-semibold">Level:</span> {proposal.level}</li>
            <li className="list-item"><span className="font-semibold">Description:</span> {proposal.description}</li>
            <li className="list-item"><span className="font-semibold">Notes:</span> {proposal.notes}</li>
            <li className="list-item"><span className="font-semibold">Expiration Date:</span> {proposal.expiration}</li>
            <li className="list-item"><span className="font-semibold">Groups:</span> {proposal.groups.join(', ')}</li>
            <li className="list-item"><span className="font-semibold">Required Knowledge:</span> {proposal.requiredKnowledge}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetails;
