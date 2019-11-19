import React, { useState, useEffect} from 'react';
import { useStateValue } from '../../state';
import { actions } from '../../state/auth/authActions';

import UserTable from '../Profile/Component/UserTable';

const Profile = () => {
    const [{ auth }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth.users || auth.users.length == 0) {
            console.log('asking for users');
            actions.getUsers(dispatch).then(res => {
                if (res) setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [/* users.users.length, users.length, dispatch */]);

    return (
        <>
            <h1>{auth.currentUser && auth.currentUser.displayName} </h1>
            <p>{auth.currentUser && auth.currentUser.email}</p>
            {loading || !auth.users ? <h2>Loading...</h2> : (
            <UserTable users={auth.users} />
            )}
            <button
                onClick={() => {
                    actions.logout(dispatch);
                }}
            >
                Sign Out
            </button>
        </>
    );
};

export default Profile;
