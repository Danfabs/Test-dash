import { Badge, Card, Dropdown, Row, Table, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../../../hooks';

//image
import cardImg from '../../../assets/images/gallery/1.jpg';
//data
import { SlotsDetails } from '../../apps/Slots/slotsdata'; 
//types
import { SlotsList } from '../../apps/Slots/slotsTypes';

type SlotsDetailsProps = {
  slotsDetails: SlotsList[];
};

const ViewSlots = ({ slotsDetails }: SlotsDetailsProps) => {
    return (
        <div>
            <h4 className="mt-0">Slots</h4>
            <Row>
                {(slotsDetails || []).map((slot, index) => {
                    return (
                        <Col xl={4} key={index.toString()}>
                            <Card>
                                <Card.Img src={cardImg} />
                                <Card.Body className="project-box">
                                    <h4 className="mt-0">
                                        <Link to="#" className="text-dark">
                                            Slot Name
                                        </Link>
                                    </h4>

                                    <ul className="list-inline">
                                    <Badge  bg="success" >Accepted</Badge>
                                   </ul>

                                    <ul className="list-inline">
                                    <p className="mb-0">
                                        Customer Name
                                        </p>
                                    </ul>

                                    <ul className="list-inline">
                                    <p className="mb-0">
                                        Reservation Date
                                        </p>
                                    </ul>

                                    <ul className="list-inline">
                                    <p className="mb-0">
                                        Reservation Time
                                        </p>
                                    </ul>

                                    
                                    <ul className="list-inline">
                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Payment info (Your business hasn't received the payment for this reservation)</h5>
                                        </li>

                                        {/* <li className="list-inline-item">
                                            <h5 className="mb-2 fw-semibold">ARRIVED</h5>
                                        </li> */}

                                    </ul>

                                </Card.Body>
                            </Card>
                        </Col>
                        );
                    })}
            </Row>
        </div>

    );
};

const Slots = () => {
    // set pagetitle
    usePageTitle({
        title: 'Projects',
        breadCrumbItems: [
            {
                path: 'apps/projects',
                label: 'Apps',
            },
            {
                path: 'apps/projects',
                label: 'Projects',
                active: true,
            },
        ],
    });

    return (
        <>
            <ViewSlots slotsDetails={SlotsDetails} />
        </>
    );
};

export default Slots;