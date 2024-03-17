import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// bootstrap
import Button from 'react-bootstrap/Button';
import { Badge, Card, Col, Row } from 'react-bootstrap';
// types
import { EndUsersList } from './endUsersTypes';
// hooks
import { usePageTitle } from '../../../hooks';

const SingleUser = ({ users, setUsers }: { users: EndUsersList[]; setUsers: React.Dispatch<React.SetStateAction<EndUsersList[]>> }) => {

    const suspendUser = async (documentId: string) => {
        try {
            const response = await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/updateUserStatus?documentId=${documentId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.ok) {
                // Update the local state with the updated user
                const updatedUsers = users.map(user =>
                    user.id === documentId ? { ...user, status: 'Suspended' } : user
                );
                setUsers(updatedUsers);
            } else {
                console.error('Failed to suspend user:', response.statusText);
            }
        } catch (error) {
            console.error('Error suspending user:', error);
        }
    };

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

                                        <ul className="list-inline">
                                            <Badge bg={
                                                user.status === 'Active' ? 'success' :
                                                    user.status === 'Suspended' ? 'secondary' :
                                                        'dark'
                                            }>
                                                {user.status}
                                            </Badge>
                                        </ul>

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
                                        </ul>

                                        <Button variant="secondary" onClick={() => suspendUser(user.id)}>Suspend User</Button>
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
            <SingleUser users={users} setUsers={setUsers} />
        </>
    );
};
export default Users;