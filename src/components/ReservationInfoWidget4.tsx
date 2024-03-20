import Chart from 'react-apexcharts';
import { Card, Dropdown } from 'react-bootstrap';
import { ApexOptions } from 'apexcharts';
import { useState, useEffect } from 'react';

// simple pie chart
const ReservationInfoWidget4 = () => {
    const [reservationCounts, setReservationCounts] = useState([0, 0, 0, 0]);

    useEffect(() => {
        const fetchReservationCounts = async () => {
            try {
                const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/getReservationCounts');
                if (!response.ok) {
                    throw new Error('Failed to fetch reservation counts');
                }
                const data = await response.json();
                setReservationCounts([
                    data.totalConfirmedReservations,
                    data.totalRejectedReservations,
                    data.totalPendingReservations,
                    data.totalCompletedReservations
                ]);
            } catch (error) {
                console.error('Error fetching reservation counts:', error);
            }
        };

        fetchReservationCounts();
    }, []);


    


    const apexDonutOpts: ApexOptions = {
        chart: {
            height: 320,
            type: 'pie', // Set the type to "pie" for a pie chart
        },
        labels: [ 'Confirmed', 'Rejected', 'Pending', 'Completed' ],
        colors: [ '#189431', '#E62C1D', '#7E7D7D', '#24A5F3' ],
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            floating: false,
            fontSize: '14px',
            offsetX: 0,
            offsetY: -10,
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        height: 240,
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
    };

    // chart data
    // const apexDonutData = [ 55, 41, 17, 10]

    return (
        <Card>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Anothther Action</Dropdown.Item>
                        <Dropdown.Item>Something Else</Dropdown.Item>
                        <Dropdown.Item>Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <h4 className="header-title mb-3">Reservations Reports</h4>
                <Chart
                    options={apexDonutOpts}
                    series={reservationCounts}
                    type="pie"
                    height={520}
                    className="apex-charts"
                />
            </Card.Body>
        </Card>
    );
};

export default ReservationInfoWidget4;
