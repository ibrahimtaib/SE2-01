/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Alert, Modal, Spinner, } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { addPageUpdate } from '../api/api';
import DeleteProposalButton from './DeleteProposalButton';

function ProposalCard({showArchived, user, proposal, setUpdate, setProposalToInsert, refetchDynamicContent }) {
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
      setTimeout(() => {
        setArchived(false);
      }, 2000);
    }).finally(() => {
      setTimeout(() => {
        refetchDynamicContent(user.id,user.email);
      }, 2000);
      setLoadingArchived(false);
    });
  }
  
  const handleExtract = () => {
    setLoadingArchived(true);
    
    addPageUpdate({
      ...proposal,
      archived: false
    }).then(() => {
      setArchived(true);
      setTimeout(() => {
        setArchived(false);
      }, 2000);
    }).finally(() => {
      setTimeout(() => {
        refetchDynamicContent(user.id,user.email);
      }, 2000);
      setLoadingArchived(false);
    });
  }

  return (
    <>
      <Card className="text-left m-3">
        {user.role ==  "student" ? <Card.Header>{proposal.Name} {proposal.Surname}</Card.Header> : ""}
        <Card.Body>
          <Card.Title>{proposal.Title} 
          {user.email && proposal.CoSupervisor.includes(user.email.trim()) ? ' (cosupervised)' : ''}
          </Card.Title>
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
            <br /><b>Notes</b>: {proposal.Notes ? proposal.Notes : 'None'}
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

                    <Dropdown.Toggle title='Actions' variant="" id="dropdown-button-drop-start" />
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
                      {showArchived ? <Dropdown.Item onClick={handleExtract}>Extract</Dropdown.Item> : <Dropdown.Item onClick={handleArchive}>Archive</Dropdown.Item>}
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
      <Modal show={archived}>
        <Modal.Body>
          {!loadingArchived ? <>
            {showArchived ? <Alert className='w-100' variant='success'> Extracted successfully</Alert> : <Alert className='w-100' variant='success'> Archived successfully</Alert>}
          </>
            : <div className="d-flex justify-content-center align-items-center">
              {showArchived ? <p className='text-primary px-2 m-0' >Extracting your application...</p> : <p className='text-primary px-2 m-0' >Archiving your application...</p>}

              <Spinner animation="border" variant="primary" size="sm" />
            </div>}
        </Modal.Body>
      </Modal>
    </>

  );
}

export default ProposalCard;
