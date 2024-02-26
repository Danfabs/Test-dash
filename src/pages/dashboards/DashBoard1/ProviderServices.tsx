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
        const fetchUsers = async () => {
            try {
                const usersCollection = projectFirestore.collection('slot3_users');
                const snapshot = await usersCollection.where('is_partner', '==', true).get();

                const usersData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as unknown as ProviderList[];

                setUsersDetails(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);


    return (
        <div>
            <h4 className="mt-0">Provider Services</h4>
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

                                    <Link to="../ViewServices">
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

                                            <h5 className="mb-2 fw-semibold">Bank Details:</h5>
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
                                            <Button variant="success">Accept</Button>
                                            <Button variant="danger">Reject</Button>
                                            {/* <Button variant="secondary">Suspend </Button> */}
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
export default ProviderServices;
