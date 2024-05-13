import { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// helpers
import { getMenuItems } from '../helpers/menu';

// components
import Scrollbar from '../components/Scrollbar';

import AppMenu from './Menu';

// images
import profileImg from '../assets/images/users/user-1.jpg';
import { useUser } from '../hooks';
import { useTranslation } from 'react-i18next';


/* user box */
const UserBox = () => {
    const { t } = useTranslation();
    // get the profilemenu
    const ProfileMenus = [
        {
            label: t('My Account'),
            icon: 'fe-user',
            redirectTo: '/apps/contacts/profile',
        },
        {
            label: 'Settings',
            icon: 'fe-settings',
            redirectTo: '#',
        },
        // {
        //     label: 'Lock Screen',
        //     icon: 'fe-lock',
        //     redirectTo: '/auth/lock-screen',
        // },
        {
            label: 'Logout',
            icon: 'fe-log-out',
            redirectTo: '/auth/logout',
        },
    ];

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [user] = useUser();
    /*
     * toggle dropdown
     */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="user-box text-center">
            {/* <img src={profileImg} alt="" title="Mat Helme" className="rounded-circle img-thumbnail avatar-md" /> */}
            <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
                <Dropdown.Toggle
                    id="dropdown-notification"
                    to="#"
                    as={Link}
                    onClick={toggleDropdown}
                    className="user-name h5 mt-2 mb-1 d-block"
                >
                    {user.firstName}
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-pro-dropdown">
                    <div onClick={toggleDropdown}>
                        {(ProfileMenus || []).map((item, index) => {
                            return (
                                <Link
                                    to={item.redirectTo}
                                    className="dropdown-item notify-item"
                                    key={index + '-profile-menu'}
                                >
                                    <i className={classNames(item.icon, 'me-1')}></i>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            <p className="text-muted left-user-info">{user.role}</p>

            {/* <ul className="list-inline">
                <li className="list-inline-item">
                    <Link to="#" className="text-muted left-user-info">
                        <i className="mdi mdi-cog"></i>
                    </Link>
                </li>

                <li className="list-inline-item">
                    <Link to="#">
                        <i className="mdi mdi-power"></i>
                    </Link>
                </li>
            </ul> */}
        </div>
    );
};

/* sidebar content */
const SideBarContent = () => {
    return (
        <>
            <UserBox />

            <div id="sidebar-menu">
                <AppMenu menuItems={getMenuItems()} />
            </div>

            <div className="clearfix" />
        </>
    );
};

type LeftSidebarProps = {
    isCondensed: boolean;
};

const LeftSidebar = ({ isCondensed }: { isCondensed: boolean }) => {
    const menuNodeRef = useRef<HTMLDivElement>(null);

    /**
     * Handle the click anywhere in doc
     */
    const handleOtherClick = (e: MouseEvent) => {
        // Ensure menuNodeRef.current is not null before accessing its properties
        if (menuNodeRef.current && menuNodeRef.current.contains(e.target as Node)) {
            return;
        }

        // Hide the menu
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);

        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        };
    }, []);


    return (
        <div className="left-side-menu" ref={menuNodeRef}>
            {!isCondensed && (
                <Scrollbar style={{ maxHeight: '100%' }}>
                    <SideBarContent />
                </Scrollbar>
            )}
            {isCondensed && <SideBarContent />}
        </div>
    );
};

LeftSidebar.defaultProps = {
    isCondensed: false,
};

export default LeftSidebar;
