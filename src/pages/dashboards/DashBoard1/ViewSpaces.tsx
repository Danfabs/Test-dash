import { Link } from 'react-router-dom';
//States
import { useEffect, useState } from 'react';
// bootstrap\
import { Card, Col, Row, Spinner} from 'react-bootstrap';
// types
import { SpacesList } from '../../apps/Spaces/spacesTypes';
// hooks
import { usePageTitle } from '../../../hooks';
import { useTranslation } from 'react-i18next';



const ViewSpaces = ({ spaces }: { spaces: SpacesList[] | null }) => {
    const { t } = useTranslation();
    return (
        <div>
            <h4 className="mt-0">{t('Spaces')}</h4>
            {spaces === null || typeof spaces === 'undefined' ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">{t('Loading...')}</span>
                </Spinner>
            ) : (
                spaces.length === 0 ? (
                    <p>{t('No Spaces available')}</p>
                ) : (
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
                                                    <h5 className="mb-2 fw-semibold">{t('Slots Minimum Price')}</h5>
                                                    <p className="mb-0">{spaces.slotsMinPrice}</p>
                                                </li>

                                                <li className="list-inline-item me-4">
                                                    <h5 className="mb-2 fw-semibold">{t('Minimum Reservation Fee')}</h5>
                                                    <p className="mb-0">{spaces.minimumReservationFee}</p>
                                                </li>

                                                {spaceAmenities && spaceAmenities.length > 0 && (
                                                    <li className="list-inline-item me-4">
                                                        <h5 className="mb-2 fw-semibold">{t('Space Amenities')}</h5>
                                                        {spaceAmenities.map((amenity, amenityIndex) => (
                                                            <i key={amenityIndex} className={`mdi mdi-${amenity.toLowerCase()}`}></i>
                                                        ))}
                                                    </li>
                                                )}
                                            </ul>

                                            <ul className="list-inline">
                                                <li className="list-inline-item me-4">
                                                    <h5 className="mb-2 fw-semibold">{t('Country')}</h5>
                                                    <p className="mb-0">{location.country}</p>


                                                </li>
                                                <li className="list-inline-item me-4">

                                                    <h5 className="mb-2 fw-semibold">{t('City')}</h5>
                                                    <p className="mb-0">{location.city}</p>
                                                </li>
                                                <li className="list-inline-item">

                                                    <h5 className="mb-2 fw-semibold">{t('Address')}</h5>
                                                    <p className="mb-0">{location.address}</p>
                                                </li>

                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                )
                )}
        </div>
    );
};

const Spaces = () => {
    const [spaces, setSpaces] = useState<null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    'https://us-central1-slot-145a8.cloudfunctions.net/getAllSpaces'
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch spaces');
                }

                const data = await response.json();
                setSpaces(data.data);
                console.log("spaces", spaces)
            } catch (error) {
                console.error('Error fetching spaces:', error);
            }
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
