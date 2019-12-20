import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStateValue } from '../../state';
import { routes } from '../../constants/routes';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [{ auth }] = useStateValue();

    let loggedIn = !!auth.currentUser && !!auth.currentUser.email;

    return (
        <Route
            {...rest}
            render={props => {
                if (!loggedIn) {
                    return <Redirect to={routes.AUTH} />;
                }
                return <Component {...props} />;
            }}
        />
    );
};

export default PrivateRoute;
