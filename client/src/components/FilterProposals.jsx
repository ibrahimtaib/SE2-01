import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProposalCard from './ProposalCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { React, useState, useEffect, useContext } from 'react';

function FilterProposals() {
    return (
        <Container fluid className="m-0">
            <Row className="h-100">
                <Col sm={4} className="bg-light custom-padding"><LeftSide></LeftSide></Col>
                <Col sm={8} className=" p-3"><RightSide></RightSide></Col>
            </Row>
        </Container>
    );
}

export default FilterProposals;