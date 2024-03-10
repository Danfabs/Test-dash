import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// bootstrap
import Button from 'react-bootstrap/Button';
import { Badge, Card, Col, Row } from 'react-bootstrap';
// types
import { SpacesList } from '../../apps/Spaces/spacesTypes';
// hooks
import { usePageTitle } from '../../../hooks';



const ViewSpaces = ({ spaces }: { spaces: SpacesList[] }) => {
    return (
        <div>
            <h4 className="mt-0">Spaces</h4>
            <>
                <Row>
                    {(spaces || []).map((spaces, index) => {
                         const { location } = spaces;
                         const { spaceAmenities } = spaces;
                         return (
                            <Col xl={4} key={index.toString()}>
                                <Card>
                                    {spaces.spacePhoto && <Card.Img src={spaces.spacePhoto} alt={`Space ${spaces.spacePhoto}`} />}
                                    <Card.Body className="project-box">
                                        <h4 className="mt-0">
                                            <Link to="#" className="text-dark">
                                                {spaces.spaceName}
                                            </Link>
                                        </h4>
    
    
                                        <ul className="list-inline">
                                            <p className="mb-0">
                                                {spaces.spaceDescription}
                                            </p>
                                        </ul>
    
    
                                        <ul className="list-inline">
    
                                            <li className="list-inline-item me-4">
                                                <h5 className="mb-2 fw-semibold">Slots Minimum Price</h5>
                                                <p className="mb-0">{spaces.slotsMinPrice}</p>
                                            </li>
    
                                            <li className="list-inline-item me-4">
                                                <h5 className="mb-2 fw-semibold">Minimum Reservation Fee</h5>
                                                <p className="mb-0">{spaces.minimumReservationFee}</p>
                                            </li>
    
                                            {spaceAmenities && spaceAmenities.length > 0 && (
                                                <li className="list-inline-item me-4">
                                                    <h5 className="mb-2 fw-semibold">Space Amenities</h5>
                                                    {spaceAmenities.map((amenity, amenityIndex) => (
                                                        <i key={amenityIndex} className={`mdi mdi-${amenity.toLowerCase()}`}></i>
                                                    ))}
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
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row></>
        </div>
    );
};

const Spaces = () => {
    const [spaces, setSpaces] = useState<SpacesList[]>([]);


    useEffect(() => {
        async function fetchData() {
            await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/getSpaces`
            )
                .then((res) => res.json())
                .then(
                    (result) => {
                        setSpaces(result.data);
                        console.log("result: ", result.data)
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
            <ViewSpaces spaces={spaces} />
        </>
    );
};

export default Spaces;
