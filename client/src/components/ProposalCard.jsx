/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function ProposalCard(props) {
  const [isVisible, setIsVisible] = useState(false);
  const navigateTo = useNavigate();


  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  //FIXME: Why we have no name here?
  return (
    <Card className="text-left m-3">
      {props.user.role != "teacher" && (
      <Card.Header>Prof. {props.proposal.Teacher}</Card.Header>
      )}
      <Card.Body>
        <Card.Title>{props.proposal.Title}</Card.Title>
        <Card.Text>
          {props.proposal.Description}
        </Card.Text>
        <Card.Text className={isVisible ? '' : 'nascondi'}>
          <br /><b>Level</b>: {props.proposal.Level}
          {props.proposal.Groups.map((group, index) => (
            <span key={index}><br /><b>Group {index + 1}</b>: {group}</span>
          ))}
          <br /><b>Type</b>: {props.proposal.Type}
          <br /><b>Cds</b>: {props.proposal.titleDegree}
          <br /><b>Notes:</b>: {props.proposal.Notes}
          <br /><b>Required Knowledge</b>: {props.proposal.RequiredKnowledge}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={toggleVisibility}>
            {isVisible ? 'Hide Details' : 'Show Details'}
          </Button>
          {
            props.user.role === "student" ? (
              <Button
              onClick={() => navigateTo(`/proposals/${props.proposal.id}/apply`)}
              variant="success">
              Apply
            </Button>
            ) : (
              <Button onClick={()=> navigateTo(`/proposals`)}
              variant='danger'>Delete</Button>
            )
          }
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">Expiration: {props.proposal.Expiration}</Card.Footer>
    </Card>
  );
}

export default ProposalCard