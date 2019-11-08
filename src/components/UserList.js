import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

const UserList = ids => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase.getFirestore().collection('accounts').get()
            .then(snapshot => setUsers(snapshot.docs.map(doc => doc.data())));
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => {
                    return <li key={user.email}>{user.displayName}</li>
                })}
            </ul>
        </div>
    );
};

export default UserList;