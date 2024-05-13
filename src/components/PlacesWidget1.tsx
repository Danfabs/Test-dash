import { Card, Dropdown } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { projectFirestore } from '../firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks';
import { useTranslation } from 'react-i18next';

type PlacesWidget1Props = {
    title: string;
    // data: number;
    color: string;
    stats: number;
    subTitle: string;
};

const PlacesWidget1 = ({ title, color, stats, subTitle }: PlacesWidget1Props) => {
    const [totalPlaces, setTotalPlaces] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation(); 
    
    useEffect(() => {
        const fetchSpaceCount = async () => {
            try {
                const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/calculateTotalSpace');
                if (!response.ok) {
                    throw new Error('Failed to fetch total price');
                }
                const data = await response.json();
                setTotalPlaces(data.spaceCount);
                console.log("Total Places: ", data.spaceCount);
            } catch (error) {
                console.error('Error fetching total reservations:', error);
            }
        };
        fetchSpaceCount();
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

    const handleShowAllPlacesClick = () => {
        navigate('/apps/viewSpaces');
    };

    return (
        <Card>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleShowAllPlacesClick}>Show All Spaces</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title mt-0 mb-3">{title}</h4>
                <div className="widget-detail-1 text-center">
                    <h2 className="fw-normal mb-1">{totalPlaces}</h2>
                    <p className="text-muted mb-1">{totalPlaces === 1 ? t('space') : t('spaces')}</p>
                </div>
            </Card.Body>
        </Card>
    );
};
export default PlacesWidget1;