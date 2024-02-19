import { Link } from 'react-router-dom';
import { Badge, Card, Col, OverlayTrigger, ProgressBar, Row, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';

// buttons
import Button from 'react-bootstrap/Button';

// hooks
import { usePageTitle } from '../../../hooks';

// components
import { FormInput } from '../../../components/form';

// types
import { EndUsersList } from './endUsersTypes';

// dummy data
import { EndUsers } from './endUsersData';
import cardImg from '../../../assets/images/gallery/user4.jpg';

type EndUsersProps = {
    users: EndUsersList[];
};

const SingleUser = ({ users }: EndUsersProps) => {
    return (
        <div>
             <h4 className="mt-0">End Users</h4>
        <>
        <Row>
                {(users || []).map((user, index) => {
                    return (
                        <Col xl={4} key={index.toString()}>
                            <Card>
                            <Card.Img src={cardImg} />
                                <Card.Body className="project-box">
                                    {/* <Badge bg={project.variant} className="float-end">
                                        {project.state}
                                    </Badge> */}
                                    <h4 className="mt-0">
                                        <Link to="#" className="text-dark">
                                            User Name
                                        </Link>
                                    </h4>

                                    <li className="list-inline-item me-4">
                                    <h5 className="mb-2 fw-semibold">Space Slot Type (Space , experince ...)</h5>
                                    </li>

                                    <ul className="list-inline">

                                        <li className="list-inline-item me-4">
                                        <h5 className="mb-2 fw-semibold">Mobile Number</h5>
                                            <p className="mb-0">99999999</p>
                                        </li>

                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Email</h5>
                                            <p className="mb-0">aaa@gmail.com</p>
                                        </li>

                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Gender</h5>
                                            <p className="mb-0">Male</p>
                                        </li>

                                    </ul>

                                    <ul className="list-inline">
                                        <li className="list-inline-item me-4">
                                        <h5 className="mb-2 fw-semibold">Plan</h5>
                                            <p className="mb-0">Month / 6 Months / Years</p>
                                            
                                           
                                        </li>
                                        <li className="list-inline-item me-4">
                                            
                                            <h5 className="mb-2 fw-semibold">City</h5>
                                            <p className="mb-0">Muscat</p>
                                        </li>
                                        <li className="list-inline-item">
                                            
                                            <h5 className="mb-2 fw-semibold">Address</h5>
                                            <p className="mb-0">Al-Khoud</p>
                                        </li>
                                    </ul>

                                        {/* <Button  variant="success">Accept</Button>
                                        <Button  variant="danger">Reject</Button> */}
                                        <Button  variant="secondary">Suspend User</Button>
                                        {/* <span className={classNames('float-end', 'text-' + project.variant)}>
                                            {project.progress}%
                                        </span> */}
                                  
                                    {/* <ProgressBar
                                        className={classNames('progress-bar-alt-' + project.variant, 'progress-sm')}
                                    >
                                        <ProgressBar
                                            variant={project.variant}
                                            now={project.progress}
                                            className="progress-animated" />
                                    </ProgressBar> */}
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row></>
            </div>
    );
};

const Users = () => {
    // set pagetitle
    usePageTitle({
        title: 'Projects',
        breadCrumbItems: [
            {
                path: 'apps/projects',
                label: 'Apps',
            },
            {
                path: 'apps/projects',
                label: 'Projects',
                active: true,
            },
        ],
    });

    return (
        <>
            {/* <Row>
                <Col sm={4}>
                    <Link to="#" className="btn btn-purple rounded-pill w-md waves-effect waves-light mb-3">
                        <i className="mdi mdi-plus me-1"></i>
                        Create Project
                    </Link>
                </Col>
                <Col sm={8}>
                    <div className="float-end">
                        <form className="row g-2 align-items-center mb-2 mb-sm-0">
                            <div className="col-auto">
                                <div className="d-flex">
                                    <label className="d-flex align-items-center">
                                        Phase
                                        <FormInput
                                            type="select"
                                            name="phase"
                                            containerClass="d-inline-block ms-2"
                                            className="form-select-sm"
                                        >
                                            <option>All Projects(6)</option>
                                            <option>completed</option>
                                            <option>Progress</option>
                                        </FormInput>
                                    </label>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="d-flex">
                                    <label className="d-flex align-items-center">
                                        Sort
                                        <FormInput
                                            type="select"
                                            name="sort"
                                            containerClass="d-inline-block ms-2"
                                            className="form-select-sm"
                                        >
                                            <option>Date</option>
                                            <option>Name</option>
                                            <option>End date</option>
                                            <option>Start Date</option>
                                        </FormInput>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </Col>
            </Row> */}
            <SingleUser users={EndUsers} />
        </>
    );
};

export default Users;
