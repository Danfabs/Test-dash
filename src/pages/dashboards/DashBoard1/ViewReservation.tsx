import { Badge, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../../../hooks';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
//image
import cardImg from '../../../assets/images/gallery/1.jpg';
//types
import { ReservationsList } from '../../apps/Reservations/reservationTypes';

type ReservationsDetailsProps = {
    reservations: ReservationsList[];
    setReservations: React.Dispatch<React.SetStateAction<ReservationsList[]>>;
};

const ViewReservation = ({ reservations, setReservations }: ReservationsDetailsProps) => {
    const { slotId } = useParams();


    const updateReservationStatus = (reservationId: string, newStatus: string) => {
        const updatedReservations = reservations.map(reservation => {
            if (reservation.id === reservationId) {
                return { ...reservation, status: newStatus };
            }
            return reservation;
        });
        setReservations(updatedReservations);
    };

    // update the status to accepted
    const handleAccept = async (reservationId: string) => {
        try {
            console.log('Accepting reservation with ID:', reservationId);
            const response = await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/acceptReservation?slotId=${slotId}&reservationId=${reservationId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Assuming the server responds with the new status
            const data = await response.json();
            updateReservationStatus(reservationId, data.status);

            // Fetch reservations again to ensure the UI reflects the updated status
            const updatedResponse = await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/slotReservations?slotId=${slotId}`
            );
            const updatedData = await updatedResponse.json();
            setReservations(updatedData.reservations);

        } catch (error) {
            console.error('Error accepting reservation:', error);
        }
    };
    //  update the status to rejected
    const handleReject = async (reservationId: string) => {
        try {
            console.log('Rejecting reservation with ID:', reservationId);
            const response = await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/rejectReservation?slotId=${slotId}&reservationId=${reservationId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Assuming the server responds with the new status
            const data = await response.json();
            updateReservationStatus(reservationId, data.status);

            // Fetch reservations again to ensure the UI reflects the updated status
            const updatedResponse = await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/slotReservations?slotId=${slotId}`
            );
            const updatedData = await updatedResponse.json();
            setReservations(updatedData.reservations);

        } catch (error) {
            console.error('Error rejecting reservation:', error);
        }
    };


    return (
        <div>
            <h4 className="mt-0">Reservations</h4>
            {(!reservations || reservations.length === 0) ? (
                <p>No Reservations available</p>
            ) : (
                <Row>
                    {(reservations || []).map((reservation, index) => {
                        const { paymentDetails } = reservation;
                        const { location } = reservation;
                        return (
                            <Col xl={4} key={index.toString()}>
                                <Card>
                                    <Card.Img src={cardImg} />
                                    <Card.Body className="project-box">
                                        <h4 className="mt-0">
                                            <Link to="#" className="text-dark">
                                                {reservation.customerName}
                                            </Link>
                                        </h4>

                                        <ul className="list-inline">
                                            <Badge bg={
                                                reservation.status === 'Confirmed' ? 'success' :
                                                    reservation.status === 'Rejected' ? 'danger' :
                                                        reservation.status === 'Pending' ? 'secondary' : 
                                                        'dark'
                                            }>
                                                {reservation.status}
                                            </Badge>
                                        </ul>
                                        <ul className="list-inline">
                                            <li className="list-inline-item me-4">

                                                <h5 className="mb-2 fw-semibold">Booking Details</h5>
                                            </li>

                                            <ul className="list-inline">
                                                <li className="list-inline-item me-4">
                                                    <h5 className="mb-2 fw-semibold">Date</h5>
                                                    <p className="mb-0">{reservation.bookedDate}</p>
                                                </li>

                                                <li className="list-inline-item me-4">
                                                    <h5 className="mb-2 fw-semibold">Time</h5>
                                                    <p className="mb-0">{reservation.bookedTime}</p>
                                                </li>


                                                <li className="list-inline-item me-4">
                                                    <h5 className="mb-2 fw-semibold">location</h5>
                                                    <p className="mb-0">{location.address} {paymentDetails.currency}</p>
                                                </li>

                                            </ul>

                                        </ul>

                                        <ul className="list-inline">
                                            <li className="list-inline-item me-4">

                                                <h5 className="mb-2 fw-semibold">Payment Details</h5>
                                            </li>

                                            <ul className="list-inline">
                                                <li className="list-inline-item me-4">
                                                    <h5 className="mb-2 fw-semibold">Slot Fee</h5>
                                                    <p className="mb-0">{paymentDetails.slotFee}</p>
                                                </li>

                                                <li className="list-inline-item me-4">
                                                    <h5 className="mb-2 fw-semibold">Tax</h5>
                                                    <p className="mb-0">{paymentDetails.tax}</p>
                                                </li>

                                                <li className="list-inline-item me-4">
                                                    <h5 className="mb-2 fw-semibold">Voucher</h5>
                                                    <p className="mb-0">{paymentDetails.voucher}</p>
                                                </li>


                                                <li className="list-inline-item me-4">
                                                    <h5 className="mb-2 fw-semibold">Total Price</h5>
                                                    <p className="mb-0">{paymentDetails.total} {paymentDetails.currency}</p>
                                                </li>

                                            </ul>

                                        </ul>

                                        <ul className="list-inline">
                                            {reservation.status === 'Confirmed' && (
                                                <li className="list-inline-item me-4">
                                                    <Button variant="danger"
                                                        onClick={() => handleReject(reservation.id)}
                                                    >Reject</Button>
                                                </li>
                                            )}
                                            {reservation.status === 'Rejected' && (
                                                <li className="list-inline-item me-4">
                                                    <Button variant="success"
                                                        onClick={() => handleAccept(reservation.id)}>
                                                        Accept
                                                    </Button>
                                                </li>
                                            )}

                                            {reservation.status === 'Pending' && (
                                                <li className="list-inline-item me-4">
                                                    <Button variant="danger"
                                                        onClick={() => handleReject(reservation.id)}>
                                                        Reject
                                                    </Button>
                                                    <Button variant="success"
                                                        onClick={() => handleAccept(reservation.id)}>
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

const Reservations = () => {
    const { slotId } = useParams();
    const [reservations, setReservations] = useState<ReservationsList[]>([]);
    console.log("SlotID", slotId);


    useEffect(() => {
        // fetch reservations for each slot
        async function fetchData() {
            await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/slotReservations?slotId=${slotId}`
            )
                .then((res) => res.json())
                .then(
                    (result) => {
                        setReservations(result.reservations);
                        console.log("Reservations: ", result.reservations)
                    },

                    (error) => {
                        console.log("error: ", error);
                    }
                );
        }
        fetchData();


    }, [slotId]);


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
            <ViewReservation reservations={reservations} setReservations={setReservations} />
        </>
    );
};
export default Reservations;