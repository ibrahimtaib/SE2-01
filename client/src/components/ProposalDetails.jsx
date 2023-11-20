import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useLocation } from 'react-router-dom';


const ProposalDetails = () => {
  const location = useLocation();
  const { proposal } = location.state || {};

  if (!proposal) {
    return <div className="max-w-4xl mx-auto mt-8 text-red-500">Dati mancanti o non validi.</div>;
  }

  return (
    <Container>
      <br></br>
    <div className="max-w-4xl mx-auto mt-8">

      <div className="max-w-2xl mx-auto bg-white overflow-hidden shadow-sm rounded-lg p-6 mb-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6">Proposal Details</h1>

        <Card style={{ textAlign: "left" }}>
          <Card.Header>{proposal.teacher.name} {proposal.teacher.surname}</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item><p className="text-black mb-2">
              <span className="font-semibold">Title:</span> <span style={{ color: 'gray' }}>{proposal.title}</span>
            </p></ListGroup.Item>
            <ListGroup.Item><p className="text-black mb-2">
              <span className="font-semibold">Co-supervisors:</span> <span style={{ color: 'gray' }}>{proposal.coSupervisors ? proposal.coSupervisors : "None"}</span>
            </p></ListGroup.Item>
            <ListGroup.Item><p className="text-black mb-2">
              <span className="font-semibold">Type:</span> <span style={{ color: 'gray' }}> {proposal.type}</span>
            </p></ListGroup.Item>
            <ListGroup.Item><p className="text-black mb-2">
              <span className="font-semibold">Level:</span> <span style={{ color: 'gray' }}> {proposal.level}</span>
            </p></ListGroup.Item>
            <ListGroup.Item><p className="mb-2">
              <span className="font-semibold">Description:</span> <span style={{ color: 'gray' }}>{proposal.description}</span>
            </p></ListGroup.Item>
            <ListGroup.Item>
              <p className="mb-2">
                <span className="font-semibold">Notes:</span> <span style={{ color: 'gray' }}>{proposal.notes}</span>
              </p>
            </ListGroup.Item>
            <ListGroup.Item> <p className="mb-2">
              <span className="font-semibold">Expiration Date:</span> <span style={{ color: 'gray' }}>{proposal.expiration}</span>
            </p></ListGroup.Item>
            <ListGroup.Item><p className="mb-2">
              <span className="font-semibold">Groups:</span> <span style={{ color: 'gray' }}>{proposal.groups.join(', ')}</span>
            </p></ListGroup.Item>
            <ListGroup.Item><p className="mb-2">
              <span className="font-semibold">Required Knowledge:</span><span style={{ color: 'gray' }}> {proposal.requiredKnowledge}</span>
            </p></ListGroup.Item>

          </ListGroup>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-indigo-600 mx-auto">

          </div>

          <div className="text-black mx-auto">

          </div>
        </div>
        <Link
          style={{ padding: "20px" }}
          to="/applications">
            <br></br>
          <Button
            variant="dark"
          >Go Back</Button>
        </Link>
        <br></br>
      </div>
    </div>
    </Container>
  );
};

export default ProposalDetails;
