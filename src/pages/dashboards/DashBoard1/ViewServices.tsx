import { Badge, Card, Dropdown, Row, Table, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../../../firebase';

//Buttons
import Button from 'react-bootstrap/Button';
// import { ServicesDetails } from '../../ServicesInfo/servicesdata';
import { ServicesList } from '../../ServicesInfo/servicesTypes';

type ServicesDetailsProps = {
    servicesDetails: ServicesList[];
};

type ServicesListWithId = ServicesList & { id: string };


const ViewServices = ({ servicesDetails }: ServicesDetailsProps) => {
    const navigate = useNavigate();

    const handleViewSlotsClick = (documentId: string) => {
        navigate(`../viewSlots/${documentId}`);
    };

    
    return (
        <div>
            <h4 className="mt-0">Services</h4>
            <Row>
                {(servicesDetails || []).map((service, index) => {
                    const { location } = service;
                    const { spaceAmenities } = service;
                    return (
                        <Col xl={4} key={index.toString()}>
                            <Card>
                                {service.spacePhoto && <Card.Img src={service.spacePhoto} alt={`Space ${service.spacePhoto}`} />}
                                <Card.Body className="project-box">
                                    <h4 className="mt-0">
                                        <Link to="#" className="text-dark">
                                            {service.spaceName}
                                        </Link>
                                    </h4>


                                    <ul className="list-inline">
                                        <p className="mb-0">
                                            {service.spaceDescription}
                                        </p>
                                    </ul>


                                    <ul className="list-inline">

                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Slots Minimum Price</h5>
                                            <p className="mb-0">{service.slotsMinPrice}</p>
                                        </li>

                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Minimum Reservation Fee</h5>
                                            <p className="mb-0">{service.minimumReservationFee}</p>
                                        </li>

                                        {spaceAmenities && spaceAmenities.length > 0 && (
                                            <li className="list-inline-item me-4">
                                                <h5 className="mb-2 fw-semibold">Space Amenities</h5>
                                                {spaceAmenities.map((amenity, amenityIndex) => (
                                                    <i key={amenityIndex} className={`mdi mdi-${amenity.toLowerCase()}`}></i>
                                                ))}
                                                {/* <i className="mdi mdi-wifi"></i>
                                                    <i className="mdi mdi-parking"></i>
                                                    <i className="mdi mdi-human-male-female"></i> */}
                                            </li>
                                        )}
                                    </ul>

                                    <ul className="list-inline">
                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Country</h5>
                                            <p className="mb-0">{location.country}</p>


                                        </li>
                                        <li className="list-inline-item me-4">

                                            <h5 className="mb-2 fw-semibold">City</h5>
                                            <p className="mb-0">{location.city}</p>
                                        </li>
                                        <li className="list-inline-item">

                                            <h5 className="mb-2 fw-semibold">Address</h5>
                                            <p className="mb-0">{location.address}</p>
                                        </li>

                                    </ul>

                                    <ul className="list-inline">
                                        <li className="list-inline-item">
                                            <Button variant="success" onClick={() => { handleViewSlotsClick(service.id) }}>View Slots</Button>
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

const Services = () => {
    const { partnerId } = useParams();
    const [spaces, setSpaces] = useState<ServicesListWithId[]>([]);
    console.log("partnerId", partnerId);

    useEffect(() => {
                projectFirestore.collection('slot3_spaces')
                    .where('createdBy', '==', partnerId)
                    .get()
                    .then((querySnapshot) => {
                        const spacesWithId: ServicesListWithId[] = [];
                        querySnapshot.forEach((doc) => {
                            spacesWithId.push({ ...doc.data(), id: doc.id } as ServicesListWithId);
                        });

                        setSpaces(spacesWithId);
                        console.log("spaces: ", spacesWithId);
                    })
                    .catch((error) => {
                        console.error("Error fetching data from Firestore:", error);
                    });
        
    }, [partnerId]);


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

            <ViewServices servicesDetails={spaces} />
        </>
    );
};

export default Services;
