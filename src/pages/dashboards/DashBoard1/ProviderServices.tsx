import { Badge, Card, Dropdown, Row, Table, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../../../hooks';
import classNames from 'classnames';
// type
import { ProviderList } from '../../apps/ProviderServices/providerTypes';
//image
import cardImg from '../../../assets/images/gallery/1.jpg';
//Buttons
import Button from 'react-bootstrap/Button';

import { ProviderServicesDetails } from '../../apps/ProviderServices/providerdata';

type UsersDetailsProps = {
    usersDetails: ProviderList[];
};

const ProviderServices = ({ usersDetails }: UsersDetailsProps) => {
    return (
        <div>
            <h4 className="mt-0">Provider Services</h4>
            <Row>
                {(usersDetails || []).map((user, index) => {
                    return (
                        <Col xl={4} key={index.toString()}>
                            <Card>
                                <Card.Img src={cardImg} />
                                <Card.Body className="project-box">
                                    <h4 className="mt-0">
                                        <Link to="#" className="text-dark">
                                        provider services Name
                                        </Link>
                                    </h4>

                                    <Link to="../ViewServices">
                                        Space Name
                                    </Link>
                                    
                                    <ul className="list-inline">

                                    <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Gender</h5>
                                            <p className="mb-0">Male</p>
                                        </li>

                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Phone Number</h5>
                                            <p className="mb-0">+9689999999</p>
                                        </li>

                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Owner Email</h5>
                                            <p className="mb-0">aaa@gmail.com</p>
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
           
            <ProviderServices usersDetails={ProviderServicesDetails} />
        </>
    );
};

export default Users;
