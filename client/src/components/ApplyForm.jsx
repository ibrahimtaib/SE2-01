/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addApplication, sendMail } from '../api/api.js';
import './ApplyForm.css';
import DismissableAlert from './DismissableAlert.jsx';

function ApplyForm({proposal, user}) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigateTo = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");


  const onSubmit = async (data) => {
    setLoading(true);
    addApplication({
      STUDENT_ID: user?.id,
      PROPOSAL_ID: proposal.id,
      comment: data.comment.trim()
    }).then(async (res) => {
      if (res.status === 200 || res.status === 201)
      {
        const student = {name: user.name.split(' ')[0], surname: user.name.split(' ')[1], email: user.email}
        /* await sendMail(proposal.title, student, proposal.teacher, 'apply') */ //TODO: Fix e-mail sending
        setSubmitted(true);
      }
      setMessageAlert('');
      setShowAlert(false);
    }).then(async() => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setLoading(false);
      navigateTo("/");
    }).catch(() => {
      setMessageAlert("There was an error while submitting your application, please try again in a few moments.")
      setShowAlert(true)
      setLoading(false);
    })
  };

  return (
    <>
    <div className='container-apply-form'>
    <DismissableAlert showAlert={showAlert} setShowAlert={setShowAlert} heading={"Sorry!"} message={messageAlert}/>
      <h1 className='title-apply-form'>Apply to: {proposal.title}</h1>
      <h3 id="supervisor-apply-form">Supervisor: {proposal.supervisor.name} {proposal.supervisor.surname}</h3>

      <div 
            style={{borderRadius: '5px', border: '1px solid #ccc', padding: '10px'}}

      className="student-information-apply-form">
        <span><strong>Student Name</strong>: {user.name}</span>
        <span><strong>Student Email</strong>: {user.email}</span>
      </div>

      <div className='input-apply-form'>
        <label htmlFor="textarea-apply-form">Message to the supervisor:</label>
        <textarea id="textarea-apply-form" {...register('comment')} placeholder='Write here' className='textarea-apply-form'></textarea>
      </div>
      <Button 
      variant={formState.isSubmitting ? 'secondary' : 'success'}
      disabled={formState.isSubmitting} 
      id='button-apply-form' 
      onClick={handleSubmit(onSubmit)}
      >Submit Application
      </Button>
    </div>
    <Modal show={loading} onHide={() => {}}>
      <Modal.Body>
        {submitted?  <Alert className='w-100' variant='success'> Submitted  successfully. Returning to home page...</Alert>
        :<div className="d-flex justify-content-center align-items-center">
          <p className='text-primary px-2 m-0' >Submitting your application</p>

          <Spinner animation="border" variant="primary" size="sm"/>
        </div>}
      </Modal.Body>
    </Modal>
    </>
  );
}

export default ApplyForm