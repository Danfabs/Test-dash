import { Card, Dropdown } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { projectFirestore } from '../firebase';
import { useEffect, useState } from 'react';


type PlacesWidget1Props = {
    title: string;
    // data: number;
    color: string;
    stats: number;
    subTitle: string;
};

const PlacesWidget1 = ({ title, color, stats, subTitle }: PlacesWidget1Props) => {
    const [totalPlaces, setTotalPlaces] = useState<number>(0);

    useEffect(() => {
        // Reference to the Firestore collection
        const spacesCollection = projectFirestore.collection('slot3_spaces');

        // Fetch data and get the total count
        const fetchTotalBranches = async () => {
            try {
                const snapshot = await spacesCollection.get();
                const totalPlacesCount = snapshot.size;
                setTotalPlaces(totalPlacesCount);
                console.log('Total Branches:', totalPlacesCount);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };

        fetchTotalBranches();
    }, []);

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

    // const apexData = [data];

    return (
        <Card>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Show All Places</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title mt-0 mb-3">{title}</h4>
                <div className="widget-detail-1 text-center">
                    <h2 className="fw-normal mb-1">{totalPlaces}</h2>
                    <p className="text-muted mb-1">{subTitle}</p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default PlacesWidget1;