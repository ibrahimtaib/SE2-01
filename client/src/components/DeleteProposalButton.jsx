/* eslint-disable react/prop-types */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Modal, Button} from 'react-bootstrap'; 
import {deleteProposal} from '../api/api';
import { useState } from 'react';  

function DeleteProposalButton({proposal}) {
	const [showAlert, setShowAlert] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [alertBody, setAlertBody] = useState("Are you sure you want to delete this proposal?"); //TODO change this to the actual proposal title
  const backdrop = deleting?{backdrop: 'static'}:{};

 const handleDelete = async (proposal) => {
  setDeleting(true);
  const res = await deleteProposal(proposal);
  if (res) {
    setShowAlert(false);
    //TODO refresh page
  }
  else {
    setAlertBody("An error occurred. Please try again later.");
  }
  setDeleting(false);
}

 
	function modalClose() {
		setShowAlert(false);	
    setAlertBody("Are you sure you want to delete this proposal?");
	}
	return (
		<div>
		<Button variant="danger" onClick={() => setShowAlert(true)}>Delete</Button>

		<Modal animation={false} {...backdrop} show={showAlert} onHide={modalClose}>
		<Modal.Header closeButton>  
		<Modal.Title>Delete proposal</Modal.Title>  
		</Modal.Header>  

		<Modal.Body>  
		{!deleting?<p>{alertBody}</p>  
    :(<div className="spinner-border" role="status">
    </div>
      )}
		</Modal.Body>  

		<Modal.Footer>  
		<Button variant="secondary" onClick={modalClose}>Cancel</Button>  
		<Button variant="primary" onClick={() => handleDelete(proposal)}>Confirm</Button>  
		</Modal.Footer>  
		</Modal>  
		</div>
	);
}

export default DeleteProposalButton;