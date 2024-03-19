import { Link } from 'react-router-dom';
//States
import { useEffect, useState } from 'react';
// bootstrap\
import { Card, Col, Row, Badge } from 'react-bootstrap';
// types
import { ReservationsList } from '../../apps/Reservations/reservationTypes';
// hooks
import { usePageTitle } from '../../../hooks';
import cardImg from '../../../assets/images/gallery/1.jpg';



const ViewAllReservations = ({ reservations }: { reservations: ReservationsList[] }) => {
    return (
        <div>
            <h4 className="mt-0">Reservations</h4>
            {(!reservations || reservations.length === 0) ? (
                <p>No Reservations available</p>
            ) : (
                <Row>
                    {reservations.map((reservation, index) => {
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
                                                            'light'
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
                                                    <p className="mb-0">{location && location.address} </p>
                                                </li>

                                            </ul>

                                        </ul>
                                        <ul className="list-inline">
                                            <li className="list-inline-item me-4">
                                                <h5 className="mb-2 fw-semibold">Payment Details</h5>
                                            </li>
                                            <ul className="list-inline">
                                                {paymentDetails && (
                                                    <>
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
                                                    </>
                                                )}
                                            </ul>
                                    </ul>
                                </Card.Body>
                            </Card>
                            </Col>
            );
                    })}
        </Row>
    )
}
        </div >
    );
};

const Reservation = () => {
    const [reservations, setReservations] = useState<ReservationsList[]>([]);

    useEffect(() => {
        async function fetchData() {
            await fetch(
                `https://us-central1-slot-145a8.cloudfunctions.net/getAllReservations`
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
            <ViewAllReservations reservations={reservations} />
        </>
    );
};

export default Reservation;
