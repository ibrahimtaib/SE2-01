/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import DeleteProposalButton from './DeleteProposalButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { addPageUpdate } from '../api/api';
import { Modal, Alert, Spinner, CloseButton, ModalFooter } from 'react-bootstrap';

function ProposalCard({ user, proposal, setUpdate, setProposalToInsert }) {
  const [isVisible, setIsVisible] = useState(false);
  const [archived, setArchived] = useState(false);
  const [loadingArchived, setLoadingArchived] = useState(false);
  const navigateTo = useNavigate();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleArchive = () => {
    setLoadingArchived(true);
    addPageUpdate({
      ...proposal,
      archived: true
    }).then(() => {
      setArchived(true);
      setLoadingArchived(false);
      setTimeout(() => {
        setArchived(false);
      }, 4000);
    })
      .catch((err) => {
        setLoadingArchived(false);

      })
  }

  return (
    <>
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
            <br /><b>Cds</b>: {proposal.titleDegree}
            <br /><b>Notes</b>: {proposal.Notes}
            <br /><b>Required Knowledge</b>: {proposal.RequiredKnowledge}
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Button variant="outline-secondary" onClick={toggleVisibility}>
              {isVisible ? 'Hide Details' : 'Show Details'}
            </Button>
            <div id='buttons' >
              {user.role === "student" ? (
                <Button
                  onClick={() => navigateTo(`/proposals/${proposal.id}/apply`)}
                  variant="success">
                  Apply
                </Button>
              ) : (
                <>
                  <Dropdown>

                    <Dropdown.Toggle split variant="" id="dropdown-button-drop-start" />
                    <Dropdown.Menu>
                      <Dropdown.Item style={{
                        borderColor: "#1a365d",
                      }}
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
                              COD_DEGREE: proposal.Cds
                            },
                            teacherID: proposal.teacherID,
                            date: proposal.date,
                            requiredKnowledge: proposal.RequiredKnowledge,
                            notes: proposal.Notes
                          });
                          navigateTo(`/add`);
                        }}>Copy</Dropdown.Item>
                      <Dropdown.Item
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
                              COD_DEGREE: proposal.Cds
                            },
                            teacherID: proposal.teacherID,
                            date: proposal.date,
                            requiredKnowledge: proposal.RequiredKnowledge,
                            notes: proposal.Notes
                          });
                          navigateTo(`/add`);
                        }}>Update</Dropdown.Item>
                      <Dropdown.Item onClick={handleArchive}>Archive</Dropdown.Item>
                      <DeleteProposalButton proposal={proposal} />
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </div>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">Expiration: {proposal.Expiration}</Card.Footer>
      </Card>
      <Modal show={archived} onHide={() => { setArchived(false); }}>
        <Modal.Body>
          {!loadingArchived ? <>

            <Alert className='w-100' variant='success'> Archived successfully</Alert>
          </>
            : <div className="d-flex justify-content-center align-items-center">
              <p className='text-primary px-2 m-0' >Archiving your application...</p>

              <Spinner animation="border" variant="primary" size="sm" />
            </div>}
        </Modal.Body>
      </Modal>
    </>

  );
}

export default ProposalCard;
