import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import API from '../API';
import { useNavigate } from 'react-router-dom';


const InsertStudentRequestForm = ({user}) => {
    const navigateTo = useNavigate();

    const location = useLocation();
    
    const proposal = location.state ? location.state.proposal : null;
    const application_id = location.state ? location.state.application_id : null;


    const [teachers, setTeachers] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [types, setTypes] = useState([{ title: "experimental" }, { title: "compilation" }]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const init = async () => {
            API.getTeachers().then((a) => {
                setTeachers(a);
            }).catch((err) => console.log(err));
        };
        init();
    }, [user]);



    const mockdata={
        title:'Domain expert-inspired segmentation deep learning algorithms on medical images',
        description: 'The thesis aims to develop a novel framework for image segmentation of cysts on kidney tubules images that can incorporate domain-knowledge insights and mimic human annotator behavior to make more valuable predictions. This algorithm will then be evaluated on a real medical dataset confidentially shared by Istituto Mario Negri of Bergamo and compared with state-of-the-art solutions. Further developments will cover the generalizability of the developed approaches on related tasks, following the context of theory-guided data science.',
        notes: 'I believe it is a thesis in line with my university studies and I would like to delve deeper into the topic.',
    }
    const [formData, setFormData] = useState({
        studentId: user.id ,
        title: proposal ? proposal.title : mockdata.title,
        description: proposal ? proposal.description : mockdata.description,
        teacher: proposal ? proposal.teacher.id : '',
        type: proposal ? proposal.type : '',
        notes: proposal ? proposal.notes:  mockdata.notes,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage("");
        setShowAlert(false);
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleReset = () => {
        setFormData({
            studentId: user.id,
            title: '',
            description: '',
            teacher: '',
            type: '',
            notes: '',
        });
        setSubmitted(false);
    };

    const handleSubmit = async() => {
        // Check if title, description, teacher, and type are empty
        const requiredFields = ['title', 'description', 'teacher', 'type'];
        const missingFields = requiredFields.filter(field => formData[field] === '');

        if (missingFields.length > 0) {
            setErrorMessage(`Please fill in the following fields: ${missingFields.join(', ')}.`);
            setShowAlert(false);
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
                setErrorMessage("");
            }
            setSubmitted(true);
            handleReset();

            await new Promise(resolve => setTimeout(resolve, 2000));
        
            navigateTo('/student/applications');
        } catch (error) {
            console.error(error);
            setShowAlert(false);
            setSubmitted(true);
            setErrorMessage("error while sending the request");
        }
    };

    const handleModify = async() => {
        // Check if title, description, teacher, and type are empty
        const requiredFields = ['title', 'description', 'teacher', 'type'];
        const missingFields = requiredFields.filter(field => formData[field] === '');

        if (missingFields.length > 0) {
            setErrorMessage(`Please fill in the following fields: ${missingFields.join(', ')}.`);
            setShowAlert(false);
            setSubmitted(true);
            return;
        }

        try {
            // const my_id = application_id ? application_id : proposal.id;
            // const data = await API.updateThesisRequest(my_id, formData);

            const data = await API.submitNewThesisRequest(formData);

            if (data) {
                setShowAlert(true);
                setErrorMessage("");
            }
            setSubmitted(true);
            handleReset();

            await new Promise(resolve => setTimeout(resolve, 2000));
        
            navigateTo('/student/applications');
        } catch (error) {
            console.error(error);
            setShowAlert(false);
            setSubmitted(true);
            setErrorMessage("error while sending the request");
        }
    }

    const isFieldEmpty = (fieldName) => submitted && formData[fieldName] === '';

    return (
        <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', padding: '20px' }}>
            <Container className="p-4" style={{ borderRadius: '8px' }}>
                <Row className="justify-content-center">
                    <Col xs={12} md={8}>
                        <Form>
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
                                            {teacher.name+" "+teacher.surname}
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
                                <Alert variant="success" style={{ marginTop: '10px', width: "100%" }} onClose={() => setShowAlert(false)} dismissible>
                                    Request made successfully
                                </Alert>
                            )}
                            {
                                proposal ? 
                                    <><Button variant="primary"  style={{ marginTop: '10px' }} onClick={() => handleModify() }>
                                        Modify
                                    </Button></> : 
                                    <><Button variant="primary" style={{ marginTop: '10px' }} onClick={() => handleSubmit()}>
                                        Submit
                                    </Button></>
                            }
                            

                            <Button variant="danger" onClick={() => handleReset()} style={{ marginTop: '10px', marginLeft: '10px' }}>
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
