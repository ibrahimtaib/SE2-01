import React from 'react';
import { useForm } from 'react-hook-form';
import './ApplyForm.css'
// import Header from './Header.jsx'
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function ApplyForm({proposal}) {
  const { register, handleSubmit, formState } = useForm();
  //TODO fetch from auth 
  const student = {name: "Probo E Approvo", email: "eeeee@eeeeee.eee"}
  const onSubmit = async (data) => {
    console.log(data);
    // TODO Api call
  };
  return (
    <>
    {/* <Header/> */}
    <div className='container-apply-form'>
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