/* eslint-disable react/prop-types */
import dayjs from 'dayjs';
import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ApplicationDecisionCard(props) {


    return (
        <>
        {props.application.proposal?<ProposalDecisionCard application={props.application}></ProposalDecisionCard>:""}
        {props.application.requestedThesis?<RequestThesisCard application={props.application}></RequestThesisCard>:""}
        </>
    );
}

function ProposalDecisionCard(props) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    return (
        <Card className="text-left m-3">
            <Card.Header> {"Prof " + props.application.proposal.teacher.surname}</Card.Header>
            <Card.Body>
                <Card.Title>{props.application.proposal.title}</Card.Title>
                <Card.Text>
                    {props.application.proposal.description}
                </Card.Text>
                <Card.Text className={isVisible ? '' : 'nascondi'}>
                    <br /><b>Level</b>: {props.application.proposal.level}
                    {props.application.proposal.groups.map((group, index) => (
                        <span key={index}><br /><b>Group {index + 1}</b>: {group}</span>
                    ))}
                    {props.application.proposal.type?(<><br /><b>Type</b>: {props.application.proposal.type}</>):""}
                    {props.application.proposal.degree.TITLE_DEGREE?(<><br /><b>Cds</b>: {props.application.proposal.degree.TITLE_DEGREE}</>):""}
                    {props.application.proposal.requiredKnowledge?(<><br /><b>Required Knowledge</b>: {props.application.proposal.requiredKnowledge}</>):""}
                    {props.application.comment?(<><br /><b>Your comment</b>: {props.application.comment}</>):""}
                </Card.Text>
                <div className="d-flex justify-content-between">
                    <Button variant="outline-secondary" onClick={toggleVisibility}>
                        {isVisible ? 'Hide Details' : 'Show Details'}
                    </Button>
                    {props.application.status === "pending" ?
                        <Button variant="outline-secondary" disabled>
                            Status <br /><Badge bg="secondary">{props.application.status}</Badge>
                            <span className="visually-hidden">unread messages</span>
                        </Button> : props.application.status === "accept" ?
                            <Button variant="outline-success" disabled>
                                Status <br /><Badge bg="success">{props.application.status}</Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Button> : <Button variant="outline-danger" disabled>
                                Status <br /><Badge bg="danger">{props.application.status}</Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Button>}

                </div>
            </Card.Body>
            <Card.Footer className="text-muted"> {"Application date: " + dayjs(props.application.date).format('DD/MM/YYYY')}</Card.Footer>
        </Card>
    );
}

function RequestThesisCard(props) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    return (
        <Card className="text-left m-3">
            <Card.Header> {"Prof " + props.application.teacher.surname}</Card.Header>
            <Card.Body>
                <Card.Title>{props.application.title}</Card.Title>
                <Card.Text>
                    {props.application.description}
                </Card.Text>
                <Card.Text className={isVisible ? '' : 'nascondi'}>
                {props.application.type?(<><br /><b>Type</b>: {props.application.type}</>):""}
                {props.application.notes?(<><br /><b>Notes</b>: {props.application.notes}</>):""}
                </Card.Text>
                <div className="d-flex justify-content-between">
                    <Button variant="outline-secondary" onClick={toggleVisibility}>
                        {isVisible ? 'Hide Details' : 'Show Details'}
                    </Button>
                    {props.application.status === "pending" ?
                        <Button variant="outline-secondary" disabled>
                            Status <br /><Badge bg="secondary">{props.application.status}</Badge>
                            <span className="visually-hidden">unread messages</span>
                        </Button> : props.application.status === "accept" ?
                            <Button variant="outline-success" disabled>
                                Status <br /><Badge bg="success">{props.application.status}</Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Button> : <Button variant="outline-danger" disabled>
                                Status <br /><Badge bg="danger">{props.application.status}</Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Button>}

                </div>
            </Card.Body>
            <Card.Footer className="text-muted"> {"Application date: " + dayjs(props.application.date).format('DD/MM/YYYY')}</Card.Footer>
        </Card>
    );
}

export default ApplicationDecisionCard