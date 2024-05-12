import { Badge, Card, Dropdown, Row, Table, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../../../hooks';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { projectFirestore } from '../../../firebase';

//image
import cardImg from '../../../assets/images/gallery/1.jpg';
//types
import { SlotsList } from '../../apps/Slots/slotsTypes';

type SlotsDetailsProps = {
    slots: SlotsList[];
};

type SlotsListWithId = SlotsList & { id: string };

const ViewSlots = ({ slots }: SlotsDetailsProps) => {
    const navigate = useNavigate();

    const handleViewReservationClick = (slotId: string) => {
        navigate(`../viewReservations/${slotId}`);
    };

    return (
        <div>
            <h4 className="mt-0">Slots</h4>
            {slots.length === 0 ? (
                <p>No slot available</p>
            ) : (
                <Row>
                    {(slots || []).map((slot, index) => {
                        const { basePricing, documentId: slotId } = slot;
                        return (
                            <Col xl={4} key={index.toString()}>
                                <Card>
                                    {slot.slotPhoto && <Card.Img src={slot.slotPhoto} alt={`Space ${slot.slotPhoto}`} />}
                                    <Card.Body className="project-box">
                                    <h4 className="mt-0">
                                                {slot.id}
                                        </h4>
                                        <h4 className="mt-0">
                                            <Link to="#" className="text-dark">
                                                {slot.slotName}
                                            </Link>
                                        </h4>

                                        {/* <ul className="list-inline">
                                            <Badge bg="success" >Accepted</Badge>
                                        </ul> */}


                                        {/* basePricing */}
                                        <ul className="list-inline">
                                            <li className="list-inline-item me-4">
                                                <p className="mb-2 fw-semibold"> Starts at &nbsp;
                                                    {basePricing.price} OMR for {basePricing.minimumDuration}&nbsp;
                                                    {basePricing.minimumDuration > 1 ? 'hours' : 'hour'}
                                                </p>
                                            </li>
                                        </ul>

                                        {/* Description , seatsAvailable , scheme , makeupBuffer */}
                                        <ul className="list-inline">

                                            <li className="list-inline-item me-4">
                                                <p className="mb-0">
                                                    {slot.slotDescription}
                                                </p>
                                            </li>

                                            <li className="list-inline-item me-4">
                                                <p className="mb-0">
                                                    {slot.seatsAvailable}
                                                </p>
                                            </li>

                                            <li className="list-inline-item me-4">
                                                <p className="mb-0">
                                                    {slot.scheme}
                                                </p>
                                            </li>

                                            <li className="list-inline-item me-4">
                                                <p className="mb-0">
                                                    {slot.makeupBuffer}
                                                </p>
                                            </li>
                                        </ul>

                                        {/* View Reservations button */}
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <Button variant="success" onClick={() => { handleViewReservationClick(slot.documentId) }}>View Reservations</Button>
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            )}
        </div>
    );
};

const Slots = () => {
    const { spaceId } = useParams();
    const [slots, setSlots] = useState<SlotsListWithId[]>([]);
    console.log("spaceId", spaceId);


    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    `https://us-central1-slot-145a8.cloudfunctions.net/getSlotsBySpaceId?spaceId=${spaceId}`
                );
                const result = await res.json();

                const slotsWithIds = result.slots.map((slot: SlotsList) => ({ ...slot, id: String(slot.documentId) }));

                setSlots(slotsWithIds);
                console.log("slotsWithIds: ", slotsWithIds);
            } catch (error) {
                console.log("error: ", error);
            }
        }

        fetchData();

        
    }, [spaceId]);


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
              <ViewSlots slots={slots}  />
        </>
    );
};

export default Slots;