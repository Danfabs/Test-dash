import Cookies from 'js-cookie'; 

console.log("User role from Menue: ", Cookies.get('userRole'));

export type MenuItemTypes = {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: MenuItemTypes[];
};



// Define menu items for different roles
const SUPER_ADMIN_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard-outline',
        url: '/dashboard',
    },
    {
        key: 'troubletickets',
        label: 'trouble tickets',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard-outline',
        url: '/apps/troubletickets',
    },
    {
        key: 'apps-providerService',
        label: 'Service Provider',
        isTitle: false,
        icon: 'mdi mdi-account-multiple',
        url: '/apps/providerService',
    },
    {
        key: 'apps-endUsers',
        label: 'End Users',
        isTitle: false,
        icon: 'mdi mdi-account-supervisor-outline',
        url: '/apps/endUsers',
    },
    {
        key: 'apps-delegateUsers',
        label: 'Manage Users',
        isTitle: false,
        icon: 'mdi mdi-account-star-outline',
        url: '/apps/delegateUsers',
    },
    {
        key: 'apps-payment',
        label: 'Payment',
        isTitle: false,
        icon: 'mdi mdi-credit-card-outline',
        url: '/apps/payment',
    },
    {
        key: 'apps-discount',
        label: 'Discount',
        isTitle: false,
        icon: 'mdi mdi-percent-outline',
        url: '/apps/discount',
    },
    {
        key: 'apps-interests',
        label: 'Interests',
        isTitle: false,
        icon: 'mdi mdi-format-list-bulleted',
        url: '/apps/interests',
    },
];

const SALES_ADMIN_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard-outline',
        url: '/dashboard',
    },
    {
        key: 'apps-providerService',
        label: 'Service Provider',
        isTitle: false,
        icon: 'mdi mdi-account-multiple',
        url: '/apps/providerService',
    },
    {
        key: 'apps-endUsers',
        label: 'End Users',
        isTitle: false,
        icon: 'mdi mdi-account-supervisor-outline',
        url: '/apps/endUsers',
    },
];

const SALES_STAFF_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard-outline',
        url: '/dashboard',
    },
    {
        key: 'apps-providerService',
        label: 'Service Provider',
        isTitle: false,
        icon: 'mdi mdi-account-multiple',
        url: '/apps/providerService',
    },
    {
        key: 'apps-endUsers',
        label: 'End Users',
        isTitle: false,
        icon: 'mdi mdi-account-supervisor-outline',
        url: '/apps/endUsers',
    },
];

// Define the default menu items (for users without specific roles)
const DEFAULT_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard-outline',
        url: '/dashboard',
    },
];

// Function to get menu items based on user role
const getMenuItemsByRole = (userRole: string): MenuItemTypes[] => {
    switch (userRole) {
        case 'Super Admin':
            return SUPER_ADMIN_MENU_ITEMS;
        case 'Sales Admin':
            return SALES_ADMIN_MENU_ITEMS;
        case 'Sales Staff':
            return SALES_STAFF_MENU_ITEMS;
        default:
            return DEFAULT_MENU_ITEMS;
    }
};

export const getMenuItems = (): MenuItemTypes[] => {
    // Retrieve the user role from the cookie
    const userRole = Cookies.get('userRole');
    console.log("User role from Menue: ", userRole);
    return getMenuItemsByRole(userRole || '');
};