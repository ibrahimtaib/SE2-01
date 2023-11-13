import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProposalCard from './ProposalCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import API from '../API';
import { React, useState, useEffect, useContext } from 'react';

function FilterProposals(props) {
    return (
        <Container fluid className="m-0">
            <Row className="h-100">
                <Col sm={4} className="bg-light custom-padding"><LeftSide setProposalsList={props.setProposalsList}></LeftSide></Col>
                <Col sm={8} className=" p-3"><RightSide ProposalsList={props.ProposalsList}></RightSide></Col>
            </Row>
        </Container>
    );
}

function LeftSide(props) {
    const [title, setTitle] = useState("");

    const [cosupervisor, setCosupervisor] = useState("");

    const [supervisor, setSupervisor] = useState("");

    const [click, setClick] = useState(false);

    const [clickReset, setClickReset] = useState(false);

    const [cdsList, setCdsList] = useState([]);

    useEffect(() => {
        const init = async () => {
            try {
                API.getAllCds().then((a) => {
                    setCdsList(a)
                })
                    .catch((err) => console.log(err));
            } catch (err) {
            }
        };
        init();
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleCosupervisorChange = (e) => {
        setCosupervisor(e.target.value);
    };

    const handleSupervisorChange = (e) => {
        setSupervisor(e.target.value);
    };

    const handleFilter = () => {
        setClick(true);
    };

    const handleReset = () => {
        setClickReset(true);
    };

    useEffect(() => {
        if (click) {
            const init = async () => {
                if (title !== "") {
                    try {
                        API.getProposalsByTitle(title).then((a) => {
                            props.setProposalsList(a)
                            setClick(false)
                        })
                            .catch((err) => console.log(err));
                    } catch (err) {
                        setClick(false)
                    }
                } else if (cosupervisor !== "") {
                    try {
                        API.getProposalsByCosupervisor(cosupervisor).then((a) => {
                            props.setProposalsList(a)
                            setClick(false)
                        })
                            .catch((err) => console.log(err));
                    } catch (err) {
                        setClick(false)
                    }
                } else if(supervisor !== ""){
                    try {
                        API.getProposalsBySupervisor(supervisor).then((a) => {
                            props.setProposalsList(a)
                            setClick(false)
                        })
                            .catch((err) => console.log(err));
                    } catch (err) {
                        setClick(false)
                    }
                }
            };
            init();
        }
    }, [click]);

    return (
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Filter by Title</Form.Label>
                    <Form.Control placeholder="Title" value={title} onChange={handleTitleChange} />
                </Form.Group>
                {/*
                <Form.Group className="mb-3">
                    <Form.Label>Filter by Teacher</Form.Label>
                    <Form.Control placeholder="Teacher" />
                </Form.Group>
                */}
                <Form.Group className="mb-3">
                    <Form.Label>Filter by Supervisor</Form.Label>
                    <Form.Control placeholder="Supervisor" value={supervisor} onChange={handleSupervisorChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Filter by Co-Supervisor</Form.Label>
                    <Form.Control placeholder="Co-Supervisor" value={cosupervisor} onChange={handleCosupervisorChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Filter by Keywords</Form.Label>
                    <Form.Control placeholder="Keywords separeted by ,"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Filter by Groups</Form.Label>
                    <Form.Control placeholder="Groups"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Filter by Level</Form.Label>
                    <Form.Select defaultValue="">
                        <option value="" disabled hidden>
                            Seleziona
                        </option>
                        {
                            cdsList.map((proposal, index) => (
                                <option key={index}>{proposal.title}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Filter by CDS</Form.Label>
                    <Form.Select defaultValue="">
                        <option value="" disabled hidden>
                            Seleziona
                        </option>
                        {
                            cdsList.map((proposal, index) => (
                                <option key={index}>{proposal.title}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Filter by Type</Form.Label>
                    <Form.Select defaultValue="">
                        <option value="" disabled hidden>
                            Seleziona
                        </option>
                        {
                            cdsList.map((proposal, index) => (
                                <option key={index}>{proposal.title}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Select a Expiration Date</Form.Label>
                    <MyDatePicker></MyDatePicker>
                </Form.Group>
                <Form.Group className="mb-3 d-flex justify-content-start ">
                    <Button type="submit" variant="success" onClick={handleFilter} style={{ borderRadius: '0.25rem 0 0 0.25rem' }}>Filter</Button>
                    <Button type="reset" variant="danger" onClick={handleReset} style={{ borderRadius: '0 0.25rem 0.25rem 0' }}>Reset</Button>
                </Form.Group>
            </Form>
        </>
    );
}



function RightSide(props) {
    if (!props.ProposalsList || props.ProposalsList.length === 0) {
        return null; // O qualsiasi altra cosa vuoi restituire quando la lista è vuota
    }

    return (
        <>
            {props.ProposalsList.map((proposal, index) => (
                <ProposalCard key={index} proposal={proposal} />
            ))}
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
            <br />
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