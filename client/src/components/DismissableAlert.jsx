/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';

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
