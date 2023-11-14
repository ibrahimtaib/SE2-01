/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function DismissableAlert({showAlert, setShowAlert, heading, message}) {

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <Alert variant="warning" className='alert' onClose={handleClose} dismissible>
          <Alert.Heading>{heading}</Alert.Heading>
          <p>
            {message}
          </p>
        </Alert>
      )}
    </>
  );
}

export default DismissableAlert;
