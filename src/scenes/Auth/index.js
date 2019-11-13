import React from 'react';
import { useStateValue } from '../../state';
import { actions } from '../../state/auth/authActions';
import { Route, Link, useHistory } from 'react-router-dom';
import { RegisterCompany } from '../../components';
import { routes } from '../../constants/routes';

const Auth = () => {
    const [{ auth }, dispatch] = useStateValue();
    const history = useHistory();

    return (
        <>
            <h1>Auth</h1>
            {auth.loadingUser ? (
                <h4>Loading</h4>
            ) : (
                <h4>{auth.currentUser && auth.currentUser.displayName}</h4>
            )}
            <button
                onClick={async () => {
                    let result = await actions.login(dispatch);
                    console.log(result);
                    if (result == true) {
                        history.push(routes.AUTH_REGISTER_COMPANY);
                    }
                }}
            >
                Sign In With Google
            </button>
            <button
                onClick={async () => {
                    let result = await actions.login(dispatch);
                    console.log(result);
                    if (result == true) {
                        history.push(routes.AUTH_REGISTER_COMPANY);
                    }
                }}
            >
                Register With Google
            </button>
            <button
                onClick={() => {
                    actions.logout(dispatch);
                }}
            >
                Sign Out
            </button>
            <div id="firebaseui-auth-container"></div>
            <Link to={routes.AUTH_REGISTER_COMPANY}>Register Company</Link>
        </>
    );
};

export default Auth;
