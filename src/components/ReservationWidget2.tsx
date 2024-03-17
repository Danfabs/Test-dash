import { Card, Dropdown } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase';

type ReservationWidget2Props = {
    title: string;
    // data: number;
    color: string;
    stats: number;
    subTitle: string;
};

const ReservationWidget2 = ({ title, color, stats, subTitle }: ReservationWidget2Props) => {
    const [totalReservations, setTotalReservations] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await projectFirestore.collection('slot3_slots').get();
                const promises = snapshot.docs.map(async (slotDoc) => {
                    const reservationsSnapshot = await slotDoc.ref.collection('reservations').get();
                    return reservationsSnapshot.docs.length;
                });
                const reservationCounts = await Promise.all(promises);
                const totalOfReservations = reservationCounts.reduce((acc, count) => acc + count, 0);
                setTotalReservations(totalOfReservations);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };
        fetchData();
    }, []);

    const handleShowAllReservationClick = () => {
        navigate('/apps/viewAllReservations');
    };

    const apexOpts: ApexOptions = {
        chart: {
            type: 'radialBar',
            sparkline: {
                enabled: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: '75%',
                },
                track: {
                    background: color,
                    opacity: 0.3,
                    margin: 0,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: true,
                        color: color,
                        fontWeight: 700,
                        fontSize: '14px',
                        offsetY: 5,
                        formatter: (val: number) => {
                            return String(val);
                        },
                    },
                },
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'none',
                },
            },
        },
        colors: [color],
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
