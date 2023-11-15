/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API from '../API';
import ProposalCard from './ProposalCard';

function FilterProposals(props) {
    console.log("FilterProposals", props.ProposalsList)
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
            API.getAllCds().then((a) => {
                setCdsList(a)
            }).catch((err) => console.log(err));

            API.getAllProposals().then((a) => {
                props.setProposalsList(a)
                setClickReset(false);
            })
                .catch((err) => console.log(err));

            API.getAllTypes().then((a) => {
                setTypeList(a)
            }).catch((err) => console.log(err));
            
            API.getAllLevels().then((a) => {
                setLevelList(a)
            }).catch((err) => console.log(err));
            
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
        const flt=[
            {type: 'title', value: title},
            {type: 'supervisor', value: supervisor},
            {type: 'cosupervisor', value: cosupervisor},
            {type: 'keywords', value: keywords},
            {type: 'groups', value: groups},
            {type: 'expirationDate', value: date},
            {type: 'level', value: level},
            {type: 'type', value: type},
            {type: 'cds', value: cds},
        ]
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
                } else if (supervisor !== "") {
                    try {
                        API.getProposalsBySupervisor(supervisor).then((a) => {
                            props.setProposalsList(a)
                            setClick(false)
                        })
                            .catch((err) => console.log(err));
                    } catch (err) {
                        setClick(false)
                    }
                } else if (keywords !== "") {
                    try {
                        API.getProposalsByKeywords(keywords).then((a) => {
                            props.setProposalsList(a)
                            setClick(false)
                        })
                            .catch((err) => console.log(err));
                    } catch (err) {
                        setClick(false)
                    }
                } else if (groups !== "") {
                    try {
                        API.getProposalsByGroups(groups).then((a) => {
                            props.setProposalsList(a)
                            setClick(false)
                        })
                            .catch((err) => console.log(err));
                    } catch (err) {
                        setClick(false)
                    }
                } else if (level !== "") {
                    try {
                        API.getProposalsByLevel(level).then((a) => {
                            props.setProposalsList(a)
                            setClick(false)
                        })
                            .catch((err) => console.log(err));
                    } catch (err) {
                        setClick(false)
                    }
                }else if (cds !== "") {
                    try {
                        API.getProposalsByCds(cds).then((a) => {
                            props.setProposalsList(a)
                            setClick(false)
                        })
                            .catch((err) => console.log(err));
                    } catch (err) {
                        setClick(false)
                    }
                }else if (type !== "") {
                    try {
                        API.getProposalsByType(type).then((a) => {
                            props.setProposalsList(a)
                            setClick(false)
                        })
                            .catch((err) => console.log(err));
                    } catch (err) {
                        setClick(false)
                    }
                }else if (date !== "") {
                    try {
                        API.getProposalsByExpirationDate(date).then((a) => {
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