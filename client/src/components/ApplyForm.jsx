/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addApplication } from '../api/api.js';
import './ApplyForm.css';
import DismissableAlert from './DismissableAlert.jsx';

function ApplyForm({proposal}) {
  const navigateTo = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const [showAlert, setShowAlert] = useState(false);
  //TODO fetch from auth 
  const student = {name: "Marco Rossi", email: "s123456@studenti.polito.it", id: 2}

  const onSubmit = async (data) => {
    try {
    const res = addApplication({
      STUDENT_ID: student.id,
      PROPOSAL_ID: proposal.id,
      comment: data.comment.trim()
      })
    console.log("application added", res)
    navigateTo("/")
    }catch(err){
      console.log("error adding application", err)
      setShowAlert(true)
    }
  };

  return (
    <>
    <div className='container-apply-form'>
    <DismissableAlert showAlert={showAlert} setShowAlert={setShowAlert} heading={"Sorry!"} message={"There was an error while submitting your application, please try again in a few moments or log in again if the problem persists."}/>
      <h1 className='title-apply-form'>Apply for: {proposal.title}</h1>
      <h3 id="supervisor-apply-form">Supervisor: {proposal.supervisor.name} {proposal.supervisor.surname}</h3>

      <div 
            style={{borderRadius: '5px', border: '1px solid #ccc', padding: '10px'}}

      className="student-information-apply-form">
        <span><strong>Student Name</strong>: {student.name}</span>
        <span><strong>Student Email</strong>: {student.email}</span>
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
    </>
  );
}

export default ApplyForm