import React, {useState, useEffect} from 'react';
import { useStateValue } from '../../state';
import { actions } from '../../state/auth/authActions';
import AdminCard from '../../components/forms/AdminCard';

const AdminProfile = (values) => {

    const [{auth}, dispatch] = useStateValue();

    useEffect(() => {
        actions.getAdmin(dispatch, auth.currentUser.firstName)
    }, []);

    return (
        <div>
           {auth.currentAdmin && <AdminCard  admin={auth.currentAdmin}/>}
           {/* <AdminCard /> */}
        </div>
    )
}

export default AdminProfile;