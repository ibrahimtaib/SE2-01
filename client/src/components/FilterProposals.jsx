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

    const [keywords, setKeywords] = useState("");

    const [groups, setGroups] = useState("");

    const [click, setClick] = useState(false);

    const [clickReset, setClickReset] = useState(false);

    const [cdsList, setCdsList] = useState([]);

    const [typeList, setTypeList] = useState([]);

    const [levelList, setLevelList] = useState([]);

    const [level, setLevel] = useState("");

    const [cds, setCds] = useState("");

    const [type, setType] = useState("");

    const [date, setDate]= useState("");

    const [selectedDate, setSelectedDate] = useState("");

    const [filter, setFilter]=useState([]);

    useEffect(() => {
        if (clickReset) {
            const init = async () => {
                try {
                    API.getAllProposals().then((a) => {
                        props.setProposalsList(a)
                        setClickReset(false);
                    })
                        .catch((err) => console.log(err));
                } catch (err) {
                    setClickReset(false);
                }
            };
            init();
        }
    }, [clickReset]);

    useEffect(() => {
        const init = async () => {
            try {
                API.getAllCds().then((a) => {
                    setCdsList(a)
                }).catch((err) => console.log(err));
                API.getAllTypes().then((a) => {
                    setTypeList(a)
                }).catch((err) => console.log(err));
                API.getAllLevels().then((a) => {
                    setLevelList(a)
                }).catch((err) => console.log(err));
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

    const handleKeywordsChange = (e) => {
        setKeywords(e.target.value);
    };

    const handleGroupsChange = (e) => {
        setGroups(e.target.value);
    };

    const handleLevelSelectedChange = (event) => {
        setLevel(event.target.value);
    };

    const handleTypeSelectedChange = (event) => {
        setType(event.target.value);
    };

    const handleCdsSelectedChange = (event) => {
        setCds(event.target.value);
    };

    const handleFilter = () => {
        event.preventDefault();
        const flt={
            title:title,
            coSupervisor:cosupervisor,
            level:level,
            type:type,
            cds:cds,
            expiration:date,
            keywords:keywords,
            groups:groups,
            supervisor:supervisor
        }
        setFilter(flt);
        setClick(true);
    };

    const handleReset = () => {
        event.preventDefault();
        setTitle("");
        setCosupervisor("");
        setSupervisor("");
        setKeywords("");
        setGroups("");
        setLevel("");
        setCds("");
        setType("");
        setDate("");
        setSelectedDate(null); // Imposta il DatePicker a vuoto
        setDate("");
        setClickReset(true);
    };

    useEffect(() => {
        if (click) {
            const init = async () => {
                try {
                    API.filterProposals(filter).then((a) => {
                        props.setProposalsList(a)
                        setClick(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setClick(false)
                    });
                } catch (err) {
                    setClick(false)
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
                    <Form.Control placeholder="Keywords separeted by ," value={keywords} onChange={handleKeywordsChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Filter by Groups</Form.Label>
                    <Form.Control placeholder="groups separeted by ," value={groups} onChange={handleGroupsChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Filter by Level</Form.Label>
                    <Form.Select value={level} onChange={handleLevelSelectedChange}>
                        <option value="" disabled>Seleziona</option>
                        {levelList.map((proposal, index) => (
                            <option key={index} value={proposal.title}>
                                {proposal.title}
                            </option>
                        ))}
                    </Form.Select>


                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Filter by CDS</Form.Label>
                    <Form.Select value={cds} onChange={handleCdsSelectedChange}>
                        <option value="" disabled>Seleziona</option>
                        {cdsList.map((proposal, index) => (
                            <option key={index} value={proposal.cod}>
                                {proposal.title}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Filter by Type</Form.Label>
                    <Form.Select value={type} onChange={handleTypeSelectedChange}>
                        <option value="" disabled>Seleziona</option>
                        {typeList.map((proposal, index) => (
                            <option key={index} value={proposal.title}>
                                {proposal.title}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Select a Expiration Date</Form.Label>
                    <MyDatePicker date={date} setDate={setDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate}></MyDatePicker>
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


const MyDatePicker = (props) => {
    const formatDate = (date) => {
        if (!date) return "";
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      };
    const handleDateChange = (date) => {
        props.setSelectedDate(date)
        props.setDate(formatDate(date))
    };
    
    return (
        <>
            <br />
            <DatePicker
                selected={props.selectedDate}
                onChange={handleDateChange}
                placeholderText="YYYY-MM-DD"
                dateFormat="yyyy-MM-dd" // Modifica il formato della data come desiderato
                className="form-control"
            />
        </>
    );
};

export default FilterProposals;