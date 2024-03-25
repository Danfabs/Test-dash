import { Badge, Card, Dropdown, Table } from 'react-bootstrap';

// type
import { EndUsersDetail } from './types';

type EndUsersDetailsProps = {
    endUsersDetails: EndUsersDetail[];
};

const EndUsers = ({ endUsersDetails }: EndUsersDetailsProps) => {
    return (
        <Card>
            <Card.Body>
            </Card.Body>
        </Card>
    );
};

export default EndUsers;
