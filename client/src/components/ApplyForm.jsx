/* eslint-disable react/prop-types */
import {useState} from 'react';
import { useForm } from 'react-hook-form';
import DismissableAlert from './DismissableAlert.jsx';
import './ApplyForm.css'
import applicationApi from '../api/api.js';
import { useHistory } from 'react-router-dom';

function ApplyForm({proposal}) {
  const history = useHistory();
  const { register, handleSubmit, formState } = useForm();
  const [showAlert, setShowAlert] = useState(false);
  //TODO fetch from auth 
  const student = {name: "Signor E", email: "eeeee@eeeeee.eee", id: 4}

  const onSubmit = async (data) => {
      applicationApi.addApplication({
      STUDENT_ID: student.id,
      PROPOSAL_ID: proposal.id,
      comment: data.comment.trim()
    }).then(
      /// TODO: redirect to application page
      history.push("/")
    ).catch(() => setShowAlert(true))
  };

  return (
    <>
    <div className='container-apply-form'>
    <DismissableAlert showAlert={showAlert} setShowAlert={setShowAlert} heading={"Sorry!"} message={"There was an error while submitting your application, please try again in a few moments or log in again if the problem persists."}/>
      <h1 className='title-apply-form'>Apply to: {proposal.title}</h1>
      <h3 id="supervisor-apply-form">Supervisor: {proposal.supervisor.name}</h3>

      <div className="student-information-apply-form">
        <span><strong>Student Name</strong>: {student.name}</span>
        <span><strong>Student Email</strong>: {student.email}</span>
      </div>

      <div className='input-apply-form'>
        <label htmlFor="textarea-apply-form">Message to the supervisor:</label>
        <textarea id="textarea-apply-form" {...register('comment')} placeholder='Write here' className='textarea-apply-form'></textarea>
      </div>
      <button disabled={formState.isSubmitting} id='button-apply-form' onClick={handleSubmit(onSubmit)}>Submit Application</button>
    </div>
    </>
  );
}

export default ApplyForm