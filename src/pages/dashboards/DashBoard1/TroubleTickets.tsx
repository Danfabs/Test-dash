import { Badge, Card, Dropdown, Table } from 'react-bootstrap';
import { ServicesDetail } from './types';


type ProjectsProps = {
    projectDetails: ServicesDetail[];
};


const TroubleTickets = ({ projectDetails }: ProjectsProps) => {
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
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Assign</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {(projectDetails || []).map((projectDetail, index) => {
                        return (
                            <tr key={index.toString()}> */}

                            <tr>
                                <td>
                                    {/* {projectDetail.id} */}
                                    id
                                    </td>
                                <td>
                                    {/* {projectDetail.name} */}
                                    name
                                    </td>
                                <td>
                                    {/* {projectDetail.startDate} */}
                                    startDate
                                    </td>
                                <td>
                                    {/* {projectDetail.dueDate} */}
                                    dueDate
                                    </td>
                                <td>
                                    <Badge
                                    bg="success"
                                    // style={{ backgroundColor: 'green' }}
                                    //  bg={projectDetail.variant}
                                     >
                                        {/* {projectDetail.status} */}
                                        Open
                                     
                                     </Badge>
                                </td>
                                <td>
                                    {/* {projectDetail.clients} */}
                                    clients
                                    </td>
                            </tr>

                            <tr>
                                <td>
                                    {/* {projectDetail.id} */}
                                    id 2
                                    </td>
                                <td>
                                    {/* {projectDetail.name} */}
                                    name 2
                                    </td>
                                <td>
                                    {/* {projectDetail.startDate} */}
                                    startDate 2
                                    </td>
                                <td>
                                    {/* {projectDetail.dueDate} */}
                                    dueDate 2
                                    </td>
                                <td>
                                    <Badge
                                    bg='danger'
                                     >
                                        {/* {projectDetail.status} */}
                                        Close
                                     
                                     </Badge>
                                </td>
                                <td>
                                    {/* {projectDetail.clients} */}
                                    clients
                                    </td>
                            </tr>

                            <tr>
                                <td>
                                    {/* {projectDetail.id} */}
                                    id 3
                                    </td>
                                <td>
                                    {/* {projectDetail.name} */}
                                    name 3
                                    </td>
                                <td>
                                    {/* {projectDetail.startDate} */}
                                    startDate 3
                                    </td>
                                <td>
                                    {/* {projectDetail.dueDate} */}
                                    dueDate 3
                                    </td>
                                <td>
                                    <Badge
                                    bg='primary'
                                     >
                                        {/* {projectDetail.status} */}
                                        Re-Open
                                     
                                     </Badge>
                                </td>
                                <td>
                                    {/* {projectDetail.clients} */}
                                    clients
                                    </td>
                            </tr>
                        {/* );
                    })} */}
                </tbody>
            </Table>
        </Card.Body>
    </Card>
    );
};

export default TroubleTickets;
