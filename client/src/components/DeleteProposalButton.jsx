/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { deleteProposal } from '../api/api';

function DeleteProposalButton({proposal}) {
	const [showAlert, setShowAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [succesfulDelete, setSuccesfulDelete] = useState(null);
  const [alertBody, setAlertBody] = useState("Are you sure you want to delete this proposal?"); //TODO change this to the actual proposal title
  const backdrop = deleting || succesfulDelete?{backdrop: 'static'}:{};

  const handleDelete = async (proposal) => {
    console.log(proposal)
    setDeleting(true);
    const res = await deleteProposal(proposal);
    if (res) {
      setSuccesfulDelete(true);
      setAlertBody("Proposal deleted successfully!");
    }
    else {
      setAlertBody("An error occurred. Please try again later.");
      setSuccesfulDelete(false);
    }
    setDeleting(false);
  }

  const handleNavigate = async () => {
    //TODO refresh page
    modalClose();
  }
 
	function modalClose() {
    if(succesfulDelete == true) {
      //TODO refresh page
      window.location.reload();
    }
		setShowAlert(false);	
    setSuccesfulDelete(null)
    setAlertBody("Are you sure you want to delete this proposal?");
	}
	return (
		<>
		<Button as={Dropdown.Item} style={{width : "100%" , color: "white", textAlign : "left", backgroundColor : "red"}} disabled={!proposal.deletable} variant="danger" onClick={() => setShowAlert(true)}>Delete</Button>

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
		{!(deleting || succesfulDelete != null) && <Button variant="danger" onClick={() => handleDelete(proposal)}>Confirm</Button> } 
		{!(deleting || succesfulDelete === true) && <Button variant="secondary" onClick={modalClose}>Cancel</Button>} 
		{(succesfulDelete && !deleting) && <Button variant="primary" onClick={handleNavigate}>Close</Button> } 
     
		</Modal.Footer>  
		</Modal>  
		</>
	);
}

export default DeleteProposalButton;