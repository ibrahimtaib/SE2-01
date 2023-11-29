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

    const allFilters = { title: true, supervisor: true, cosupervisor: true, cds: true, keywords: true, groups: true, level: true, type: true, date: true, };

    let disabledFilters = {};
    let visibleFilters = {};
    
    if (props.user.role === "teacher") {
        disabledFilters = { ...disabledFilters, supervisor: false }
    }
    if (props.user.role === "student") {
        disabledFilters = { ...disabledFilters, cds: false }
    }

    visibleFilters = { ...allFilters, ...disabledFilters };


    console.log("FilterProposals", props.ProposalsList)
    return (
        <Container fluid className="m-0">
            <Row className="h-100">
                <Col sm={4} className="bg-light custom-padding"><LeftSide setProposalsList={props.setProposalsList} visibleFilters={visibleFilters} userRole={props.user.role}></LeftSide></Col>
                <Col sm={8} className=" p-3"><RightSide user={props.user} ProposalsList={props.ProposalsList}></RightSide></Col>
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

    const [date, setDate] = useState("");

    const [selectedDate, setSelectedDate] = useState("");

    const [filter, setFilter] = useState([]);

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
        const flt = {
            title: title,
            coSupervisor: cosupervisor,
            level: level,
            type: type,
            cds: cds,
            expiration: date,
            keywords: keywords,
            groups: groups,
            supervisor: supervisor
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

                {props.visibleFilters.title && (
                    <Form.Group className="mb-3">
                        <Form.Label>Filter by Title</Form.Label>
                        <Form.Control name="title" placeholder="Title" value={title} onChange={handleTitleChange} />
                    </Form.Group>
                )}

                <Row>
                    <Col md={6}>
                        {props.visibleFilters.supervisor && (
                            <Form.Group className="mb-3">
                                <Form.Label>Filter by Supervisor</Form.Label>
                                <Form.Control name="supervisor" placeholder="Supervisor" value={supervisor} onChange={handleSupervisorChange} />
                            </Form.Group>
                        )}
                    </Col>
                    <Col md={props.userRole === 'teacher' ? 12 : 6}>
                        {props.visibleFilters.cosupervisor && (
                            <Form.Group className="mb-3">
                                <Form.Label>Filter by Co-Supervisor</Form.Label>
                                <Form.Control
                                    name="cosupervisor"
                                    placeholder="Co-Supervisor"
                                    value={cosupervisor}
                                    onChange={handleCosupervisorChange}
                                    className={props.userRole === 'teacher' ? 'w-100' : 'form-control-sm'}
                                />
                            </Form.Group>
                        )}
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        {props.visibleFilters.keywords && (
                            <Form.Group className="mb-3">
                                <Form.Label>Filter by Keywords</Form.Label>
                                <Form.Control name="keywords" placeholder="Keywords Separated By ," value={keywords} onChange={handleKeywordsChange} />
                            </Form.Group>
                        )}
                    </Col>
                    <Col md={6}>
                        {props.visibleFilters.groups && (
                            <Form.Group className="mb-3">
                                <Form.Label>Filter by Groups</Form.Label>
                                <Form.Control name="groups" placeholder="Groups Separated By ," value={groups} onChange={handleGroupsChange} />
                            </Form.Group>
                        )}
                    </Col>
                </Row>
                {/*
                {props.visibleFilters.supervisor && (
                    <Form.Group className="mb-3">
                        <Form.Label>Filter by Supervisor</Form.Label>
                        <Form.Control name="supervisor" placeholder="Supervisor" value={supervisor} onChange={handleSupervisorChange} />
                    </Form.Group>
                )}

                {props.visibleFilters.cosupervisor && (
                    <Form.Group className="mb-3">
                        <Form.Label>Filter by Co-Supervisor</Form.Label>
                        <Form.Control name="cosupervisor" placeholder="Co-Supervisor" value={cosupervisor} onChange={handleCosupervisorChange} />
                    </Form.Group>
                )}

                {props.visibleFilters.keywords && (
                    <Form.Group className="mb-3">
                        <Form.Label>Filter by Keywords</Form.Label>
                        <Form.Control name="keywords" placeholder="Keywords Separated By ," value={keywords} onChange={handleKeywordsChange} />
                    </Form.Group>
                )}

                {props.visibleFilters.groups && (
                    <Form.Group className="mb-3">
                        <Form.Label>Filter by Groups</Form.Label>
                        <Form.Control name="groups" placeholder="Groups Separated By ," value={groups} onChange={handleGroupsChange} />
                    </Form.Group>
                )}

                {props.visibleFilters.level && (
                    <Form.Group className="mb-3">
                        <Form.Label>Filter by Level</Form.Label>
                        <Form.Select name="level" value={level} onChange={handleLevelSelectedChange}>
                            <option value="" disabled>Select</option>
                            {levelList.map((proposal, index) => (
                                <option key={index} value={proposal.title}>
                                    {proposal.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                            )}*/}

                <Row>
                    <Col md={6}>
                        {/* Filter by Level */}
                        {props.visibleFilters.level && (
                            <Form.Group className="mb-3">
                                <Form.Label>Filter by Level</Form.Label>
                                <Form.Select name="level" value={level} onChange={handleLevelSelectedChange}>
                                    <option value="" disabled>Select</option>
                                    {levelList.map((proposal, index) => (
                                        <option key={index} value={proposal.title}>
                                            {proposal.title}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        )}
                    </Col>
                    <Col md={6}>
                        {/* Filter by Type */}
                        {props.visibleFilters.type && (
                            <Form.Group className="mb-3">
                                <Form.Label>Filter by Type</Form.Label>
                                <Form.Select name="type" value={type} onChange={handleTypeSelectedChange}>
                                    <option value="" disabled>Select</option>
                                    {typeList.map((proposal, index) => (
                                        <option key={index} value={proposal.title}>
                                            {proposal.title}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        )}
                    </Col>
                </Row>

                {props.visibleFilters.cds && (
                    <Form.Group className="mb-3">
                        <Form.Label>Filter by CDS</Form.Label>
                        <Form.Select name="cds" value={cds} onChange={handleCdsSelectedChange}>
                            <option value="" disabled>Select</option>
                            {cdsList.map((proposal, index) => (
                                <option key={index} value={proposal.cod}>
                                    {proposal.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                )}

                {/*

                {props.visibleFilters.type && (
                    <Form.Group className="mb-3">
                        <Form.Label>Filter by Type</Form.Label>
                        <Form.Select name="type" value={type} onChange={handleTypeSelectedChange}>
                            <option value="" disabled>Select</option>
                            {typeList.map((proposal, index) => (
                                <option key={index} value={proposal.title}>
                                    {proposal.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                            )}*/}

                {props.visibleFilters.date && (
                    <Form.Group className="mb-3">
                        <Form.Label>Select an Expiration Date</Form.Label>
                        <MyDatePicker date={date} setDate={setDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    </Form.Group>
                )}

                <Form.Group className="mb-3 d-flex justify-content-start">
                    <Button type="submit" variant="success" onClick={handleFilter} style={{ borderRadius: '0.25rem 0 0 0.25rem' }}>Filter</Button>
                    <Button type="reset" variant="danger" onClick={handleReset} style={{ borderRadius: '0 0.25rem 0.25rem 0' }}>Reset</Button>
                </Form.Group>
            </Form>

        </>
    );
}



function RightSide(props) {
    if (!props.ProposalsList || props.ProposalsList.length === 0) {
        return null;
    }
    return (
        <>
            {props.ProposalsList.map((proposal, index) => (
                <ProposalCard user={props.user} key={index} proposal={proposal} />
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