import React, { useEffect, useState } from 'react';
import firebase from '../config/firebase';

const User = ({ displayName, selected, setSelected }) => {
    const handleClick = () => {
        setSelected(!selected);
    };

    return (
        <div onClick={handleClick}>
            <span style={{ color: selected && 'green' }}>{displayName}</span>
        </div>
    );
};

const UserList = ({ ids, handleSelectedUsers }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const firestore = firebase.getFirestore();

        firestore.collection('users')
            .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
            .get()
            .then(snapshot => setUsers(snapshot.docs.map(doc => doc.data())));
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => {
                    return (
                        <li key={user.email}>
                            <User
                                setSelected={selected => {
                                    const newUsers = [...users];
                                    newUsers.splice(users.indexOf(user), 1, {...user, selected: selected});

                                    if (handleSelectedUsers) {
                                        handleSelectedUsers(newUsers.filter(user => user.selected));
                                    };

                                    setUsers(newUsers);
                                }}
                                {...user}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default UserList;