import React, { useState } from 'react';
import { Row, Col, Card, Form, Button} from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa'; // Import plus icon from react-icons library

import '../../../assets/css/generalStyle.css';

const Interests = () => {
    const [interests, setInterests] = useState(['']);

    const handleAddInterestField = () => {
        setInterests([...interests, '']);
    };

    const handleInterestChange = (index: number, value: string) => {
        const updatedInterests = [...interests];
        updatedInterests[index] = value;
        setInterests(updatedInterests);
    };

    const handleAddInterest = () => {
        // Do something with interests array, like sending it to backend
        console.log('Interests:', interests);
    };

    return (
        <div>
            <Card>
                <Card.Body >
                    <div dir="ltr" className='card-div'>
                        <h4 className="header-title mb-4 payment-cardBody">Add Spaces Interests</h4>
                        <Form>
                            {interests.map((interest, index) => (
                                <Form.Group as={Row} className="mb-3" key={index}>
                                    <Form.Label htmlFor={`interest${index}`} column md={3}>
                                        Interest Name
                                    </Form.Label>
                                    <Col md={4}>
                                        <Form.Control
                                            type="text"
                                            name={`interest${index}`}
                                            id={`interest${index}`}
                                            placeholder="Table, Room, Tour, ..."
                                            value={interest}
                                            onChange={(e) => handleInterestChange(index, e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                            ))}
                            <Col md={1}>
                            <Button
                                variant="outline-success"
                                className='add-interest-button'
                                onClick={handleAddInterestField}
                            >
                                <FaPlus /> 
                            </Button>
                            </Col>
                            <div className="text-end mt-3">
                            <Button
                                variant="success"
                                className='add-interest-button'
                                onClick={handleAddInterest}
                            >
                                Add Interests
                            </Button>
                            </div>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Interests;