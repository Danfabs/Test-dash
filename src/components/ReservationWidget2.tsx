import { Card, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
type ReservationWidget2Props = {
    title: string;
    color: string;
    stats: number;
    subTitle: string;
};

const ReservationWidget2 = ({ title, color, stats, subTitle }: ReservationWidget2Props) => {
    const [totalReservations, setTotalReservations] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTotalPrice = async () => {
            try {
                const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/getTotalReservations');
                if (!response.ok) {
                    throw new Error('Failed to fetch total price');
                }
                const data = await response.json();
                setTotalReservations(data.totalReservations);
                console.log("Total Reservations: ", data.totalReservations)
            } catch (error) {
                console.error('Error fetching total reservations:', error);
            }
        };

        fetchTotalPrice();
    }, []);

    const handleShowAllReservationClick = () => {
        navigate('/apps/viewAllReservations');
    };

    const subtitle = totalReservations === 1 ? 'reservation' : 'reservations';

    return (
        <Card>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleShowAllReservationClick}>Show All Reservations</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title mt-0 mb-3">{title}</h4>
                <div className="widget-detail-1 text-center">
                    <h2 className="fw-normal mb-1">{totalReservations}</h2>
                    <p className="text-muted mb-1">{subtitle}</p>
                </div>

            </Card.Body>
        </Card>
    );
};

export default ReservationWidget2;
