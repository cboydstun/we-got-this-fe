import React from 'react';
import { useStateValue } from '../../state';

import { actions } from '../../state/auth/authActions';

const Me = () => {
    const [{ auth }] = useStateValue();
    return <h1>Me is {auth.currentUser && auth.currentUser.displayName} </h1>;
};

export default Me;
