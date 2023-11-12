import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { React, useState, useEffect, useContext } from 'react';

function ProposalCard() {
    const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Card className="text-left m-3">
      <Card.Header>Prof. Marco Rossi</Card.Header>
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Text>
          Dr. Sarah Brown from the Political Science Department at Global University is embarking on a cross-country analysis of the impact of social media on political discourse. This proposal seeks to examine how social media platforms shape public opinion and influence political discussions in different regions. The study promises to provide valuable insights into the evolving landscape of modern politics.
        </Card.Text>
        <Card.Text className={isVisible ? '' : 'nascondi'}>
          <b>Supervisor</b>: Andrea Nanni
          <br/><b>Co-Supervisor</b>: Marco Rossi
          <br/><b>Level</b>: Bachelor
          <br/><b>Group</b>: ar1
          <br/><b>Type</b>: Sperimental
          <br/><b>CDS</b>: Computer Engineering
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
      <Card.Footer className="text-muted">Expiration: 02/10/2023</Card.Footer>
    </Card>
  );
}

export default ProposalCard