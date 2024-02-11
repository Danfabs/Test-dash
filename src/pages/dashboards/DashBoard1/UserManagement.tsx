import { Badge, Card, Dropdown, Row, Table, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../../../hooks';
import classNames from 'classnames';
// type
import { UsersList } from '../../apps/UserManagement/usersTypes';
//image
import cardImg from '../../../assets/images/gallery/1.jpg';
//Buttons
import Button from 'react-bootstrap/Button';

import { usersManagmentDetails } from '../../apps/UserManagement/usersdata';

type UsersDetailsProps = {
    usersDetails: UsersList[];
};

const UserManagement = ({ usersDetails }: UsersDetailsProps) => {
    return (
        <div>
            <h4 className="mt-0">Users Managment</h4>
            <Row>
                {(usersDetails || []).map((user, index) => {
                    return (
                        <Col xl={4} key={index.toString()}>
                            <Card>
                                <Card.Img src={cardImg} />
                                <Card.Body className="project-box">
                                    <h4 className="mt-0">
                                        <Link to="#" className="text-dark">
                                            Vendor Name
                                        </Link>
                                    </h4>

                                    <Link to="../ViewBranch">
                                        Brand Name
                                    </Link>
                                    <ul className="list-inline">

                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Phone Number</h5>
                                            <p className="mb-0">+9689999999</p>
                                        </li>

                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Owner ID</h5>
                                            <p className="mb-0">111</p>
                                        </li>

                                        <li className="list-inline-item me-4">

                                            <h5 className="mb-2 fw-semibold">Owner Email</h5>
                                            <p className="mb-0">aaa@gmail.com</p>
                                        </li>

                                    </ul>

                                    <ul className="list-inline">
                                        <li className="list-inline-item me-4">

                                            <h5 className="mb-2 fw-semibold">CR Document</h5>
                                            <p className="mb-0">File</p>
                                        </li>

                                        <li className="list-inline-item me-4">
                                        <h5 className="mb-2 fw-semibold">Account Status</h5>
                                            <Badge  bg="secondary" >PENDING</Badge>
                                        </li>
                                    </ul>
                                   
                                    <ul className="list-inline">
                                        <li className="list-inline-item me-4">
                                    <Button variant="success">Accept</Button>
                                    <Button variant="danger">Reject</Button>
                                    <Button variant="secondary">Suspend </Button>
                                    </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        );
                    })}
            </Row>
        </div>

    );
};

const Users = () => {
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
           
            <UserManagement usersDetails={usersManagmentDetails} />
        </>
    );
};

export default Users;
