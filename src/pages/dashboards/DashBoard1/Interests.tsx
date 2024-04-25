import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa'; // Import plus icon from react-icons library
import Swal from 'sweetalert2';
import '../../../assets/css/generalStyle.css';
import SkillsInterest from './SkillsInterest';
import ExperienceInterest from './ExperienceInterest';

const Interests = () => {
    const [interests, setInterests] = useState(['']);
    const [interestsData, setInterestsData] = useState<string[]>([]);


    useEffect(() => {
        // Fetch interests data when the component mounts
        const fetchInterestsData = async () => {
            try {
                const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/getInterests');
                if (response.ok) {
                    const data = await response.json();
                    setInterestsData(data);
                } else {
                    console.error('Failed to fetch interests data:', response);
                }
            } catch (error) {
                console.error('Error fetching interests data:', error);
            }
        };

        fetchInterestsData(); // Call the function
    }, []);

    const handleAddInterestField = () => {
        setInterests([...interests, '']);
    };

    const handleInterestChange = (index: number, value: string) => {
        const updatedInterests = [...interests];
        updatedInterests[index] = value;
        setInterests(updatedInterests);
    };

    const saveInterestsData = async (interests: string[]) => {
        try {
            // Call the Cloud Function endpoint to fetch existing interests data from Firebase
            const existingInterestsResponse = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/getInterests');
            const existingInterestsData = await existingInterestsResponse.json();

            // Check if the new interest already exists in Firebase
            const duplicateInterest = interests.find(interest => existingInterestsData.includes(interest));
            if (duplicateInterest) {
                // Show a Swal alert indicating that the input value is a duplicate
                Swal.fire({
                    icon: 'error',
                    title: 'Duplicate Interest',
                    text: `The interest "${duplicateInterest}" already exists in the list.`,
                    customClass: {
                        confirmButton: 'custom-btn-danger'
                    }
                });
                return; // Exit the function early if it's a duplicate
            }

            // If it's not a duplicate, proceed to add the interest to Firebase
            const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/addInterests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ interests }),
            });

            if (response.ok) {
                console.log('Interests data saved successfully to Firebase.');
                Swal.fire({
                    icon: 'success',
                    title: 'Saved Successfully',
                    text: 'Interests data saved successfully',
                    customClass: {
                        confirmButton: 'custom-btn-success'
                    }
                });

                // Fetch the updated interests data
                const updatedInterestsResponse = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/getInterests');
                if (updatedInterestsResponse.ok) {
                    const updatedInterestsData = await updatedInterestsResponse.json();
                    setInterestsData(updatedInterestsData); // Update the interestsData state
                } else {
                    console.error('Failed to fetch updated interests data:', updatedInterestsResponse);
                }

                // Clear the interests array
                setInterests(['']);

            } else {
                console.error('Error saving interests data to Firebase:', response);
            }
        }
        catch (error) {
            console.error('Error saving interests data to Firebase:', error);
        }
    };

    const handleAddInterest = () => {
        saveInterestsData(interests);
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
                                    Add Space Interests
                                </Button>
                            </div>
                        </Form>
                        <div className="table-responsive">
                            <Table className="mb-0" striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Space Interests</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {interestsData.map((interest, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{interest}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <div>
            <SkillsInterest/>
            </div>

            <div>
            <ExperienceInterest/>
            </div>
            
        </div>
    );
};

export default Interests;