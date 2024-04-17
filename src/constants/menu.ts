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

const MENU_ITEMS: MenuItemTypes[] = [
    // { key: 'navigation', label: 'Navigation', isTitle: true },
    {
        key: 'dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard-outline',
        url: '/dashboard',
    },

    // {
    //     key: 'troubletickets',
    //     label: 'Trouble Tickets',
    //     isTitle: false,
    //     icon: 'mdi mdi-forum-outline',
    //     url: '/apps/TroubleTickets',
    // },
    // { key: 'navigation', label: 'Navigation', isTitle: true },
    {
        key: 'apps-providerService',
        label: 'Service Provider',
        isTitle: false,
        icon: 'mdi mdi-account-multiple',
        url: '/apps/providerService',
    },

    // { key: 'Sales Report', label: 'Sales Report', isTitle: true },
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
    
];



export { MENU_ITEMS };
