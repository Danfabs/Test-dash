import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// bootstrap
import Button from 'react-bootstrap/Button';
import { Badge, Card, Col, Row, Spinner, Form } from 'react-bootstrap';
// types
import { EndUsersList } from './endUsersTypes';
// hooks
import { usePageTitle } from '../../../hooks';

const SingleUser = ({ users, setUsers }: { users: EndUsersList[]; setUsers: React.Dispatch<React.SetStateAction<EndUsersList[]>> }) => {

    const [filters, setFilters] = useState({
        searchText: '',
    });
    const [currentFilter, setCurrentFilter] = useState('Name');

    
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, searchText: e.target.value });
    };

    const filteredUsers = users.filter(user => {
        const searchText = filters.searchText.trim().toLowerCase();

        let userData = '';

        switch (currentFilter) {
            case 'Name':
                userData = user.name ? user.name.toLowerCase() : '';
                break;
            case 'Mobile Number':
                userData = user.mobile_number ? user.mobile_number : '';
                break;
            case 'Birthdate':
                userData = user.birthdate ? user.birthdate : '';
                break;
            case 'Gender':
                userData = user.gender ? user.gender.toLowerCase() : '';
                break;
            case 'Email Address':
                userData = user.email_address ? user.email_address.trim().toLowerCase() : '';
                break;
            default:
                break;
        }

        if (searchText === '') {
            return true; 
        }

        return userData.includes(searchText);
    });


    const handleFilterCriterionChange = (criterion: string) => {
        setCurrentFilter(criterion);
        setFilters({ searchText: '' }); // Clear the searchText when the filter criterion changes
    };


    const suspendUser = async (documentId: string) => {
        try {
            const response = await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/suspendedUser?documentId=${documentId}`,
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


    const reActiveUser = async (documentId: string) => {
        try {
            const response = await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/reActiveUser?documentId=${documentId}`,
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
                    user.id === documentId ? { ...user, status: 'Active' } : user
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
            <h4 className="mt-0">Filter</h4>
            <Row className="mb-4" style={{width:'350px'}}>
                <Col >
                    <Form>
                        <Form.Control
                            type="text"
                            placeholder={`Filter by ${currentFilter}`}
                            value={filters.searchText}
                            onChange={handleFilterChange}
                        />
                        <Form.Select
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                handleFilterCriterionChange(e.target.value)
                            }
                        >
                            <option value="Name">Name</option>
                            <option value="Email Address">Emai Address</option>
                            <option value="Mobile Number">Mobile Number</option>
                            <option value="Birthdate">Birthdate</option>
                            <option value="Gender">Gender</option>
                        </Form.Select>
                    </Form>
                </Col>
            </Row>
            <h4 className="mt-0">End Users</h4>
            <Row>
                {filteredUsers.map((user, index) => (
                    // return (
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

                                {user.status && (
                                    <ul className="list-inline">
                                        <Badge bg={
                                            user.status === 'Active' ? 'success' :
                                                user.status === 'Suspended' ? 'secondary' :
                                                    'dark'
                                        }>
                                            {user.status}
                                        </Badge>
                                    </ul>
                                )}

                                <ul className="list-inline">
                                    {user.mobile_number && (
                                        <li className="list-inline-item me-3">
                                            <h5 className="mb-2 fw-semibold">Mobile Number</h5>
                                            <p className="mb-0">{user.mobile_number}</p>
                                        </li>
                                    )}

                                    {user.email_address && (
                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Email</h5>
                                            <p className="mb-0">{user.email_address}</p>
                                        </li>
                                    )}

                                    {user.gender && (
                                        <li className="list-inline-item ">
                                            <h5 className="mb-2 fw-semibold">Gender</h5>
                                            <p className="mb-0">{user.gender}</p>
                                        </li>
                                    )}
                                </ul>

                                <ul className="list-inline">
                                    {user.birthdate && (
                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Birthday</h5>
                                            <p className="mb-0">{user.birthdate}</p>
                                        </li>
                                    )}
                                </ul>

                                <h4 className="mt-0">
                                    {user.id}
                                </h4>

                                {user.status === 'Active' && (
                                    <Button variant="secondary" onClick={() => suspendUser(user.id)}>Suspend User</Button>
                                )}

                                {user.status === 'Suspended' && (
                                    <Button variant="success" onClick={() => reActiveUser(user.id)}>Reactivate User</Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                )
                )}
            </Row>
        </div>
    );
};

const Users = () => {
    const [users, setUsers] = useState<EndUsersList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/getAllUsers`
            )
                .then((res) => res.json())
                .then(
                    (result) => {
                        setUsers(result.data);
                        setLoading(false);
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
            {loading ? ( // Show loading spinner if loading is true
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <SingleUser users={users} setUsers={setUsers} />
            )}
        </>
    );
};
export default Users;