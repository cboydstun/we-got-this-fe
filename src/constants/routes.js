export const routes = {
    AUTH: '/auth',
    HOME: '/dashboard',
    PROFILE: '/profile',
    CALENDAR: '/calendar',
    TECHS: '/techs',
    CREATE_CUSTOMER_FORM: '/create-customer',
    CREATE_TEAM_FORM: '/team/create',
    INVITE_TECH: '/invite-tech',
    REGISTER_COMPANY: '/register-company',
    AUTH_REGISTER_COMPANY: '/auth/register-company',
    CUSTOMERS: '/customers',
    CUSTOMER_PROFILE: '/customers/:id',
};

export const privateRoutes = [
    {
        name: 'Dashboard',
        path: routes.HOME,
    },
    {
        name: 'Profile',
        path: routes.PROFILE,
    },
    {
        name: 'Calendar',
        path: routes.CALENDAR,
    },
    {
        name: 'Techs',
        path: routes.TECHS,
    },
    {
        name: 'Create Customer Form',
        path: routes.CREATE_CUSTOMER_FORM,
    },
    {
        name: 'Create Team Form',
        path: routes.CREATE_TEAM_FORM,
    },
    {
        name: 'Invite Tech',
        path: routes.INVITE_TECH,
    },
    {
        name: 'Register Company',
        path: routes.REGISTER_COMPANY,
    },
    {
        name: 'Customers',
        path: routes.CUSTOMERS,
    },
    {
        name: 'Specific Customer',
        path: routes.CUSTOMER_PROFILE,
    },
];

export const publicRoutes = [
    {
        name: 'Auth',
        path: routes.AUTH,
    },
];

export default {
    routes,
    privateRoutes,
    publicRoutes,
};
