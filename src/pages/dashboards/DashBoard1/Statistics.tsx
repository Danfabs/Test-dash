import { Col, Row } from 'react-bootstrap';

// component
import BranchesWidget1 from '../../../components/BranchesWidget1';
import ReservationWidget2 from '../../../components/ReservationWidget2';
import ReservationInfoWidget4 from '../../../components/ReservationInfoWidget4';
import AmountWidget3 from '../../../components/AmountWidget3';

const Statistics = () => {
    return (
        <div >
        <Row className="no-gutters">
            <Col className="mx-auto">
                <BranchesWidget1
                    title="Branches"
                    // data={58}
                    stats={256}
                    color={'#f05050'}
                    subTitle="Branches"
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
                    stats={8451}
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
