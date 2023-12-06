import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import API from '../API';

const InsertStudentRequestForm = (props) => {
    const [formData, setFormData] = useState({
        studentId: props.user.id,
        title: '',
        description: '',
        teacher: '',
        type: '',
        notes: '',
    });
    const [teachers, setTeachers] = useState([]);
    const [types, setTypes] = useState([{ title: "sperimentale" }, { title: "compilativa" }]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const init = async () => {
            API.getTeachers().then((a) => {
                setTeachers(a);
            }).catch((err) => console.log(err));
        };
        init();
    }, [props.user]);

    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

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
        setSubmitted(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if title, description, teacher, and type are empty
        const requiredFields = ['title', 'description', 'teacher', 'type'];
        const missingFields = requiredFields.filter(field => formData[field] === '');

        if (missingFields.length > 0) {
            setErrorMessage(`Please fill in the following fields: ${missingFields.join(', ')}.`);
            setSubmitted(true);
            return;
        }

        // Inserisci qui la logica per gestire l'invio del modulo
        try {
            const data = await API.submitNewThesisRequest(formData);

            // Check if the request was successful
            if (data) {
                // Show success alert
                setShowAlert(true);
            }

            setSubmitted(true);
        } catch (error) {
            console.error(error);
            setSubmitted(true);
        }

    };

    const isFieldEmpty = (fieldName) => submitted && formData[fieldName] === '';

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
                                    className={isFieldEmpty('title') ? 'is-invalid' : ''}
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
                                    className={isFieldEmpty('description') ? 'is-invalid' : ''}
                                />
                            </Form.Group>

                            <Form.Group controlId="teacher">
                                <Form.Label>Teacher</Form.Label>
                                <Form.Select
                                    name="teacher"
                                    value={formData.teacher}
                                    onChange={handleInputChange}
                                    className={isFieldEmpty('teacher') ? 'is-invalid' : ''}
                                >
                                    <option value="" disabled>Select a Teacher</option>
                                    {teachers.map((teacher, index) => (
                                        <option key={index} value={teacher.id}>
                                            {teacher.name + " " + teacher.surname}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="type">
                                <Form.Label>Type</Form.Label>
                                <Form.Select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className={isFieldEmpty('type') ? 'is-invalid' : ''}
                                >
                                    <option value="" disabled>Select a Type</option>
                                    {types.map((type, index) => (
                                        <option key={index} value={type.title}>
                                            {type.title}
                                        </option>
                                    ))}
                                </Form.Select>
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
                            {errorMessage && (
                                <Alert variant="danger" style={{ marginTop: '10px', width: "100%" }} dismissible onClose={() => setErrorMessage('')}>
                                    {errorMessage}
                                </Alert>
                            )}
                            {showAlert && (
                                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                                    Request made successfully
                                </Alert>
                            )}
                            <Button variant="primary" type="submit" style={{ marginTop: '10px' }} onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button variant="danger" onClick={handleReset} style={{ marginTop: '10px', marginLeft: '10px' }}>
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
