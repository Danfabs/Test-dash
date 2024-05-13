import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
//States
import { useEffect, useState } from 'react';
// bootstrap\
import { Card, Col, Row, Badge, Spinner } from 'react-bootstrap';
// types
import { ReservationsList } from '../../apps/Reservations/reservationTypes';
// hooks
import { usePageTitle } from '../../../hooks';
import cardImg from '../../../assets/images/gallery/1.jpg';



const ViewAllReservations = ({ reservations }: { reservations: ReservationsList[] | null}) => {
    const { t } = useTranslation();
    return (
        <div>
            <h4 className="mt-0">{t('Reservations')}</h4>
            {reservations === null ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">{t('Loading...')}</span>
                </Spinner>
            ) : (
                reservations.length === 0 ? ( 
                    <p>{t('No Reservations available')}</p>
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
                                                                'dark'
                                                }>
                                                    {reservation.status}
                                                </Badge>
                                            </ul>

                                            <ul className="list-inline">
                                                <li className="list-inline-item me-4">

                                                    <h5 className="mb-2 fw-semibold">{t('Booking Details')}</h5>
                                                </li>

                                                <ul className="list-inline">
                                                    <li className="list-inline-item me-4">
                                                        <h5 className="mb-2 fw-semibold">{t('Date')}</h5>
                                                        <p className="mb-0">{reservation.bookedDate}</p>
                                                    </li>

                                                    <li className="list-inline-item me-4">
                                                        <h5 className="mb-2 fw-semibold">{t('Time')}</h5>
                                                        <p className="mb-0">{reservation.bookedTime}</p>
                                                    </li>


                                                    <li className="list-inline-item me-4">
                                                        <h5 className="mb-2 fw-semibold">{t('location')}</h5>
                                                        <p className="mb-0">{location && location.address} </p>
                                                    </li>

                                                </ul>

                                            </ul>
                                            <ul className="list-inline">
                                                <li className="list-inline-item me-4">
                                                    <h5 className="mb-2 fw-semibold">{t('Payment Details')}</h5>
                                                </li>
                                                <ul className="list-inline">
                                                    {paymentDetails && (
                                                        <>
                                                            <li className="list-inline-item me-4">
                                                                <h5 className="mb-2 fw-semibold">{t('Slot Fee')}</h5>
                                                                <p className="mb-0">{paymentDetails.slotFee}</p>
                                                            </li>
                                                            <li className="list-inline-item me-4">
                                                                <h5 className="mb-2 fw-semibold">{t('Tax')}</h5>
                                                                <p className="mb-0">{paymentDetails.tax}</p>
                                                            </li>
                                                            <li className="list-inline-item me-4">
                                                                <h5 className="mb-2 fw-semibold">{t('Voucher')}</h5>
                                                                <p className="mb-0">{paymentDetails.voucher}</p>
                                                            </li>
                                                            <li className="list-inline-item me-4">
                                                                <h5 className="mb-2 fw-semibold">{t('Total Price')}</h5>
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
            )}
        </div >
    );
};

const Reservation = () => {
    const [reservations, setReservations] = useState<ReservationsList[] | null>(null);

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
