import { Button, Card, Dropdown } from 'react-bootstrap';

import Avatar1 from '../../../assets/images/users/user-3.jpg'




export default function DelegateUsers() {   
     return (
        <Card>
            <Card.Body className="text-center">
                {/* <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Anothther Action</Dropdown.Item>
                        <Dropdown.Item>Something Else</Dropdown.Item>
                        <Dropdown.Item>Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                <div>
                    <img
                        src={Avatar1}
                        alt="profileImage"
                        className="rounded-circle avatar-xl img-thumbnail mb-2"
                    />
                    <div className="text-start">
                        <p className="text-muted font-13">
                            <strong>Full Name :
                                </strong> <span className="ms-2">User Name</span>
                        </p>

                        <p className="text-muted font-13">
                            <strong>Mobile :</strong>
                            <span className="ms-2">
                                +96899999999
                            </span>
                        </p>

                        <p className="text-muted font-13">
                            <strong>Email :</strong> <span className="ms-2">
                                aaa@swiftbeam.co</span>
                        </p>

                        <p className="text-muted font-13">
                            <strong>User Role :</strong> <span className="ms-2">
                                Sales Staff</span>
                        </p>
                    </div>
                    {/* <Button className="rounded-pill waves-effect waves-light">Send Message</Button> */}
                </div>
            </Card.Body>
        </Card>
    );
};


