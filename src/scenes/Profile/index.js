import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../state';
import { actions } from '../../state/auth/authActions';
import { makeStyles } from '@material-ui/core/styles';
import UserTable from '../Profile/Component/UserTable';
import EditIcon from '@material-ui/icons/Edit';
import EditUser from '../../components/dialogs/EditUser';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '328px',
        padding: '0 30px',
        marginBottom: '50px',
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    edit: {
        height: '20px',
        weight: '20px',
        marginRight: '15px',
    },
    profilePic: {
        height: '100px',
        width: '100px',
        borderRadius: '5px',
        border: '1px solid black',
        marginTop: '6px',
        marginRight: '15px',
    },
    admin: {
        fontWeight: 'bolder',
        fontSize: '16px',
        marginTop: '15px',
        marginBottom: '0',
        color: '#626262',
    },
    email: {
        color: '#989B9E',
        fontSize: '14px',
        marginTop: '0',
    },
}));

const Profile = () => {
    const [{ auth }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = EditUserForm => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();

    useEffect(
        () => {
            if (!auth.users || auth.users.length == 0) {
                console.log('asking for users');
                actions.getUsers(dispatch).then(res => {
                    if (res) setLoading(false);
                });
            } else {
                setLoading(false);
            }
        },
        [auth.users, dispatch]
    );

    return (
        <>
            <div className={classes.profile}>
                <div className={classes.info}>
                    <div>
                        <img
                            className={classes.profilePic}
                            src="https://static.wixstatic.com/media/96e345_6604b08d98c64c4592edee1c680b76a8~mv2.jpg/v1/fill/w_430,h_584,al_c,q_80,usm_0.66_1.00_0.01/96e345_6604b08d98c64c4592edee1c680b76a8~mv2.webp"
                        />
                    </div>
                    <div>
                        <h1 className={classes.admin}>
                            {auth.currentUser && auth.currentUser.displayName}{' '}
                        </h1>
                        <p className={classes.email}>
                            {auth.currentUser && auth.currentUser.email}
                        </p>
                    </div>
                </div>
                <div className={classes.edit}>
                    <EditUser user={auth.currentUser} />
                </div>
            </div>

            {loading || !auth.users ? (
                <h2>Loading...</h2>
            ) : (
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
