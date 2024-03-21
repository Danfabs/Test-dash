import classNames from 'classnames';
import { Badge, Card, Dropdown, ProgressBar } from 'react-bootstrap';
import '../assets/css/generalStyle.css'

type AmountWidget3Props = {
    variant: string;
    title: string;
    trendValue: string;
    trendIcon: string;
    stats: number;
    subTitle: string;
    progress: number;
};

const AmountWidget3 = ({
    variant,
    title,
    trendValue,
    trendIcon,
    stats,
    subTitle,
    progress,
}: AmountWidget3Props) => {
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0 mb-3">{title}</h4>
                    <div className="widget-detail-1 text-center">
                        <h2 className="fw-normal  mb-1" >{stats}</h2>
                        <p className="text-muted mb-1" >{subTitle}</p>
                    </div>
            </Card.Body>
        </Card>
    );
};

export default AmountWidget3;
