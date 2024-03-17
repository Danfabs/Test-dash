import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// bootstrap
import Button from 'react-bootstrap/Button';
import { Badge, Card, Col, Row } from 'react-bootstrap';
// types
import { EndUsersList } from './endUsersTypes';
// hooks
import { usePageTitle } from '../../../hooks';
//firebase
import { projectFirestore } from '../../../firebase';



const SingleUser = ({ users }: { users: EndUsersList[] }) => {
    return (
        <div>
            <h4 className="mt-0">End Users</h4>
            <>
                <Row>
                    {(users || []).map((user, index) => {
                        return (
                            <Col xl={4} key={index.toString()}>
                                <Card>
                                    {user.photo_url && <Card.Img src={user.photo_url} alt={`User ${user.name}`} />}
                                    <Card.Body className="project-box">

                                        <h4 className="mt-0">
                                            <Link to="#" className="text-dark">
                                                {user.name}
                                            </Link>
                                        </h4>


                                        <ul className="list-inline">
                                            <li className="list-inline-item me-4">
                                                {user.is_partner ? (
                                                    <>
                                                        <Badge bg="success">Partner</Badge>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Badge bg="danger">Not Partner</Badge>
                                                    </>
                                                )}
                                            </li>
                                        </ul>


                                        {/* <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Space Slot Type (Space , experince ...)</h5>
                                        </li> */}

                                        <ul className="list-inline">

                                            <li className="list-inline-item me-3">
                                                <h5 className="mb-2 fw-semibold">Mobile Number</h5>
                                                <p className="mb-0">{user.mobile_number}</p>
                                            </li>

                                            <li className="list-inline-item me-4">
                                                <h5 className="mb-2 fw-semibold">Email</h5>
                                                <p className="mb-0">{user.email_address}</p>
                                            </li>

                                            <li className="list-inline-item ">
                                                <h5 className="mb-2 fw-semibold">Gender</h5>
                                                <p className="mb-0">{user.gender}</p>
                                            </li>

                                        </ul>

                                        <ul className="list-inline">
                                            <li className="list-inline-item me-4">
                                                <h5 className="mb-2 fw-semibold">Birthday</h5>
                                                <p className="mb-0">{user.birthdate}</p>


                                            </li>
                                            {/* <li className="list-inline-item me-4">

                                                <h5 className="mb-2 fw-semibold">City</h5>
                                                <p className="mb-0">Muscat</p>
                                            </li> */}
                                            {/* <li className="list-inline-item">

                                                <h5 className="mb-2 fw-semibold">Address</h5>
                                                <p className="mb-0">Al-Khoud</p>
                                            </li> */}
                                        </ul>

                                        {/* <Button  variant="success">Accept</Button>
                                        <Button  variant="danger">Reject</Button> */}
                                        <Button variant="secondary">Suspend User</Button>
                                        {/* <span className={classNames('float-end', 'text-' + project.variant)}>
                                            {project.progress}%
                                        </span> */}

                                        {/* <ProgressBar
                                        className={classNames('progress-bar-alt-' + project.variant, 'progress-sm')}
                                    >
                                        <ProgressBar
                                            variant={project.variant}
                                            now={project.progress}
                                            className="progress-animated" />
                                    </ProgressBar> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row></>
        </div>
    );
};

const Users = () => {
    const [users, setUsers] = useState<EndUsersList[]>([]);


    useEffect(() => {
        async function fetchData() {
            await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/getAllUsers`
            )
                .then((res) => res.json())
                .then(
                    (result) => {
                        setUsers(result.data);
                        console.log("users: ", result.data)
                    },

                    (error) => {
                        console.log("error: ", error);
                    }
                );
        }
        fetchData();

    }, []);


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
            <SingleUser users={users} />
        </>
    );
};

export default Users;
