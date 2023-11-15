import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { React, useState, useEffect, useContext } from 'react';

function ProposalCard(props) {
    const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Card className="text-left m-3">
      <Card.Header>Prof. {props.proposal.Teacher}</Card.Header>
      <Card.Body>
        <Card.Title>{props.proposal.Title}</Card.Title>
        <Card.Text>
          {props.proposal.Description}
        </Card.Text>
        <Card.Text className={isVisible ? '' : 'nascondi'}>
          <b>Supervisor</b>: {props.proposal.Supervisor}
          <br/><b>Co-Supervisor</b>: {props.proposal.CoSupervisor}
          <br/><b>Level</b>: {props.proposal.Level} 
          {props.proposal.Groups.map((group, index) => (
            <span key={index}><br/><b>Group {index + 1}</b>: {group}</span>
          ))}
          <br/><b>Type</b>: {props.proposal.Type}
          <br/><b>Cds</b>: {props.proposal.titleDegree}
          <br/><b>Notes:</b>: {props.proposal.Notes}
          <br/><b>Required Knowledge</b>: {props.proposal.RequiredKnowledge}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={toggleVisibility}>
            {isVisible ? 'Hide Details' : 'Show Details'}
          </Button>
          <Button variant="success">
            Apply
          </Button>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">Expiration: {props.proposal.Expiration}</Card.Footer>
    </Card>
  );
}

export default ProposalCard