import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';

// component
import Statistics from './Statistics';
import UsersChart from './UsersChart';
import StatisticsChart from './StatisticsChart';
import RevenueChart from './RevenueChart';
import Users from './Users';
import ReservationInfoWidget4 from '../../../components/ReservationInfoWidget4';
import LeftSidebar from '../../../layouts/LeftSidebar';


const DashBoard1 = () => {
    // set pagetitle
    usePageTitle({
        title: 'DashBoard',
        breadCrumbItems: [
            {
                path: '/dashboard',
                label: 'DashBoard',
                active: true,
            },
        ],
    });

    return (
        <>
        
            <Statistics />

            <Row>
                <Col>
                    <UsersChart />
                </Col>
                {/* <Col xl={4}>
                    <StatisticsChart />
                </Col> */}
                {/* <Col xl={4}>
                    <RevenueChart />
                </Col> */}
            </Row>
            <Row>
            <Col>
                <ReservationInfoWidget4/>
                </Col>
            </Row>

            <Users />

            {/* <Row>
                <Col xl={4}>
                    <Inbox messages={messages} />
                </Col>
                <Col xl={8}>
                    <ProviderServices ProviderServicesDetails={ProviderServicesDetails} />
                </Col>
            </Row> */}
        </>
    );
};

export default DashBoard1;
