import { useState } from 'react';
import { Button, Card, Col, Modal, Row, Dropdown } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// hooks
import { usePageTitle } from '../../../hooks';
// component
import { VerticalForm, FormInput } from '../../../components/form';
import DelegateUsers from '../../dashboards/DashBoard1/DelegateUsers';

const List = () => {
    // set pagetitle
    usePageTitle({
        title: 'Contacts List',
        breadCrumbItems: [
            {
                path: '/apps/contacts/list',
                label: 'Contacts',
            },
            {
                path: '/apps/contacts/list',
                label: 'Contacts List',
                active: true,
            },
        ],
    });

    const [modal, setModal] = useState<boolean>(false);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');

    // Show/hide the modal
    const toggle = () => {
        setModal(!modal);
    };

    type SelectCallback = (eventKey: string | null, event: Object) => void;

    const handleSelect: SelectCallback = (eventKey, event) => {
        if (typeof eventKey === 'string') {
            setSelectedRole(eventKey);
        } else {
            setSelectedRole(null);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/updateUserRole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    newRole: selectedRole
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update user role');
            }

            toggle();
            window.location.reload();
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="justify-content-center">
                                <Col md={12}>
                                    <div className="mt-3 mt-md-0">
                                        <Button variant="success" className="waves-effect waves-light" onClick={toggle}>
                                            <i className="mdi mdi-plus-circle me-1"></i>
                                            Delegate Users
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl={4} md={6} >
                    <DelegateUsers />
                </Col>
            </Row>
            <Modal show={modal} onHide={toggle} centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">Delegate User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <FormInput
                            label={'Email address'}
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            containerClass={'mb-3'}
                        />

                        <div className='mb-2'>
                            <label>User Role</label>

                        </div>

                        <div className='mb-3'>
                            <Dropdown
                                style={{ border: '2px solid #d3d3d3', borderRadius: '5px' }}
                                onSelect={handleSelect}
                            >
                                <Dropdown.Toggle
                                    variant="none"
                                    id="userRoleDropdown"
                                >
                                    {selectedRole !== null ? selectedRole : 'Select Role'} <i className="mdi mdi-chevron-down"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Sales Admin">Sales Admin</Dropdown.Item>
                                    <Dropdown.Item eventKey="Sales Staff">Sales Staff</Dropdown.Item>
                                    <Dropdown.Item eventKey="Technical Admin">Technical Admin</Dropdown.Item>
                                    <Dropdown.Item eventKey="Technical Staff">Technical Staff</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <Button variant="light" className="waves-effect waves-light me-1" type="submit"  onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button variant="danger" className="waves-effect waves-light" onClick={toggle}>
                            Cancel
                        </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};
export default List;