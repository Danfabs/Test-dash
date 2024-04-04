import { Button, Card, Dropdown, Row, Col , Spinner } from 'react-bootstrap';

import Avatar1 from '../../../assets/images/users/user-3.jpg'
import { useEffect, useState } from 'react';
import { EndUsersList } from '../../apps/EndUsers/endUsersTypes';



export default function DelegateUsers() {
    const [users, setUsers] = useState<EndUsersList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `https://us-central1-slot-145a8.cloudfunctions.net/getUsersByEmailDomain`
                );
                const data = await response.json();
                setUsers(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchData();
    }, []);

console.log("users: ",users)
    // console.log("Rendered with users: ", users);

    return (
        <div>
             <h4 className="mt-0">Users</h4>
        <>
        {loading ? ( // Display spinner if data is still loading
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
            <Row>
            {(users || []).map((user, index) => {
                      return (
                    <Col xl={12} key={index.toString()} >
                        <Card >
                            <Card.Body className="text-center">
                                {/* <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Anothther Action</Dropdown.Item>
                        <Dropdown.Item>Something Else</Dropdown.Item>
                        <Dropdown.Item>Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                                <div>
                                    {user.photo_url && <Card.Img src={user.photo_url} alt={`User ${user.name}`} />}
                                    <Card.Body className="project-box">
                                        <div className="text-start">
                                            <p className="text-muted font-13">
                                                <strong>Full Name :
                                                </strong> <span className="ms-2">
                                                    {user.firstName} {user.lastName}
                                                </span>
                                            </p>

                                            <p className="text-muted font-13">
                                                <strong>Mobile :</strong>
                                                <span className="ms-2">
                                                    {user.mobile_number}
                                                </span>
                                            </p>

                                            <p className="text-muted font-13">
                                                <strong>Email :</strong> <span className="ms-2">
                                                    {user.email_address}
                                                </span>
                                            </p>

                                            <p className="text-muted font-13">
                                                <strong>User Role :</strong> <span className="ms-2">
                                                    {user.role}
                                                </span>
                                            </p>
                                        </div>
                                    </Card.Body>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    );
                })}
            </Row>
             )}
        </>
        </div>
    );
};


