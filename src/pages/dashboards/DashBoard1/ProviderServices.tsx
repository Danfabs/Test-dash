import { useEffect, useState } from 'react';
import { Badge, Card, Dropdown, Row, Table, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// type
import { ProviderList } from '../../apps/ProviderServices/providerTypes';
//Buttons
import Button from 'react-bootstrap/Button';
//firebase
import { projectFirestore } from '../../../firebase';

type UsersDetailsProps = {};


const ProviderServices = (props: UsersDetailsProps) => {
    const [usersDetails, setUsersDetails] = useState<ProviderList[]>([]);

    useEffect(() => {
        fetchProviderServices();
    }, []);

    const fetchProviderServices = async () => {
        try {
            const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/getProviderServices');
            if (!response.ok) {
                throw new Error('Failed to fetch provider services');
            }
            const data = await response.json();
            setUsersDetails(data.data);
            console.log("ProviderServices: ", usersDetails)
        } catch (error) {
            console.error('Error fetching provider services:', error);
        }
    };

    const handleStatusUpdate = async (userId: any, newStatus: any) => {
        try {
            const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/updateProviderServicesStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, newStatus }),
            });
            if (!response.ok) {
                throw new Error('Failed to update user status');
            }
            fetchProviderServices(); // Refresh user data after status update
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };


    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'Suspended':
                return 'danger';
            case 'Pending':
                return 'secondary';
            case 'Confirmed':
                return 'success';
            case 'Rejected':
                return 'danger';
            default:
                return 'light';
        }
    };



    return (
        <div>
            <h4 className="mt-0">Provider Services</h4>
            <Row>
                {usersDetails.map(user => (
                    <Col xl={4} key={user.id}>
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
                                        {user.id}
                                    </li>
                                </ul>


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
                                    <li className="list-inline-item me-4">
                                        <Badge bg={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
                                    </li>
                                </ul>

                                <Link to={`../ViewServices/${user.id}`}>
                                    {/* <Link to="../ViewServices"> */}
                                    Space Name
                                </Link>



                                <ul className="list-inline">

                                    <li className="list-inline-item me-4">
                                        <h5 className="mb-2 fw-semibold">Gender</h5>
                                        <p className="mb-0">{user.gender}</p>
                                    </li>

                                    <li className="list-inline-item me-4">
                                        <h5 className="mb-2 fw-semibold">Phone Number</h5>
                                        <p className="mb-0">{user.mobile_number}</p>
                                    </li>

                                    <li className="list-inline-item me-4">
                                        <h5 className="mb-2 fw-semibold">Owner Email</h5>
                                        <p className="mb-0">{user.email_address}</p>
                                    </li>

                                </ul>

                                <ul className="list-inline">
                                    <li className="list-inline-item me-4">

                                        <h5 className="mb-2 fw-semibold">Bank Details</h5>
                                    </li>

                                    <ul className="list-inline">
                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Bank Name</h5>
                                            <p className="mb-0">Muscat</p>
                                        </li>

                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Bank Branch</h5>
                                            <p className="mb-0">Muscat</p>
                                        </li>

                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Account Number</h5>
                                            <p className="mb-0">143 152 153 158</p>
                                        </li>

                                    </ul>


                                </ul>

                                <ul>

                                </ul>

                                <ul className="list-inline">
                                    <li className="list-inline-item me-4">
                                        {(user.status === 'Confirmed' || user.status === 'Rejected') ? (
                                            <Button variant={user.status === 'Confirmed' ? 'danger' : 'success'}
                                                onClick={() => handleStatusUpdate(user.id, user.status === 'Confirmed' ? 'Rejected' : 'Confirmed')}>
                                                {user.status === 'Confirmed' ? 'Reject' : 'Accept'}
                                            </Button>
                                        ) : (
                                            <>
                                                <Button variant="success" onClick={() => handleStatusUpdate(user.id, 'Confirmed')}>Accept</Button>
                                                <Button variant="danger" onClick={() => handleStatusUpdate(user.id, 'Rejected')}>Reject</Button>
                                            </>
                                        )}
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>

    );
};
export default ProviderServices;
