import { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, ProgressBar, Tab, Nav, Dropdown, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Wizard, Steps, Step } from 'react-albus';
import '../../../assets/css/generalStyle.css'
import { usePageTitle } from '../../../hooks';
import Swal from 'sweetalert2';
import "../../../assets/css/generalStyle.css"

interface SubscriptionData {
    id: number;
    discount: number;
    basePrice: number;
    duration: number;
    finalPrice: number;
}

interface FeeValue {
    from: number;
    to: number;
    fee: number;
}

const Payment = () => {
    //active tab key 
    const [key, setKey] = useState<string | null>('fee');
    const [orderFeeForms, setOrderFeeForms] = useState([{ id: 1, from: '', to: '', fee: '' }]);
    const [basePrice, setBasePrice] = useState<number | null>(null);
    const [subscriptionDuration, setSubscriptionDuration] = useState<number | null>(6);
    const [discount, setDiscount] = useState<number | ''>(0);
    const [calculatedFinalPrice, setCalculatedPrice] = useState<number | null>(null);
    const [subscriptionData, setSubscriptionData] = useState<Array<
        {
            id: number;
            basePrice: number;
            discount: number;
            duration: number;
            finalPrice: number
        }>
    >([]);
    const [feeValues, setFeeValues] = useState<FeeValue[]>([]);
    const [subscriptionGetData, setSubscriptionGetData] = useState<SubscriptionData[]>([]);

    useEffect(() => {
        const fetchSubscriptionData = async () => {
            try {
                const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/getSubscriptionData');
                if (response.ok) {
                    const data = await response.json();
                    setSubscriptionGetData(data);
                } else {
                    console.error('Failed to fetch subscription data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching subscription data:', error);
            }
        };

        fetchSubscriptionData();
        fetchFeeValues();

    }, []);

    const handleSubscriptionEdit = (index: number, field: keyof SubscriptionData, value: number) => {
        const updatedSubscriptionData = [...subscriptionGetData];
        updatedSubscriptionData[index][field] = value;
        setSubscriptionGetData(updatedSubscriptionData);
    };


    const fetchFeeValues = async () => {
        try {
            const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/getOrderFee');
            if (response.ok) {
                const data = await response.json();
                setFeeValues(data.feeValues);
            } else {
                console.error('Error fetching fee values:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching fee values:', error);
        }
    };


    // Function to add a new order fee form
    const addOrderFeeForm = () => {
        setOrderFeeForms([...orderFeeForms, { id: orderFeeForms.length + 1, from: '', to: '', fee: '' }]);
    };

    const handleInputChange = (index: number, field: string, value: string) => {
        const updatedForms = [...orderFeeForms];
        (updatedForms[index] as any)[field] = value;
        setOrderFeeForms(updatedForms);
    };


    const addOrderFeeForms = async () => {

        if (orderFeeForms.some(form => form.from === '' || form.to === '' || form.fee === '')) {
            Swal.fire({
                icon: 'error',
                title: 'Can not Save',
                text: 'Please fill in all fields before saving the order fee.',
                customClass: {
                    confirmButton: 'custom-btn-danger'
                }
            });
            return;
        }

        for (const form of orderFeeForms) {
            for (const feeValue of feeValues) {
                if (feeValue.from === parseFloat(form.from) && feeValue.to === parseFloat(form.to)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Can not Save',
                        text: `The "From" value and "To" value should be unique`,
                        customClass: {
                            confirmButton: 'custom-btn-danger'
                        }
                    });
                    return;
                }

            }
        }


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
            setOrderFeeForms([{ id: 1, from: '', to: '', fee: '' }]);
            // Fetch fee values after saving the order fee
            await fetchFeeValues();
            Swal.fire({
                icon: 'success',
                title: 'Order Fee Added Successfully!',
                // text: 'Please fill in all fields before saving the order fee.',
                customClass: {
                    confirmButton: 'custom-btn-success'
                }
            });
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

    const calculateFinalPrice = (index: number) => {
        const subscription = subscriptionGetData[index];
        const parsedBasePrice = subscription.basePrice;
        const parsedDiscount = subscription.discount;
        const subscriptionDuration = subscription.duration;

        if (!parsedBasePrice || !parsedDiscount || !subscriptionDuration) {
            // Check if any of the required values are missing
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Missing Information',
            //     text: 'Please fill in all fields before calculating the final price.',
            //     customClass: {
            //         confirmButton: 'custom-btn-danger'
            //     }
            // });
            return;
        }

        const totalBeforeDiscount = parsedBasePrice * subscriptionDuration;
        const discountAmount = (totalBeforeDiscount * parsedDiscount) / 100;
        const finalPrice = totalBeforeDiscount - discountAmount;

        const updatedSubscriptionData = [...subscriptionGetData];
        updatedSubscriptionData[index].finalPrice = finalPrice;
        setSubscriptionGetData(updatedSubscriptionData);
    };

    // Function to calculate the final price
    const calculatePrice = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (subscriptionDuration !== null) {
            const parsedBasePrice = parseFloat(String(basePrice));
            const parsedDiscount = parseFloat(String(discount));

            if (isNaN(parsedBasePrice) || isNaN(parsedDiscount)) {
                alert('Please enter valid numbers for base price and discount percentage.');
                return;
            }

            const totalBeforeDiscount = parsedBasePrice * subscriptionDuration;
            const discountAmount = (totalBeforeDiscount * parsedDiscount) / 100;
            const finalPrice = totalBeforeDiscount - discountAmount;

            setCalculatedPrice(finalPrice);

            // // Add the calculated subscription data to the state
            setSubscriptionData([
                ...subscriptionData,
                {
                    id: subscriptionData.length + 1,
                    discount: parsedDiscount,
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
    console.log("subscriptionData: ",subscriptionData)

    const handleEditSubscription = async (index: any) => {
        try {
            const editedSubscription = { ...subscriptionGetData[index] };
            // Here you can implement the logic to edit the subscription data
            // For demonstration, let's assume we're updating the base price by adding 10 to it
            // editedSubscription.basePrice += 10;

            const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/updateSubscriptionData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    index: index,
                    subscription: editedSubscription,
                }),
            });

            if (response.ok) {
                // Update the state with the edited subscription data
                const updatedSubscriptionData = [...subscriptionGetData];
                updatedSubscriptionData[index] = editedSubscription;
                setSubscriptionGetData(updatedSubscriptionData);

                // Show success message
                Swal.fire({
                    title: 'Subscription Data',
                    text: `Subscription data updated successfully.`,
                    icon: 'success',
                    customClass: {
                        confirmButton: 'custom-btn-success'
                    }
                });
            } else {
                console.error('Failed to update subscription data:', response.statusText);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to update subscription data. Please try again later.',
                    icon: 'error',
                    customClass: {
                        confirmButton: 'custom-btn-danger'
                    }
                });
            }
        } catch (error) {
            console.error('Error updating subscription data:', error);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while updating subscription data. Please try again later.',
                icon: 'error',
                customClass: {
                    confirmButton: 'custom-btn-danger'
                }
            });
        }
    };




    // const saveSubscriptionData = async (subscriptionData: any) => {
    //     console.log('Subscription data to be saved:', subscriptionData);
    //     try {
    //         // Call the Cloud Function endpoint with the subscription data
    //         const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/addSubscription', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ subscription: subscriptionData }),
    //         });

    //         if (response.ok) {
    //             console.log('Subscription data saved successfully to Firebase.');
    //             await fetchFeeValues();
    //         } else {
    //             console.error('Error saving subscription data to Firebase:', response);
    //         }
    //     }
    //     catch (error) {
    //         console.error('Error saving subscription data to Firebase:', error);
    //     }
    // };


    // const handleClickSaveSubscription = async () => {
    //     if (!basePrice || !subscriptionDuration || !discount) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Missing Information',
    //             text: 'Please fill in all fields before saving the subscription data.',
    //             customClass: {
    //                 confirmButton: 'custom-btn-danger'
    //             }
    //         });
    //         return;
    //     }
    //     try {
    //         await saveSubscriptionData(subscriptionData);
    //         const newSubscription = {
    //             id: subscriptionData.length + 1,
    //             discount: parseFloat(String(discount)),
    //             basePrice: parseFloat(basePrice.toString()),
    //             duration: subscriptionDuration,
    //             finalPrice: calculatedFinalPrice !== null ? calculatedFinalPrice : 0,
    //         };

    //         // Clear the subscription data after saving
    //         setSubscriptionData([...subscriptionData, newSubscription]);
    //         setBasePrice(null);
    //         setSubscriptionDuration(null);
    //         setDiscount('');
    //         setCalculatedPrice(null);

    //         setSubscriptionGetData([...subscriptionGetData, newSubscription]);

    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Subscription Data Saved',
    //             text: 'Subscription data saved successfully.',
    //             customClass: {
    //                 confirmButton: 'custom-btn-success'
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Error saving subscription data:', error);
    //     }


    // };

    return (
        <Card className='payment-card' >
            <Card.Body className='payment-cardBody' >
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
                                        <span className="d-none d-sm-inline">Space Provider subscription</span>
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

                                                <hr className="hr" />

                                                {/* subscription data */}
                                                <div className="table-responsive">
                                                    <Table className="mb-0" striped>
                                                        <thead>
                                                            <tr>
                                                                <th>From</th>
                                                                <th>To</th>
                                                                <th>Fee</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {feeValues.map((feeValue, index) => (
                                                                <tr key={index}>
                                                                    <td>{feeValue.from}</td>
                                                                    <td>{feeValue.to}</td>
                                                                    <td>{feeValue.fee}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </>
                                        )}

                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey="subscription">
                                    <Form>
                                        <div className="table-responsive">
                                            <Table className="mb-0" striped>
                                                <thead>
                                                    <tr>
                                                        <th>Base Price</th>
                                                        <th>Duration</th>
                                                        <th>Discount Percentage</th>
                                                        <th>Final Price</th>
                                                        <th></th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {subscriptionGetData.map((subscription, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <input
                                                                    type="number"
                                                                    value={subscription.basePrice}
                                                                    onChange={(e) => {
                                                                        handleSubscriptionEdit(index, 'basePrice', parseFloat(e.target.value));
                                                                        calculateFinalPrice(index);
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="number"
                                                                    value={subscription.duration}
                                                                    onChange={(e) => {
                                                                        handleSubscriptionEdit(index, 'duration', parseInt(e.target.value));
                                                                        calculateFinalPrice(index);
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="number"
                                                                    value={subscription.discount}
                                                                    onChange={(e) => {
                                                                        handleSubscriptionEdit(index, 'discount', parseInt(e.target.value));
                                                                        calculateFinalPrice(index);
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="number"
                                                                    value={subscription.finalPrice}
                                                                    onChange={(e) => handleSubscriptionEdit(index, 'finalPrice', parseFloat(e.target.value))}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="outline-success"
                                                                    className='payment-saveButton'
                                                                    onClick={() => handleEditSubscription(index)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                        {/* <div className="text-end mt-3">

                                        </div> */}
                                    </Form>
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
