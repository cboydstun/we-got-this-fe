import React, { useEffect, useState } from 'react';
import db from '../firebase';
import firebase from 'firebase';

const UserList = ({ ids }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const firestore = db.getFirestore();

        firestore.collection('accounts')
            .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
            .get()
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