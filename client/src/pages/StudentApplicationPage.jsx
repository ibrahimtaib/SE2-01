/* eslint-disable react/prop-types */
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import API from '../API';
import ApplicationDecisionCard from '../components/ApplicationDecisionCard';

function StudentApplicationsPage({ user }) {
    const [applicationList, setApplicationList] = useState([]);
    useEffect(() => {
        const init = async () => {
            try {
                const applications = await API.getApplicationsByStudentId(user.id);
                const thesisRequests = await API.getRequestedThesisByStudentId(user.id);
                setApplicationList([...applications, ...thesisRequests]);
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