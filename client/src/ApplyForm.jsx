import React from 'react';
import { useForm } from 'react-hook-form';
import './ApplyForm.css'
import Header from './Header.jsx'
import { Container, Row, Col, Form } from 'react-bootstrap';

function ApplyForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // You can perform any further actions here
  };

  return (
    <>
    <Header/>
    <div className='container-apply-form'>
      <h1 className='title-apply-form'>Apply to: Thesis Proposal</h1>
      <h3 id="supervisor-apply-form">Supervisor: Mario Rossi</h3>
      <div className="student-information-apply-form">
        <span>Student Name: Name LastName</span>
        <span>Student Email: Email</span>
      </div>
      <div className='input-apply-form'>
        <label htmlFor="textarea-apply-form">Message to the supervisor:</label>
        <textarea id="textarea-apply-form" placeholder='Write here' className='textarea-apply-form'></textarea>
      </div>
      <button id='button-apply-form'>Submit Application</button>
    </div>
    </>
  );
}

export default ApplyForm