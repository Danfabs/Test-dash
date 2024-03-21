import { useState } from 'react';
import { Row, Col, Card, Form, Button, ProgressBar, Tab, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Wizard, Steps, Step } from 'react-albus';
import '../../../assets/css/generalStyle.css'
// hooks
import { usePageTitle } from '../../../hooks';
import '../../../assets/css/generalStyle.css'
import Swal from 'sweetalert2';
import "../../../assets/css/generalStyle.css"

const Discount = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');


    const handleDiscount = async () => {
        try {
            const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/createCustomDiscount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phoneNumber: phoneNumber,
                    discountValue: parseFloat(discountPercentage)
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add discount');
            }

            const data = await response.json();
            console.log(data);
            setPhoneNumber('');
            setDiscountPercentage('');

            Swal.fire({
                icon: 'success',
                title: 'Discount Added Successfully!',
                text: `Discount has been added successfully to ${phoneNumber} .`,
                customClass: {
                    confirmButton: 'btn-success'
                }
            });

        } catch (error) {
            console.error('Error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Failed to Add Discount',
                text: 'An error occurred while adding the discount. Please try again later or check the phone number',
                customClass: {
                    confirmButton: 'btn-danger' // Add custom CSS class to the confirm button
                }
            });
        }
    };


    return (
        <Card className='payment-card'>
            <Card.Body className='payment-cardBody'>
                <h4 className="header-title mb-4">Discount</h4>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="fname2" column md={3}>
                            Enter phone number to get discount
                        </Form.Label>
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                name="phoneNo"
                                id="phoneNo"
                                placeholder="phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="lname2" column md={3}>
                            How many discount (%)
                        </Form.Label>
                        <Col md={4}>
                            <Form.Control
                                type="number"
                                name="discount"
                                id="discount"
                                placeholder="discount (%)"
                                value={discountPercentage}
                                onChange={(e) => setDiscountPercentage(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Button
                        variant="outline-success"
                        className='payment-saveButton'
                        onClick={handleDiscount}
                    >
                        Give Discount
                    </Button>
                </Form>

            </Card.Body>
        </Card >
    );
};




const FormDiscount = () => {
    // set pagetitle
    usePageTitle({
        title: 'discount',
        breadCrumbItems: [
            {
                path: '/apps/discount',
                label: 'Forms',
            },
            {
                path: '/apps/discount',
                label: 'discount',
                active: true,
            },
        ],
    });

    return (
        <>
            <Row>
                <Col xl={8}>
                    <Discount />
                </Col>
            </Row>
        </>
    );
};

export default FormDiscount;
