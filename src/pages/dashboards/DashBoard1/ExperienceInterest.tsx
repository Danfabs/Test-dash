import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa'; // Import plus icon from react-icons library
import Swal from 'sweetalert2';
import '../../../assets/css/generalStyle.css';

const ExperienceInterest = () => {
    const { t } = useTranslation();
    const [experienceInterests, setExperienceInterests] = useState(['']);
    const [experienceInterestData, setExperienceInterestData] = useState<string[]>([]);


    useEffect(() => {
        // Fetch interests data when the component mounts
        const fetchExperienceInterestData = async () => {
            try {
                const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/getExperienceInterest');
                if (response.ok) {
                    const data = await response.json();
                    setExperienceInterestData(data);
                    console.log("Experience Interest Data: ",experienceInterestData)
                } else {
                    console.error('Failed to fetch experience Interest data:', response);
                }
            } catch (error) {
                console.error('Error fetching experience Interest data:', error);
            }
        };

        fetchExperienceInterestData(); // Call the function
    }, []);

    const handleAddExperienceInterestField = () => {
        setExperienceInterests([...experienceInterests, '']);
    };

    const handleExperienceInterestChange = (index: number, value: string) => {
        const updatedExperienceInterests = [...experienceInterests];
        updatedExperienceInterests[index] = value;
        setExperienceInterests(updatedExperienceInterests);
    };

    const saveSkillsInterestsData = async (experienceInterests: string[]) => {
        try {
            // Call the Cloud Function endpoint to fetch existing interests data from Firebase
            const existingSExperienceInterestResponse = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/getExperienceInterest');
            const existingExperienceInterestData = await existingSExperienceInterestResponse.json();

            // Check if the new interest already exists in Firebase
            const duplicateExperienceInterest = experienceInterests.find(experienceInterests => existingExperienceInterestData.includes(experienceInterests));
            if (duplicateExperienceInterest) {
                // Show a Swal alert indicating that the input value is a duplicate
                Swal.fire({
                    icon: 'error',
                    title: 'Duplicate Skills Interest',
                    text: `The experience Interests "${duplicateExperienceInterest}" already exists in the list.`,
                    customClass: {
                        confirmButton: 'custom-btn-danger'
                    }
                });
                return; 
            }

            // If it's not a duplicate, proceed to add the interest to Firebase
            const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/addExperienceInterest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ experienceInterests }),
            });

            if (response.ok) {
                console.log('Experience interest data saved successfully to Firebase.');
                Swal.fire({
                    icon: 'success',
                    title: 'Saved Successfully',
                    text: 'Experience interest Data Saved Successfully',
                    customClass: {
                        confirmButton: 'custom-btn-success'
                    }
                });

                // Fetch the updated interests data
                const updatedInterestsResponse = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/getExperienceInterest');
                if (updatedInterestsResponse.ok) {
                    const updatedExperienceInterestData = await updatedInterestsResponse.json();
                    setExperienceInterestData(updatedExperienceInterestData); // Update the interestsData state
                } else {
                    console.error('Failed to fetch updated Experience interest data:', updatedInterestsResponse);
                }

                // Clear the interests array
                setExperienceInterests(['']);

            } else {
                console.error('Error saving Experience interest data to Firebase:', response);
            }
        }
        catch (error) {
            console.error('Error saving Experience interest data to Firebase:', error);
        }
    };

    const handleAddExperienceInterest = () => {
        saveSkillsInterestsData(experienceInterests);
        console.log('skills Interest:', experienceInterests);
    };

    return (
        <div>
            <Card>
                <Card.Body >
                    <div dir="ltr" className='card-div'>
                        <h4 className="header-title mb-4 payment-cardBody">{t('Add Experience Interest')}</h4>
                        <Form>
                            {experienceInterests.map((experienceInterest, index) => (
                                <Form.Group as={Row} className="mb-3" key={index}>
                                    <Form.Label htmlFor={`experienceInterest${index}`} column md={3}>
                                        {t('Experience Interest')}
                                    </Form.Label>
                                    <Col md={4}>
                                        <Form.Control
                                            type="text"
                                            name={`experienceInterest${index}`}
                                            id={`experienceInterest${index}`}
                                            // placeholder="Table, Room, Tour, ..."
                                            value={experienceInterest}
                                            onChange={(e) => handleExperienceInterestChange(index, e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                            ))}
                            <Col md={1}>
                                <Button
                                    variant="outline-success"
                                    className='add-interest-button'
                                    onClick={handleAddExperienceInterestField}
                                >
                                    <FaPlus />
                                </Button>
                            </Col>
                            <div className="text-end mt-3">
                                <Button
                                    variant="success"
                                    className='add-interest-button'
                                onClick={handleAddExperienceInterest}
                                >
                                    {t('Add Experience Interests')}
                                </Button>
                            </div>
                        </Form>
                        <div className="table-responsive">
                            <Table className="mb-0" striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{t('Experience Interests')}</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {experienceInterestData.map((experienceInterest, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{experienceInterest}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ExperienceInterest;