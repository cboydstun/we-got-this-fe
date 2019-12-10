import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStateValue } from '../../state';
import { routes } from '../../constants/routes';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [{ auth }] = useStateValue();

    let admin =
        auth.currentUser &&
        !!auth.currentUser.roles.find(
            role => role === 'admin' || role === 'superadmin'
        );

    let loggedIn = !!auth.currentUser && !!auth.currentUser.email;

    return (
        <Route
            {...rest}
            render={props => {
                if (!loggedIn || !admin) {
                    return (
                        <div>
                            You must be logged in as an admin to view this page
                        </div>
                    );
                }
                return <Component {...props} />;
            }}
        />
    );
};

export default PrivateRoute;
