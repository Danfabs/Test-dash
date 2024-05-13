import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Button, Card, Col, Modal, Row, Dropdown, Table } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// hooks
import { usePageTitle } from '../../../hooks';
// component
import { VerticalForm, FormInput } from '../../../components/form';
import DelegateUsers from '../../dashboards/DashBoard1/DelegateUsers';
import { projectFirestore } from '../../../firebase';
import Swal from 'sweetalert2';
import "../../../assets/css/generalStyle.css"
import { Link } from 'react-router-dom';

interface RoleState {
    [role: string]: {
        [permission: string]: boolean;
    };
}

const initialRoleState: RoleState = {
    'Sales Admin': {
        'View TT': false,
        'Manage TT': false,
        'Delegate Users': false,
    },
    'Sales Staff': {
        'View TT': false,
        'Manage TT': false,
        'Delegate Users': false,
    },
    'Technical Admin': {
        'View TT': false,
        'Manage TT': false,
        'Delegate Users': false,
    },
    'Technical Staff': {
        'View TT': false,
        'Manage TT': false,
        'Delegate Users': false,
    },
};



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
    const [addRolesModal, setAddRolesModal] = useState<boolean>(false);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [roleState, setRoleState] = useState<RoleState>(initialRoleState);
    const { t } = useTranslation();

    useEffect(() => {
        const savedState = localStorage.getItem('roleState');
        if (savedState) {
            setRoleState(JSON.parse(savedState));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('roleState', JSON.stringify(roleState));
    }, [roleState]);

    // Show/hide the modal
    const toggle = () => {
        setModal(!modal);
    };

    const addRolestoggle = () => {
        setAddRolesModal(!addRolesModal);
    };

    const handleCheckboxChange = (role: string, permission: string) => {
        setRoleState(prevState => ({
            ...prevState,
            [role]: {
                ...prevState[role],
                [permission]: !prevState[role][permission],
            },
        }));
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


    const handleSubmitRole = async () => {
        try {
            for (const role of Object.keys(roleState)) {
                const permissions = roleState[role];
                const userRef = projectFirestore.collection('slot3_users').where('role', '==', role);
                const snapshot = await userRef.get();
        
                snapshot.forEach(doc => {
                    const userId = doc.id;
                    const userDocRef = projectFirestore.collection('slot3_users').doc(userId);
        
                    userDocRef.update({
                        permissions: {
                            'View TT': permissions['View TT'],
                            'Manage TT': permissions['Manage TT'],
                            'Delegate Users': permissions['Delegate Users'],
                        },
                    });
                });
            }

            setRoleState(initialRoleState);
        
            Swal.fire({
                icon: 'success',
                title: 'Permissions updated successfully',
                customClass: {
                    confirmButton: 'custom-btn-success'
                }
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error updating permissions:', error);
        
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while updating permissions. Please try again later.',
                customClass: {
                    confirmButton: 'custom-btn-danger'
                }
            });
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
                                            {t('Delegate Users')}
                                        </Button>
                                    </div>

                                    <div className="mt-4 mt-md-2">
                                        <Button variant="success" className="waves-effect waves-light" onClick={addRolestoggle}>
                                            <i className="mdi mdi-plus-circle me-1"></i>
                                            {t('Add Roles')}
                                        </Button>
                                    </div>

                                    <div className="mt-4 mt-md-2">
                                        <Button variant="success" className="waves-effect waves-light" >
                                            <i className="mdi mdi-plus-circle me-1"></i>
                                            <Link to="/apps/register" className="text-decoration-none text-white">
                                            {t('Add User')}
                                            </Link>
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
                    <Modal.Title as="h4">{t('Delegate User')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInput
                        label={t('Email address')}
                        type="email"
                        name="email"
                        placeholder={t('Enter email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        containerClass={'mb-3'}
                    />

                    <div className='mb-2'>
                        <label>{t('User Role')}</label>

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
                                {selectedRole !== null ? selectedRole : t('Select Role')} <i className="mdi mdi-chevron-down"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Sales Admin">{t('Sales Admin')}</Dropdown.Item>
                                <Dropdown.Item eventKey="Sales Staff">{t('Sales Staff')}</Dropdown.Item>
                                <Dropdown.Item eventKey="Technical Admin">{t('Technical Admin')}</Dropdown.Item>
                                <Dropdown.Item eventKey="Technical Staff">{t('Technical Staff')}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <Button variant="light" className="waves-effect waves-light me-1" type="submit" onClick={handleSubmit}>
                        {t('Save')}
                    </Button>
                    <Button variant="danger" className="waves-effect waves-light" onClick={toggle}>
                        {t('Cancel')}
                    </Button>
                </Modal.Body>
            </Modal>


            <Modal show={addRolesModal} onHide={addRolestoggle} centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">{t('Add Roles')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
                        <Table className="mb-0" striped>
                            <thead>
                                <tr>
                                    <th>{t('Roles')}</th>
                                    <th>{t('View TT')}</th>
                                    <th>{t('Manage TT')}</th>
                                    <th>{t('Delegate Users')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {['Sales Admin', 'Sales Staff', 'Technical Admin', 'Technical Staff'].map(role => (
                                    <tr key={role}>
                                        <td>{role}</td>
                                        {['View TT', 'Manage TT', 'Delegate Users'].map(permission => (
                                            <td key={permission}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={roleState[role][permission]}
                                                    onChange={() => handleCheckboxChange(role, permission)}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <div className="mt-4 mt-md-2">
                        <Button variant="light" className="waves-effect waves-light me-1" type="submit" onClick={handleSubmitRole}>
                            {t('Save')}
                        </Button>
                        <Button variant="danger" className="waves-effect waves-light" onClick={addRolestoggle}>
                            {t('Cancel')}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};


export default List;
