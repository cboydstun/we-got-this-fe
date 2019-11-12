export const routes = {
    AUTH: '/auth',
    HOME: '/dashboard',
    PROFILE: '/profile',
    CALENDAR: '/calendar',
    TECHS: '/techs',
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
