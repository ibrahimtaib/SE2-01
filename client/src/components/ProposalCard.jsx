/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function ProposalCard({ user, proposal, setUpdate, setProposalToInsert }) {
  const [isVisible, setIsVisible] = useState(false);
  const navigateTo = useNavigate();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Card className="text-left m-3">
      <Card.Header>{proposal.Name} {proposal.Teacher}</Card.Header>
      <Card.Body>
        <Card.Title>{proposal.Title}</Card.Title>
        <Card.Text>
          {proposal.Description}
        </Card.Text>
        <Card.Text className={isVisible ? '' : 'nascondi'}>
          <br /><b>Level</b>: {proposal.Level}
          {proposal.Groups.map((group, index) => (
            <span key={index}><br /><b>Group {index + 1}</b>: {group}</span>
          ))}
          <br /><b>Type</b>: {proposal.Type}
          <br /><b>Degree</b>: {proposal.titleDegree}
          <br /><b>Notes:</b> {proposal.Notes ? proposal.Notes : "None"}
          <br /><b>Required Knowledge</b>: {proposal.RequiredKnowledge}
          <br /><b>Co-Supervisors:</b> {proposal.CoSupervisor.length > 0 ? proposal.CoSupervisor.join(', ') : 'None'}
          <br /><b>Keywords:</b> {proposal.Keywords.length > 0 ? proposal.Keywords.join(', ') : 'None'}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={toggleVisibility}>
            {isVisible ? 'Hide Details' : 'Show Details'}
          </Button>
          <div id='buttons'>
          {user.role === "student" ? (
            <Button
              onClick={() => navigateTo(`/proposals/${proposal.id}/apply`)}
              variant="success">
              Apply
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  setUpdate(false);
                  setProposalToInsert({
                    id: proposal.id,
                    title: proposal.Title,
                    description: proposal.Description,
                    expiration: proposal.date,
                    coSupervisors: proposal.CoSupervisor,
                    keywords: proposal.Keywords,
                    degree: {
                      COD_DEGREE: proposal.cds
                    },
                    teacherID: proposal.teacherID,
                    date: proposal.date,
                    requiredKnowledge: proposal.RequiredKnowledge,
                    notes: proposal.Notes
                  });
                  navigateTo(`/add`);
                }}
                variant="">
                Copy
              </Button>
              {user.id === proposal.teacherID ? (
                <>
                  <Button
                    style={{
                      backgroundColor: "#1a365d",
                      color: "#fff",
                    }}
                    onClick={() => {
                      setUpdate(true);
                      setProposalToInsert({
                        id: proposal.id,
                        title: proposal.Title,
                        description: proposal.Description,
                        expiration: proposal.date,
                        coSupervisors: proposal.CoSupervisor,
                        keywords: proposal.Keywords,
                        degree: {
                          COD_DEGREE: proposal.cds
                        },
                        teacherID: proposal.teacherID,
                        date: proposal.date,
                        requiredKnowledge: proposal.RequiredKnowledge,
                        notes: proposal.Notes
                      });
                      navigateTo(`/add`);
                    }}
                    variant="">
                    Update
                  </Button>
                </>
              ) : ''}
            </>
          )}
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">Expiration: {proposal.Expiration}</Card.Footer>
    </Card>
  );
}

export default ProposalCard;
