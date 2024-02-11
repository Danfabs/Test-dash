import { Badge, Card, Dropdown, Row, Table, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../../../hooks';
import classNames from 'classnames';
// type
// import { BranchList } from '../../BranchInfo/types';
//image
import cardImg from '../../../assets/images/gallery/1.jpg';
//Buttons
import Button from 'react-bootstrap/Button';

import { BranchDetails } from '../../BranchInfo/branchesdata';
import { BranchList } from '../../BranchInfo/branchTypes';

type BranchDetailsProps = {
  branchDetails: BranchList[];
};

const ViewBranch = ({ branchDetails }: BranchDetailsProps) => {
    return (
        <div>
            <h4 className="mt-0">Branches</h4>
            <Row>
                {(branchDetails || []).map((branch, index) => {
                    return (
                        <Col xl={4} key={index.toString()}>
                            <Card>
                                <Card.Img src={cardImg} />
                                <Card.Body className="project-box">
                                    <h4 className="mt-0">
                                        <Link to="#" className="text-dark">
                                            Branch Name
                                        </Link>
                                    </h4>

                                    <ul className="list-inline">
                                    <p className="mb-0">
                                        Branch Location
                                    </p>
                                    </ul>
                                   

                                    <ul className="list-inline">

                                    <p className="mb-0">
                                        Branch Description
                                        </p>

                                    </ul>

                                    
                                    <ul className="list-inline">

                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Minimum
                                                Reservation Notice</h5>
                                            <p className="mb-0">88</p>
                                        </li>

                                        <li className="list-inline-item">
                                            <h5 className="mb-2 fw-semibold">Space Amenities</h5>
                                            <i className="mdi mdi-wifi"></i>
                                            <i className="mdi mdi-parking"></i>
                                            <i className="mdi mdi-human-male-female"></i>
                                        </li>

                                    </ul>

                                    <ul className="list-inline">
                                        <li className="list-inline-item me-4">
                                            <h5 className="mb-2 fw-semibold">Country</h5>
                                            <p className="mb-0">Oman</p>


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

                                    <ul className="list-inline">
                                    <li className="list-inline-item">
                                    <Button variant="success">View Slots</Button>
                                    </li>
                                    </ul>

                                    {/* <h5 className="mb-2 fw-semibold">
                                        Progress
                                    </h5>
                                   
                                    <Button variant="danger">Reject</Button>
                                    <Button variant="secondary">Suspend </Button> */}

                                </Card.Body>
                            </Card>
                        </Col>
                        );
                    })}
            </Row>
        </div>

    );
};

const Branches = () => {
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
           
            <ViewBranch branchDetails={BranchDetails} />
        </>
    );
};

export default Branches;
