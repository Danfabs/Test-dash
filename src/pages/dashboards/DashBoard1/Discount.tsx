import { useState } from 'react';
import { Row, Col, Card, Form, Button, ProgressBar, Tab, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Wizard, Steps, Step } from 'react-albus';
import '../../../assets/css/generalStyle.css'
// hooks
import { usePageTitle } from '../../../hooks';
import '../../../assets/css/generalStyle.css'


const Discount = () => {
    //active tab key 
    const [key, setKey] = useState<string | null>('fee');
    const [orderFeeForms, setOrderFeeForms] = useState([{ id: 1 }]);

    const [basePrice, setBasePrice] = useState<number | ''>('');
    const [subscriptionDuration, setSubscriptionDuration] = useState<number | null>(6);
    const [discountPercentage, setDiscountPercentage] = useState<number | ''>('');
    const [calculatedFinalPrice, setCalculatedPrice] = useState<number | null>(null);

    const addOrderFeeForm = () => {
        setOrderFeeForms([...orderFeeForms, { id: orderFeeForms.length + 1 }]);
    };

    const handleSelect = (eventKey: string | null) => {
        setSubscriptionDuration((prevDuration) => (
            eventKey !== null ? parseInt(eventKey) : null
        ));
    };

    const calculatePrice = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (subscriptionDuration !== null) {
            const parsedBasePrice = parseFloat(String(basePrice));
            const parsedDiscountPercentage = parseFloat(String(discountPercentage));

            if (isNaN(parsedBasePrice) || isNaN(parsedDiscountPercentage)) {
                alert('Please enter valid numbers for base price and discount percentage.');
                return;
            }

            const totalBeforeDiscount = parsedBasePrice * subscriptionDuration;
            const discountAmount = (totalBeforeDiscount * parsedDiscountPercentage) / 100;
            const finalPrice = totalBeforeDiscount - discountAmount;

            console.log("base price: ", parsedBasePrice);
            console.log("discount : ", parsedDiscountPercentage);
            console.log("totalBeforeDiscount : ", totalBeforeDiscount);
            console.log("totalAfterDiscount : ", discountAmount);
            console.log("finalPrice : ", finalPrice);

            setCalculatedPrice(finalPrice);
        } else {
            // Handle the case when subscriptionDuration is null
            alert('Please select a subscription duration.');
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
                            />
                        </Col>
                    </Form.Group>
                    <Button
                        variant="outline-success"
                        className='payment-saveButton' >
                        Give Discount</Button>
                    {/* <div className="clearfix"></div> */}
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
