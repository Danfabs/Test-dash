import { Badge, Card, Dropdown, Row, Table, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../../../hooks';
import Button from 'react-bootstrap/Button';
//image
import cardImg from '../../../assets/images/gallery/1.jpg';
//data
import { ReservationsDetails } from '../../apps/Reservations/reservationdata'; 
//types
import { ReservationsList } from '../../apps/Reservations/reservationTypes';

type ReservationsDetailsProps = {
  reservationsDetails: ReservationsList[];
};

const ViewReservation = ({ reservationsDetails }: ReservationsDetailsProps) => {
    return (
        <div>
            <h4 className="mt-0">Reservations</h4>
            <Row>
                {(reservationsDetails || []).map((reservation, index) => {
                    return (
                        <Col xl={4} key={index.toString()}>
                            <Card>
                                <Card.Img src={cardImg} />
                                <Card.Body className="project-box">
                                    <h4 className="mt-0">
                                        <Link to="#" className="text-dark">
                                            User Name
                                        </Link>
                                    </h4>

                                    <ul className="list-inline">
                                    <Badge  bg="success" >Status (Accepted or Rejected)</Badge>
                                   </ul>
                                   <ul className="list-inline">
                                        <li className="list-inline-item me-4">

                                            <h5 className="mb-2 fw-semibold">Booking Details:</h5>
                                        </li>

                                        <ul className="list-inline">
                                        <li className="list-inline-item me-4">
                                        <h5 className="mb-2 fw-semibold">Date</h5>
                                            <p className="mb-0">1/1/2024</p>
                                        </li>
                                        
                                        <li className="list-inline-item me-4">
                                        <h5 className="mb-2 fw-semibold">Time</h5>
                                            <p className="mb-0">10:00 AM - 11:00 AM</p>
                                        </li>

                                        <li className="list-inline-item me-4">
                                        <h5 className="mb-2 fw-semibold">Duration</h5>
                                            <p className="mb-0">1 Hr</p>
                                        </li>

                                        <li className="list-inline-item me-4">
                                        <h5 className="mb-2 fw-semibold">Price</h5>
                                            <p className="mb-0">5 OMR</p>
                                        </li>
                                           
                                        </ul>

                                        </ul>

                                        <ul className="list-inline">
                                        <li className="list-inline-item me-4">
                                    <Button variant="success">Accept</Button>
                                    <Button variant="danger">Reject</Button>
                                    {/* <Button variant="secondary">Suspend </Button> */}
                                    </li>
                                    </ul>

                                    {/* <ul className="list-inline">
                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Payment info (Your business hasn't received the payment for this reservation)</h5>
                                        </li>

                                        <li className="list-inline-item">
                                            <h5 className="mb-2 fw-semibold">ARRIVED</h5>
                                        </li>

                                    </ul> */}

                                </Card.Body>
                            </Card>
                        </Col>
                        );
                    })}
            </Row>
        </div>

    );
};

const Reservations = () => {
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
            <ViewReservation reservationsDetails={ReservationsDetails} />
        </>
    );
};

export default  Reservations ;