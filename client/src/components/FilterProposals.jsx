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

function LeftSide() {
    return (
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Insert Title</Form.Label>
                    <Form.Control placeholder="Title" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Insert Teacher</Form.Label>
                    <Form.Control placeholder="Teacher" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Insert Supervisor</Form.Label>
                    <Form.Control placeholder="Supervisor" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Insert Co-Supervisor</Form.Label>
                    <Form.Control placeholder="Co-Supervisor" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Insert Level</Form.Label>
                    <Form.Select>
                        <option>Disabled select</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Insert CDS</Form.Label>
                    <Form.Select>
                        <option>Disabled select</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Select a Expiration Date</Form.Label>
                    <MyDatePicker></MyDatePicker>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </>
    );
}

function RightSide() {
    return (
        <>
            <ProposalCard></ProposalCard>
            <ProposalCard></ProposalCard>
            <ProposalCard></ProposalCard>
            <ProposalCard></ProposalCard>
        </>
    );
}

const MyDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        setSelectedDate(dayjs().toDate());
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <br/>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy" // Modifica il formato della data come desiderato
                className="form-control"
            />
        </>
    );
};

export default FilterProposals;