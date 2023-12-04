/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import dayjs from 'dayjs';

function ApplicationDecisionCard(props) {
  const [isVisible, setIsVisible] = useState(false);
  const navigateTo = useNavigate();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Card className="text-left m-3">
      <Card.Header>Prof. {props.application.proposal.teacher.surname}</Card.Header>
      <Card.Body>
        <Card.Title>{props.application.proposal.title}</Card.Title>
        <Card.Text>
          {props.application.proposal.description}
        </Card.Text>
        <Card.Text className={isVisible ? '' : 'nascondi'}>
          <br /><b>Your comment</b>: {props.application.comment}

          <br /><b>Level</b>: {props.application.proposal.level}
          {props.application.proposal.groups.map((group, index) => (
            <span key={index}><br /><b>Group {index + 1}</b>: {group}</span>
          ))}
          <br /><b>Type</b>: {props.application.proposal.type}
          <br /><b>Cds</b>: {props.application.proposal.degree.TITLE_DEGREE}
          <br /><b>Notes</b>: {props.application.comment}
          <br /><b>Required Knowledge</b>: {props.application.proposal.requiredKnowledge}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={toggleVisibility}>
            {isVisible ? 'Hide Details' : 'Show Details'}
          </Button>
          {props.application.status === "pending" ?
            <Button variant="outline-secondary" disabled>
              Status <br /><Badge bg="secondary">Pending..</Badge>
              <span className="visually-hidden">unread messages</span>
            </Button> : props.application.status === "accepted" ?
              <Button variant="outline-success" disabled>
                Status <br /><Badge bg="success">Approved</Badge>
                <span className="visually-hidden">unread messages</span>
              </Button> : <Button variant="outline-danger" disabled>
                Status <br /><Badge bg="danger">Rejected</Badge>
                <span className="visually-hidden">unread messages</span>
              </Button>}

        </div>
      </Card.Body>
      <Card.Footer className="text-muted">Application date: {dayjs(props.application.date).format('DD/MM/YYYY')}</Card.Footer>
    </Card>
  );
}

export default ApplicationDecisionCard