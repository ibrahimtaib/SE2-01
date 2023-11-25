import { Col, Container, Row, Button, Form, Table } from 'react-bootstrap';
import { useNavigate, useParams, Link, Navigate } from 'react-router-dom';

function DefaultRoute() {
    return(
      <Container className='App'>
        <h1>No data here...</h1>
        <h2>This is not the route you are looking for!</h2>
        <Navigate to='/'>Please go back to main page</Navigate>
      </Container>
    );
  }

export default DefaultRoute;