import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// hooks
import { useRedux } from '../../hooks/';

//actions
import { resetAuth, signupUser } from '../../redux/actions';
import axios from 'axios';
// components
import { VerticalForm, FormInput } from '../../components/form/';
import Loader from '../../components/Loader';
import Swal from 'sweetalert2';
import AuthLayout from './AuthLayout';
import "../../assets/css/generalStyle.css"

type UserData = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    photoFile: string;
};

/* bottom links */
// const BottomLink = () => {
//     const { t } = useTranslation();

//     return (
//         <Row className="mt-3">
//             <Col xs={12} className="text-center">
//                 <p className="text-muted">
//                     {t('Already have account?')}{' '}
//                     <Link to={'/auth/login'} className="text-dark fw--medium ms-1">
//                         <b>{t('Sign In')}</b>
//                     </Link>
//                 </p>
//             </Col>
//         </Row>
//     );
// };

const Register = () => {
    const { t } = useTranslation();
    const { dispatch, appSelector } = useRedux();
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [selectedRole, setSelectedRole] = useState<string>('');

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [mobileNumber, setMobileNumber] = useState<string>('');
    const { loading, userSignUp, error } = appSelector((state) => ({
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
    }));

    useEffect(() => {
        console.log("role: ", selectedRole)
    }, []);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            fullname: yup.string().required(t('Please enter Fullname')),
            email: yup.string().required('Please enter Email').email('Please enter valid Email'),
            password: yup.string().required(t('Please enter Password')),
            checkboxsignup: yup.bool().oneOf([true], 'Must accept Terms and Conditions'),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = async () => {
        try {
            const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/registerDashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email_address: email,
                    password: password,
                    mobile_number : mobileNumber,
                    role: selectedRole,
                    permissions: {
                        'View TT': false,
                        'Manage TT': false,
                        'Delegate Users': false,
                    }
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            const responseData = await response.json();

            // Check if the registration was successful
            if (responseData.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'User Added successfully',
                    customClass: {
                        confirmButton: 'custom-btn-success'
                    }
                });
            } else {
                // Handle registration failure
                throw new Error(responseData.error || 'Failed to register user');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            // Display error message to the user
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'Failed to register user',
                customClass: {
                    confirmButton: 'custom-btn-error'
                }
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setPhotoFile(file);
        }
    };

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
    };

    return (
        <>
            {/* {userSignUp ? <Navigate to={'/'} replace /> : null} */}

            <AuthLayout >
                <div className="text-center mb-4">
                    <h4 className="text-uppercase mt-0">{t('Register')}</h4>
                </div>

                {/* {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                {loading && <Loader />} */}
                <VerticalForm<UserData> onSubmit={onSubmit}
                    defaultValues={{}}>
                    <FormInput
                        label={t('First Name')}
                        type="text"
                        name="firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={t('Enter your first name')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Last Name')}
                        type="text"
                        name="lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={t('Enter your last name')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Email address')}
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('@swiftbeam.co OR @slotyourspase.com')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('Enter your password')}
                        containerClass={'mb-3'}
                    />

                    <FormInput
                        label={t('Mobile Number')}
                        type="text"
                        name="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder={t('Enter phone number')}
                        containerClass={'mb-3'}
                    />

                    <div className="mb-3">
                        <label>{t('Select Role')}</label>
                        <select className="form-select" onChange={(e) => handleRoleSelect(e.target.value)} value={selectedRole}>
                            <option value="Sales Admin">{t('Sales Admin')}</option>
                            <option value="Sales Staff">{t('Sales Staff')}</option>
                            <option value="Technical Admin">{t('Technical Admin')}</option>
                            <option value="Technical Staff">{t('Technical Staff')}</option>
                        </select>
                    </div>

                    {/* <FormInput
                        label={t('Upload Photo')}
                        type="file" 
                        name="photoFile"
                        onChange={handleFileChange} 
                        accept="image/*" 
                        containerClass={'mb-3'}
                    /> */}
                    {/* <FormInput
                        label={t('I accept Terms and Conditions')}
                        type="checkbox"
                        name="checkboxsignup"
                        containerClass={'mb-3'}
                    /> */}

                    <div className="mb-3 text-center d-grid">
                        <Button type="submit">
                            {t('Sign Up')}
                        </Button>
                    </div>
                </VerticalForm>
            </AuthLayout>
        </>
    );
};

export default Register;
