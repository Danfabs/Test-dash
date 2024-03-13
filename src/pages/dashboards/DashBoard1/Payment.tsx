import { useState } from 'react';
import { Row, Col, Card, Form, Button, ProgressBar, Tab, Nav, Dropdown, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Wizard, Steps, Step } from 'react-albus';
import '../../../assets/css/generalStyle.css'
// hooks
import { usePageTitle } from '../../../hooks';
import axios from 'axios';


const Payment = () => {
    //active tab key 
    const [key, setKey] = useState<string | null>('fee');
    const [orderFeeForms, setOrderFeeForms] = useState([{ id: 1 , from: '', to : '' , fee : ''}]);
    const [basePrice, setBasePrice] = useState<number | ''>('');
    const [subscriptionDuration, setSubscriptionDuration] = useState<number | null>(6);
    const [discountPercentage, setDiscountPercentage] = useState<number | ''>('');
    const [calculatedFinalPrice, setCalculatedPrice] = useState<number | null>(null);
    const [subscriptionData, setSubscriptionData] = useState<Array<
    { id: number; 
        basePrice: number;  
        discountPercentage: number;
        duration: number; 
        finalPrice: number }>
        >([]);


    // Function to add a new order fee form
    const addOrderFeeForm = () => {
        setOrderFeeForms([...orderFeeForms, { id: orderFeeForms.length + 1 ,  from: '', to: '', fee: ''  }]);
    };

    const handleInputChange = (index: number, field: string, value: string) => {
        const updatedForms = [...orderFeeForms];
        (updatedForms[index] as any)[field] = value;
        setOrderFeeForms(updatedForms);
    };
    

    const addOrderFeeForms = async () => {
        const parsedOrderFeeForms = orderFeeForms.map(form => ({
            id: form.id,
            from: parseFloat(form.from),
            to: parseFloat(form.to),
            fee: parseFloat(form.fee),
        }));

        try {
            const result = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/saveOrderFee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    value: parsedOrderFeeForms,
                }),
            }).then(response => response.json());
    
            console.log('Value added to payment successfully:', result);
        } catch (error) {
            console.error('An error occurred while adding value to payment:', error);
        }
      };

    
    // Function to handle subscription duration selection
    const handleSelect = (eventKey: string | null) => {
        setSubscriptionDuration((prevDuration) => (
            eventKey !== null ? parseInt(eventKey) : null
        ));
    };

    // Function to calculate the final price
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
    
            setCalculatedPrice(finalPrice);
    
            // Add the calculated subscription data to the state
            setSubscriptionData([
                ...subscriptionData,
                {
                    id: subscriptionData.length + 1,
                    discountPercentage :parsedDiscountPercentage,
                    basePrice: parsedBasePrice,
                    duration: subscriptionDuration,
                    finalPrice: finalPrice,
                },
            ]);
        } else {
            // Handle the case when subscriptionDuration is null
            alert('Please select a subscription duration.');
        }
    };



    const saveSubscriptionData = async (subscriptionData: any) => {
        try {
          // Call the Cloud Function endpoint with the subscription data
          const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/addSubscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subscription: subscriptionData }),
          });
      
          if (response.ok) {
            console.log('Subscription data saved successfully to Firebase.');
          } else {
            console.error('Error saving subscription data to Firebase:', response);
          }
        } catch (error) {
          console.error('Error saving subscription data to Firebase:', error);
        }
      };
        

      const handleClickSaveSubscription = () => {
        saveSubscriptionData(subscriptionData);
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
                                                                    value={form.from}
                                                                    onChange={(e) => handleInputChange(index, 'from', e.target.value)}
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
                                                                    value={form.to}
                                                                    onChange={(e) => handleInputChange(index, 'to', e.target.value)}
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
                                                                    value={form.fee}
                                                                    onChange={(e) => handleInputChange(index, 'fee', e.target.value)}
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
                                                    <Button variant="outline-success" className='payment-saveButton'
                                                    onClick={addOrderFeeForms}
                                                    >
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
                                                    <Col xs={12} md={3}>
                                                        <Button
                                                            variant="outline-success"
                                                            className='payment-saveButton '
                                                            onClick={(e) => calculatePrice(e)}
                                                        >
                                                            Calculate Price</Button>
                                                    </Col>

                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3">
                                                    <Form.Label htmlFor="lname2" column md={4}>
                                                        Final Price
                                                    </Form.Label>
                                                    <Col md={2}>
                                                        <Form.Label >
                                                            {calculatedFinalPrice} OMR
                                                        </Form.Label>
                                                    </Col>
                                                </Form.Group>
                                                <div className="text-end mt-3">
                                                    <Button
                                                        variant="outline-success"
                                                        className='payment-saveButton' 
                                                        onClick={handleClickSaveSubscription}
                                                        >
                                                        Save</Button>
                                                </div>


                                                <hr className="hr" />

                                                {/* subscription data */}
                                                <div className="table-responsive">
                                                    <Table className="mb-0" striped>
                                                        <thead>
                                                            <tr>
                                                                <th>id</th>
                                                                <th>Base Price</th>
                                                                <th>Subscription Duration</th>
                                                                <th>Final Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr >
                                                                <th scope="row">1</th>
                                                                <td>20.22</td>
                                                                <td>6</td>
                                                                <td>135</td>
                                                            </tr>
                                                            <tr >
                                                                <th scope="row">1</th>
                                                                <td>30.22</td>
                                                                <td>12</td>
                                                                <td>135</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
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
