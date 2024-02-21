import { useState } from 'react';
import { Row, Col, Card, Form, Button, ProgressBar, Tab, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Wizard, Steps, Step } from 'react-albus';
import '../../../assets/css/generalStyle.css'
// hooks
import { usePageTitle } from '../../../hooks';


const Payment = () => {
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
        // const resultMessage = `
        //   Base Price: $${parsedBasePrice.toFixed(2)} 
        //   Subscription Duration: ${subscriptionDuration} Months 
        //   Total Price (Before Discount): $${totalBeforeDiscount.toFixed(2)} 
        //   Discount Percentage: ${parsedDiscountPercentage}% 
        //   Discount Amount: $${discountAmount.toFixed(2)} 
        //   Final Price: $${finalPrice.toFixed(2)}
        // `;

        // alert(resultMessage);
    };


    return (
        <Card className='payment-card'>
            <Card.Body className='payment-cardBody'>
                <h4 className="header-title mb-3">Payment</h4>

                <Wizard>
                    <Steps>
                        <Tab.Container
                            id="left-tabs-example"
                            defaultActiveKey="fee"
                            activeKey={key ? key : 'fee'}
                            onSelect={(k) => setKey(k)}
                        >
                            <Nav variant="tabs" as="ul" className="nav-justified bg-light form-wizard-header mb-4">
                                <Nav.Item as="li">
                                    <Nav.Link
                                        as={Link}
                                        to="#"
                                        eventKey="fee"
                                        className="rounded-0 pt-2 pb-2">
                                        <span className="d-none d-sm-inline">Order Fee</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link as={Link} to="#" eventKey="subscription" className="rounded-0 pt-2 pb-2">
                                        <span className="d-none d-sm-inline">Space privider subscription</span>
                                    </Nav.Link>
                                </Nav.Item>

                            </Nav>
                            <Tab.Content className="pb-0 mb-0 pt-0">
                                <Tab.Pane eventKey="fee">
                                    <Step
                                        id="fee"
                                        render={({ }) => (
                                            <> 
                                                
                                                {orderFeeForms.map((form, index) => (
                                                    <Form>
                                                        <Form.Group as={Row} className="mb-3">
                                                        <Form.Label
                                                        htmlFor="minOrder"
                                                        column md={2}>
                                                        Min Order:
                                                    </Form.Label>
                                                            <Form.Label
                                                                htmlFor="minOrder"
                                                                column md={1}>
                                                                From
                                                            </Form.Label>
                                                            <Col md={2}>
                                                                <Form.Control
                                                                    type="number"
                                                                    name="fee"
                                                                    id="fee"
                                                                    defaultValue="%"
                                                                />
                                                            </Col>

                                                            <Form.Label column md={1}>
                                                                To
                                                            </Form.Label>

                                                            <Col md={2}>
                                                                <Form.Control
                                                                    type="number"
                                                                    name="fee"
                                                                    id="fee"
                                                                    defaultValue="%"
                                                                />
                                                            </Col>

                                                            <Form.Label htmlFor="fee" column sm={1}>
                                                                Fee (%)
                                                            </Form.Label>

                                                            <Col md={2}>
                                                                <Form.Control
                                                                    type="number"
                                                                    name="fee"
                                                                    id="fee"
                                                                    defaultValue="%"
                                                                />
                                                            </Col>

                                                        </Form.Group>

                                                    </Form>
                                                ))}
                                                <Col md={1}>
                                                    <Button
                                                        variant="outline-success"
                                                        className='payment-add-fee'
                                                        onClick={addOrderFeeForm}
                                                    >
                                                        <i className="mdi mdi-plus"></i>
                                                    </Button>
                                                </Col>

                                                <div className="text-end mt-3">
                                                    <Button variant="outline-success" className='payment-saveButton'>
                                                        Save Order Fee
                                                    </Button>
                                                </div>
                                            </>
                                        )}

                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey="subscription">
                                    <Step
                                        id="subscription"
                                        render={({ }) => (
                                            <Form>
                                                <Form.Group as={Row} className="mb-3">
                                                    <Form.Label
                                                        htmlFor="basePrice"
                                                        column md={4}>
                                                        Enter Base Price
                                                    </Form.Label>
                                                    <Col md={2}>
                                                        <Form.Control
                                                            type="number"
                                                            name="basePrice"
                                                            id="basePrice"
                                                            placeholder="base price"
                                                            value={basePrice}
                                                            onChange={(e) => setBasePrice(parseFloat(e.target.value))}
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3">
                                                    <Form.Label
                                                        htmlFor="subscriptionDuration"
                                                        column md={4}>
                                                        Choose Subscription Duration
                                                    </Form.Label>
                                                    <Col md={2}>
                                                        <Dropdown
                                                            style={{ border: '2px solid #d3d3d3', borderRadius: '5px' }}
                                                            onSelect={handleSelect}
                                                        >
                                                            <Dropdown.Toggle
                                                                variant="none"
                                                                id="subscriptionDuration"
                                                            > {subscriptionDuration !== null ? `${subscriptionDuration} Months` : 'Duration'}  <i className="mdi mdi-chevron-down"></i>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item eventKey="6">6 Months</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="12">12 Months</Dropdown.Item>
                                                                </Dropdown.Menu>

                                                            </Dropdown.Toggle>
                                                        </Dropdown>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3">
                                                    <Form.Label
                                                        htmlFor="discountPercentage"
                                                        column md={4}>
                                                        Enter Discount Percentage
                                                    </Form.Label>
                                                    <Col md={2}>
                                                        <Form.Control
                                                            type="number"
                                                            name="discountPercentage"
                                                            id="discountPercentage"
                                                            placeholder="Percentage"
                                                            value={discountPercentage}
                                                            onChange={(e) => setDiscountPercentage(parseInt(e.target.value))}
                                                        />
                                                    </Col>
                                                    <Button
                                                        variant="outline-success"
                                                        className='payment-saveButton'
                                                        onClick={(e) => calculatePrice(e)}
                                                    >
                                                        Calculate Price</Button>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3">
                                                    <Form.Label htmlFor="lname2" column md={4}>
                                                        Final Price
                                                    </Form.Label>
                                                    <Col md={2}>
                                                        <Form.Label htmlFor="lname2" >
                                                            {calculatedFinalPrice} OMR
                                                        </Form.Label>
                                                    </Col>
                                                </Form.Group>

                                                <Button
                                                    variant="outline-success"
                                                    className='payment-saveButton' >
                                                    Save</Button>

                                                {/* <div className="clearfix"></div> */}
                                            </Form>
                                        )}
                                    />
                                </Tab.Pane>

                            </Tab.Content>
                        </Tab.Container>
                    </Steps>
                </Wizard>
            </Card.Body>
        </Card >
    );
};




const FormPayment = () => {
    // set pagetitle
    usePageTitle({
        title: 'Payment',
        breadCrumbItems: [
            {
                path: '/apps/payment',
                label: 'Forms',
            },
            {
                path: '/apps/payment',
                label: 'Payment',
                active: true,
            },
        ],
    });

    return (
        <>
            <Row>
                <Col xl={8}>
            <Payment />
            </Col>
            </Row>
        </>
    );
};

export default FormPayment;
