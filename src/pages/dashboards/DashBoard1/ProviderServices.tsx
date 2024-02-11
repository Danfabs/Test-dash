import { Badge, Card, Dropdown, Table } from 'react-bootstrap';

// type
import { ServicesDetail } from './types';

type ProviderServicesDetailsProps = {
    ProviderServicesDetails: ServicesDetail[];
};

const ProviderServices = ({ ProviderServicesDetails }: ProviderServicesDetailsProps) => {
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

                New Admin Design              <h4 className="header-title mt-0 mb-3">Latest Projects</h4>

                <Table responsive hover className="mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Project Name</th>
                            <th>Start Date</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Assign</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(ProviderServicesDetails || []).map((ServicesDetail, index) => {
                            return (
                                <tr key={index.toString()}>
                                    <td>{ServicesDetail.id}</td>
                                    <td>{ServicesDetail.name}</td>
                                    <td>{ServicesDetail.startDate}</td>
                                    <td>{ServicesDetail.dueDate}</td>
                                    <td>
                                        <Badge bg={ServicesDetail.variant}>{ServicesDetail.status}</Badge>
                                    </td>
                                    <td>{ServicesDetail.clients}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default ProviderServices;
