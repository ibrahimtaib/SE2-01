/* eslint-disable react/prop-types */
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ApplicationDecisionCard from '../components/ApplicationDecisionCard';
import { useState, useEffect } from 'react';
import API from '../API';
import { Alert } from 'react-bootstrap';

function StudentApplicationsPage({ user }) {
    const [applicationList, setApplicationList] = useState([]);
    useEffect(() => {
        const init = async () => {
            try {
                const applications1 = await API.getApplicationsByStudentId(user.id);
                console.log(applications1);
        
                setApplicationList([...applications1]);
            } catch (err) {
                console.log(err);
            }
            try {
                const applications2 = await API.getRequestedThesisByStudentId(user.id);
                console.log(applications2);
        
                // Se applications2 è definito, concatena i dati all'array esistente
                if (applications2) {
                    setApplicationList((prevApplications) => [...prevApplications, ...applications2]);
                }
            } catch (err) {
                console.log(err);
            }
        };
        init();
    }, []);
    return (
        <Container fluid className="m-0">
            <Row >
                <Col sm={12} className=" p-3"> <Body user={user} applicationList={applicationList}></Body></Col>
            </Row>
        </Container>
    )
}

function Body(props) {
    if (!props.applicationList || props.applicationList.length === 0) {
        return <Alert variant="info" style={{ width: "100%" }}>
            There are no applications available at this moment.
        </Alert>; // O qualsiasi altra cosa vuoi restituire quando la lista è vuota
    }
    return (
        <>
            {props.applicationList.map((application, index) => (
                <ApplicationDecisionCard user={props.user} key={index} application={application} />
            ))}
        </>
    );
}

export default StudentApplicationsPage