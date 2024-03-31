import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button,  Dropdown} from 'react-bootstrap';
import avatar5 from '../../../../assets/images/users/user-6.jpg';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUser } from '../../../../hooks';

// images
import profileImg from '../../../../assets/images/users/profile.jpg';
import { VerticalForm , FormInput} from '../../../../components/form';




const UserBox = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [user] = useUser();


    console.log("user data :",user)

    type MemberData = {
        name: string;
        position: string;
        company: string;
        email: string;
    };
    
    
    
    // Show/hide the modal
    const toggle = () => {
        setModal(!modal);
    };
    
    // form validation schema
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required('Please enter name'),
            position: yup.string().required('Please enter your position'),
            company: yup.string().required('Please enter your company name'),
            email: yup.string().required('Please enter Email address').email('Enter valid email'),
        })
    );

    return (
        <div>
        <Card>
        <Card.Body className="text-center">
            <div>
                <img
                     src={user.photo_url}
                    alt="profileImage"
                    className="rounded-circle avatar-xl img-thumbnail mb-2"
                />
               
                <div className="text-start">
                    <p className="text-muted font-13">
                        <strong>Full Name :</strong> <span className="ms-2">{user.firstName} {user.lastName}</span>
                    </p>

                    <p className="text-muted font-13">
                        <strong>Mobile :</strong>
                        <span className="ms-2">{user.mobile_number}</span>
                    </p>

                    <p className="text-muted font-13">
                        <strong>Email :</strong> <span className="ms-2">{user.email}</span>
                    </p>

                    {/* <p className="text-muted font-13">
                        <strong>Location :</strong> <span className="ms-2">Muscat</span>
                    </p> */}
                </div>
                {/* <Button className="rounded-pill waves-effect waves-light">Send Message</Button> */}
            </div>
        </Card.Body>
    </Card>


        {/* <Card>
            <Card.Body className="bg-picture">
                <div className="d-flex align-items-top">
                    <img
                        src={profileImg}
                        alt="profileImage"
                        className="flex-shrink-0 rounded-circle avatar-xl img-thumbnail float-start me-3"
                    />
                    <div className="flex-grow-1 overflow-hidden">
                        <h4 className="m-0">Alexandra Clarkson</h4>
                        <p className="text-muted">
                            <i>Web Designer</i>
                        </p>
                        <p className="font-13">
                            Hi I'm Alexandra Clarkson,has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type.Contrary to popular belief, Lorem Ipsum is not
                            simply random text. It has roots in a piece of classical Latin literature it over 2000 years
                            to popular belief Ipsum is not simplyrandom text.
                        </p>

                        <ul className="social-list list-inline mt-3 mb-0">
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-purple text-purple">
                                    <i className="mdi mdi-facebook"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-danger text-danger">
                                    <i className="mdi mdi-google"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-info text-info">
                                    <i className="mdi mdi-twitter"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-secondary text-secondary">
                                    <i className="mdi mdi-github"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Card.Body>
        </Card> */}
        </div>
    );
};

export default UserBox;
