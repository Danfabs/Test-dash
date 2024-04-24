import { Col, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

// component
import PlacesWidget1 from '../../../components/PlacesWidget1';
import ReservationWidget2 from '../../../components/ReservationWidget2';
import ReservationInfoWidget4 from '../../../components/ReservationInfoWidget4';
import AmountWidget3 from '../../../components/AmountWidget3';
const Statistics = () => {
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    useEffect(() => {
        const fetchTotalPrice = async () => {
            try {
                const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/calculateTotalPrice');
                if (!response.ok) {
                    throw new Error('Failed to fetch total price');
                }
                const data = await response.json();
                setTotalPrice(data.totalPrice);
                console.log("total price: ",totalPrice)
            } catch (error) {
                console.error('Error fetching total price:', error);
            }
        };

        fetchTotalPrice();
    }, []);


    return (
        <div >
        <Row className="no-gutters">
            <Col className="mx-auto">
                <PlacesWidget1
                    title="Spaces"
                    // data={58}
                    stats={256}
                    color={'#f05050'}
                    subTitle="Places"
                />
            </Col>
           
            <Col  className="mx-auto">
                <ReservationWidget2
                    title="Total Reservations"
                    color={'#ffbd4a'}
                    // data={80}
                    stats={256}
                    subTitle="Reservations"
                />
            </Col>
            <Col  className="mx-auto">
                <AmountWidget3
                    variant="success"
                    title="Total Amount"
                    trendValue="12%"
                    trendIcon="mdi mdi-trending-up"
                     stats={totalPrice !== null ? totalPrice : 0}
                    subTitle="OMR"
                    progress={77}
                />
            </Col>
           
            {/* <Col xl={3} md={6} className="mx-auto">
                <StatisticsWidget2
                    variant="pink"
                    title="Daily Sales"
                    trendValue="32%"
                    trendIcon="mdi mdi-trending-up"
                    stats={158}
                    subTitle="Revenue today"
                    progress={77}
                />
            </Col> */}
        </Row>
        </div>
    );
};

export default Statistics;
