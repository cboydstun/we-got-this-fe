import React from 'react';
import { useStateValue } from '../../state';
import { actions } from '../../state/auth/authActions';
import Column from '../../components/styles/containers/Column';
import Row from '../../components/styles/containers/Row';

const Auth = () => {
    const [{ auth }, dispatch] = useStateValue();
    return (
        <>
            <Row>
                <Column justify="center" align="center" padding={20}>
                    <h1>Auth</h1>
                    {auth.loadingUser ? (
                        <h4>Loading</h4>
                    ) : (
                        <h4>
                            {auth.currentUser && auth.currentUser.displayName}
                        </h4>
                    )}
                    <button
                        onClick={async () => {
                            await actions.login(dispatch);
                        }}
                    >
                        Sign In With Google
                    </button>
                    <button
                        onClick={async () => {
                            await actions.login(dispatch);
                        }}
                    >
                        Register With Google
                    </button>
                </Column>
                <Column justify="center" align="center" padding={20}>
                    <div>Here is some text!</div>
                </Column>
            </Row>
        </>
    );
};

export default Auth;
