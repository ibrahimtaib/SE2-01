/* eslint-disable react/prop-types */
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ApplicationDecisionCard from '../components/ApplicationDecisionCard';
import { useState,useEffect } from 'react';
import API from '../API';

function StudentApplicationsPage({user }) {
    const[applicationList, setApplicationList]=useState([]);

    useEffect(() => {
        const init = async () => {
            try {
                API.getApplicationsByStudentId(1).then((a) => {
                    setApplicationList(a)
                })
                    .catch((err) => console.log(err));
            } catch (err) {
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
        return null; // O qualsiasi altra cosa vuoi restituire quando la lista è vuota
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