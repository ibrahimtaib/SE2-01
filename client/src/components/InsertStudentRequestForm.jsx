import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const InsertStudentRequestForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teacher: '',
    type: '',
    notes: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      teacher: '',
      type: '',
      notes: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Inserisci qui la logica per gestire l'invio del modulo
    console.log('Dati inviati:', formData);
  };

  return (
    <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', padding: '20px' }}>
      <Container className="p-4" style={{ borderRadius: '8px' }}>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Label as="h2" className="mb-4">
                Insert a Thesis Request
              </Form.Label>

              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="teacher">
                <Form.Label>Teacher</Form.Label>
                <Form.Control
                  as="select"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Select a Teacher</option>
                  <option value="professor1">Professor 1</option>
                  <option value="professor2">Professor 2</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="type">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Select a Type</option>
                  <option value="compilative">Compilative</option>
                  <option value="experimental">Experimental</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="notes">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mr-2">
                Submit
              </Button>
              <Button variant="secondary" onClick={handleReset}>
                Reset
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InsertStudentRequestForm;
