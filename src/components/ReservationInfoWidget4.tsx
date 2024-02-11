import Chart from 'react-apexcharts';
import { Card, Dropdown } from 'react-bootstrap';
import { ApexOptions } from 'apexcharts';

// simple pie chart
const ReservationInfoWidget4 = () => {
    // default options
    const apexDonutOpts: ApexOptions = {
        chart: {
            height: 320,
            type: 'pie',
        },
        labels: [ 'Accepted',  'Rejected','Pending'],
        colors: [ '#189431', '#E62C1D', '#C1BABA'],
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
    const apexDonutData = [ 55, 41, 17];

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
                <Chart options={apexDonutOpts} series={apexDonutData} type="pie" height={520} className="apex-charts" />
            </Card.Body>
        </Card>
    );
};

export default ReservationInfoWidget4;
