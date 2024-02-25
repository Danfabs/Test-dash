import { Badge, Card, Dropdown, Table } from 'react-bootstrap';
import { EndUsersDetail } from './types';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { usePageTitle } from '../../../hooks';
import { EndUsersDetails } from './data';

type ProjectsProps = {
    projectDetails: EndUsersDetail[];
};


const TroubleTickets = ({ projectDetails }: ProjectsProps) => {
    useEffect(() => {
        console.log('projectDetails:', projectDetails);
    }, [projectDetails]);


    const navigate = useNavigate();

    const handleRowClick = (ticketId: number) => {
        navigate('/apps/chat');
    };

    return (
        <Card>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Anothther Action</Dropdown.Item>
                        <Dropdown.Item>Something Else</Dropdown.Item>
                        <Dropdown.Item>Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title mt-0 mb-3">Trouble Tickets</h4>

                <Table responsive hover className="mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>startDate</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Assign</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectDetails.map((ticket) => (
                            <tr key={ticket.id} onClick={() => handleRowClick(ticket.id)}>
                                <td>{ticket.id}</td>
                                <td>{ticket.name}</td>
                                <td>{ticket.startDate}</td>
                                <td>{ticket.dueDate}</td>
                                <td>
                                    <Badge
                                        bg={
                                            ticket.status === 'Open'
                                                ? 'success'
                                                : ticket.status === 'Close'
                                                    ? 'danger'
                                                    : ticket.status === 'Re-Open'
                                                        ? 'primary'
                                                        : 'secondary' // Provide a default color or adjust as needed
                                        }
                                    >
                                        {ticket.status}
                                    </Badge>
                                </td>
                                <td>{ticket.clients}</td>
                            </tr>
                        ))}
                    </tbody>
                    {/* <tbody>
                        <tr>
                            <td>
                                id
                            </td>
                            <td>
                                name
                            </td>
                            <td>
                                startDate
                            </td>
                            <td>
                                dueDate
                            </td>
                            <td>
                                <Badge
                                    bg="success"
                                >
                                    Open

                                </Badge>
                            </td>
                            <td>
                                clients
                            </td>
                        </tr>

                        <tr>
                            <td>
                                id 2
                            </td>
                            <td>
                                name 2
                            </td>
                            <td>
                                startDate 2
                            </td>
                            <td>
                                dueDate 2
                            </td>
                            <td>
                                <Badge
                                    bg='danger'
                                >
                                    Close

                                </Badge>
                            </td>
                            <td>
                                clients
                            </td>
                        </tr>

                        <tr>
                            <td>
                                id 3
                            </td>
                            <td>
                                name 3
                            </td>
                            <td>
                                startDate 3
                            </td>
                            <td>
                                dueDate 3
                            </td>
                            <td>
                                <Badge
                                    bg='primary'
                                >
                                    Re-Open

                                </Badge>
                            </td>
                            <td>
                                clients
                            </td>
                        </tr>
                    </tbody> */}
                </Table>
            </Card.Body>
        </Card>
    );
};

const Tickets = () => {
    // set pagetitle
    usePageTitle({
        title: 'Projects',
        breadCrumbItems: [
            {
                path: 'apps/projects',
                label: 'Apps',
            },
            {
                path: 'apps/projects',
                label: 'Projects',
                active: true,
            },
        ],
    });

    return (
        <>
            <TroubleTickets projectDetails={EndUsersDetails} />
        </>
    );
};

export default Tickets;
