import React, { useState, useEffect } from 'react';

import { Card, } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import '../../../assets/css/generalStyle.css';


const UsersChart = () => {
    const [providerServiceCount, setProviderServiceCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [staffCount, setStaffCount] = useState(0);

    useEffect(() => {
        fetchProviderServiceCount();
        fetchCustomerCount();
        fetchStaffCount();
    }, []);

    const fetchProviderServiceCount = async () => {
        try {
            const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/calculateTotalProviderServices');
            const data = await response.json();
            if (response.ok) {
                setProviderServiceCount(data.providerServiceCount);
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error fetching provider service count:', error);
        }
    };

    const fetchCustomerCount = async () => {
        try {
            const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/calculateTotalCustomer');
            const data = await response.json();
            if (response.ok) {
                setCustomerCount(data.customerCount);
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error fetching customer count:', error);
        }
    };

    const fetchStaffCount = async () => {
        try {
            const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/calculateTotalStaff');
            const data = await response.json();
            if (response.ok) {
                setStaffCount(data.staffCount);
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error fetching staff count:', error);
        }
    };


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
        labels: ['Customer', 'Service Provider ', 'Staff'],
        tooltip: {
            enabled: false,
        },
    };


    const apexData = [customerCount, providerServiceCount, staffCount];

    return (
        <div >
            <Card >
                <Card.Body>
                    {/* <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>All Customers</Dropdown.Item>
                        <Dropdown.Item>All Vendors</Dropdown.Item>
                        <Dropdown.Item>All Staff</Dropdown.Item>
                        <Dropdown.Item>Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                    <div dir="ltr" className='card-div'>
                        <h4 className="header-title mb-3">Users Reports</h4>
                        <Chart
                            options={apexOpts}
                            series={apexData}
                            type="donut"
                            height={502}
                            className="apex-charts mt-2"
                        />
                    </div>

                </Card.Body>

            </Card>
        </div>
    );
};

export default UsersChart;
