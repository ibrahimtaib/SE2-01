/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import Alert from 'react-bootstrap/Alert';
const mockUser = {
  id: 1,
  name: 'Mario Rossi',
  email: 's319095@studenti.polito.it',
  role: 'student',
};

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('s123456@studenti.polito.it');
  const [password, setPassword] = useState('1');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [waiting, setWaiting] = useState(false);

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  var teacher = 0;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const navTo = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (email === "s123456@polito.it") {
      mockUser.role = 'teacher';
      mockUser.name = 'Mario Professore'
      setUser(mockUser);
      setShowAlert(false);
      navTo("/");
    }
    else if (email === "s123456@studenti.polito.it") {
      setUser(mockUser);
      setShowAlert(false);
      navTo("/");
    }
    else {
      setErrorMessage('An error occurred while trying to login.')
    }

  };


  return (
    <>
     <Container fluid style={{ display: 'flex', justifyContent: 'center', height: '100vh', marginTop : '2rem'}}>
        <Row className>
        <Col style={{"maxWidth": "1rem", "minWidth": "30rem"}}>
        <Card>
          <Container style={{"marginTop": "0.5rem", "padding": "1rem"}}>
          <h1 style={{textAlign : "center" , marginBottom :"1rem"}}>Thesis Management</h1>
            <Form noValidate onSubmit={handleLogin}>
            {errorMessage ? <Alert variant='warning' style={{width : "100%"}} dismissible onClick={()=>setErrorMessage('')}>{errorMessage}</Alert> : ''}
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>E-Mail</Form.Label>
                  <Form.Control isInvalid={!emailValid}
                                type="email"
                                placeholder=""
                                value={email}
                                autoFocus
                                onChange={event => {setEmail(event.target.value); setEmailValid(true);}}/>
                  <Form.Control.Feedback type="invalid">
                    Field is required!
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control isInvalid={!passwordValid}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={event => {setPassword(event.target.value); setPasswordValid(true);}}/>
                  <Form.Control.Feedback type="invalid">
                    Field is required!
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              {
                waiting ? 
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" variant="secondary"/>
                  {" "}
                </>
                
                : <div style={{ display: "flex" , justifyContent : "center"}}><Button style={{ backgroundColor : "#003576", display :"flex", justifyContent : "flex-end" , alignContent: "flex-end"} }type="submit" variant="secondary" disabled={waiting}>Login</Button></div>
              }
            </Form>
          </Container>
        </Card>
        </Col>
        <Col md="3"/>
        </Row>
        </Container>

    </>

  );
};

export default LoginPage;