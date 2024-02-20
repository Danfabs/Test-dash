import { useState } from 'react';
import { Row, Col, Card, Form, Button, ProgressBar, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Wizard, Steps, Step } from 'react-albus';
import '../../../assets/css/generalStyle.css'
// hooks
import { usePageTitle } from '../../../hooks';


const Payment = () => {
    //active tab key 
    const [key, setKey] = useState<string | null>('fee');
    const [orderFeeForms, setOrderFeeForms] = useState([{ id: 1 }]);

    const addOrderFeeForm = () => {
        setOrderFeeForms([...orderFeeForms, { id: orderFeeForms.length + 1 }]);
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
                                        <i className="mdi mdi-percent-outline me-1"></i>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link as={Link} to="#" eventKey="discount" className="rounded-0 pt-2 pb-2">
                                        <i className="mdi mdi-brightness-percent me-1"></i>
                                        <span className="d-none d-sm-inline">Discount</span>
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
                                                            <Form.Label htmlFor="uname2" column md={2}>
                                                                Min Order
                                                            </Form.Label>

                                                            <Col md={2}>
                                                                <Form.Control
                                                                    type="number"
                                                                    name="fee"
                                                                    id="fee"
                                                                    defaultValue="%"
                                                                />
                                                            </Col>

                                                            <Form.Label htmlFor="uname2" column sm={2}>
                                                                -
                                                            </Form.Label>

                                                            <Col md={2}>
                                                                <Form.Control
                                                                    type="number"
                                                                    name="fee"
                                                                    id="fee"
                                                                    defaultValue="%"
                                                                />
                                                            </Col>

                                                            <Form.Label htmlFor="uname2" column sm={2}>
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
                                                <Col sm={2}>
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
                                <Tab.Pane eventKey="discount">
                                    <Step
                                        id="discount"
                                        render={({ }) => (
                                            <Form>
                                                <Form.Group as={Row} className="mb-3">
                                                    <Form.Label htmlFor="fname2" column md={3}>
                                                        Enter number to get discount
                                                    </Form.Label>
                                                    <Col md={9}>
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
                                                    <Col md={9}>
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
        </Card>
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
            {/* <Row>
                <Col xl={8}> */}
            <Payment />
            {/* </Col>
            </Row> */}
        </>
    );
};

export default FormPayment;
