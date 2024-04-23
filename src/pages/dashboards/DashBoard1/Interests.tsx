import { Card, Dropdown } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import '../../../assets/css/generalStyle.css';
const Interests = () => {
    const apexOpts: ApexOptions = {
        chart: {
            type: 'donut',
        },
        plotOptions: {
            pie: {
                expandOnClick: true,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            formatter: (val: string) => {
                                return val;
                            },
                            offsetY: 4,
                            color: '#98a6ad',
                        },
                        value: {
                            show: true,
                            formatter: (val: string) => {
                                return val;
                            },
                            color: '#98a6ad',
                        },
                    },
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#FFD653FF', '#006747FF', '#F0E1B9FF'],
        legend: {
            show: true,
            position: 'bottom',
            height: 40,
            labels: {
                useSeriesColors: true,
            },
        },
        labels: ['Customer', 'Vendor', 'Staff'],
        tooltip: {
            enabled: false,
        },
    };

    const apexData = [30, 12, 20];

    return (
        <div >
            <Card >
                <Card.Body>
                    
                    <div dir="ltr" className='card-div'>
                        <h4 className="header-title mb-3">Add Spaces Interests</h4>
                        {/* <Chart
                            options={apexOpts}
                            series={apexData}
                            type="donut"
                            height={502}
                            className="apex-charts mt-2"
                        /> */}
                    </div>

                </Card.Body>

            </Card>
        </div>
    );
};

export default Interests;
