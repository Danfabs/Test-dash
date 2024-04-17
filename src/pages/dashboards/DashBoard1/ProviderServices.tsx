import { useEffect, useState } from 'react';
import { Badge, Card, Dropdown, Row, Table, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// type
import { ProviderList } from '../../apps/ProviderServices/providerTypes';
//Buttons
import Button from 'react-bootstrap/Button';
//firebase
import { projectFirestore } from '../../../firebase';
import Swal from 'sweetalert2';
import "../../../assets/css/generalStyle.css"
type UsersDetailsProps = {};


const ProviderServices = (props: UsersDetailsProps) => {
    const [usersDetails, setUsersDetails] = useState<ProviderList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = projectFirestore.collection('slot3_users');
                const snapshot = await usersCollection.where('isPartner', '==', true).get();

                const usersData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as unknown as ProviderList[];

                setUsersDetails(usersData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);


    const acceptServiceProvider = async (documentId: string) => {
        try {

            // const user = usersDetails.find((user) => user.id === documentId);
            // if (!user || user.status !== 'Pending') {
            //     return;
            // }

            const response = await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/acceptServiceProvider?userId=${documentId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                // Update the user's status to 'Accepted' in the state
                setUsersDetails((prevState) =>
                    prevState.map((user) => (user.id === documentId ? { ...user, status: 'Accepted' } : user))
                );

                Swal.fire({
                    icon: 'success',
                    title: 'User Status Confirmed Successfully!',
                    customClass: {
                        confirmButton: 'custom-btn-success',
                    },
                });
            } else {
                console.error('Failed to confirm user:', response.statusText);
            }
        } catch (error) {
            console.error('Error Accepted user:', error);
        }
    };


    const rejectServiceProvider = async (documentId: string) => {
        try {
            const response = await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/rejectServiceProvider?userId=${documentId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setUsersDetails((prevState) =>
                prevState.map((user) => (user.id === documentId ? { ...user, status: 'Rejected' } : user))
            );

            Swal.fire({
                icon: 'success',
                title: 'User Status Rejected Successfully!',
                customClass: {
                    confirmButton: 'custom-btn-success'
                }
            });
            console.log("user status updated")

        } catch (error) {
            console.error('Error Rejected user:', error);
        }
    };


    return (
        <div>
            <h4 className="mt-0">Provider Services</h4>
            {loading ? ( // Display spinner if data is still loading
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <Row>
                    {(usersDetails || []).map((user, index) => {
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
                                                {user.id}
                                            </li>
                                        </ul>

                                        <ul className="list-inline">
                                            <li className="list-inline-item me-4">
                                                <Badge bg={
                                                    user.status === 'Accepted' ? 'success' :
                                                        user.status === 'Rejected' ? 'danger' :
                                                            'secondary'
                                                }>
                                                    {user.status === 'Accepted' ? 'Accepted' :
                                                        user.status === 'Rejected' ? 'Rejected' :
                                                            'Pending'}
                                                </Badge>
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
                                            {user.status === 'Pending' && (
                                                <li className="list-inline-item me-4">
                                                    <Button
                                                        variant="success"
                                                        onClick={() => acceptServiceProvider(user.id)}
                                                    >
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        onClick={() => rejectServiceProvider(user.id)}
                                                        variant="danger"
                                                    >
                                                        Reject
                                                    </Button>
                                                </li>
                                            )}

                                            {user.status === 'Accepted' && (
                                                <li className="list-inline-item me-4">
                                                    <Button
                                                        onClick={() => rejectServiceProvider(user.id)}
                                                        variant="danger"
                                                    >
                                                        Reject
                                                    </Button>
                                                </li>
                                            )}

                                            {user.status === 'Rejected' && (
                                                <li className="list-inline-item me-4">
                                                    <Button
                                                        variant="success"
                                                        onClick={() => acceptServiceProvider(user.id)}
                                                    >
                                                        Accept
                                                    </Button>
                                                </li>
                                            )}


                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            )}
        </div>

    );
};
export default ProviderServices;
