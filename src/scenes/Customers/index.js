import React, { useState, useEffect } from 'react';
import CustomerTable from './components/Table';
import { useStateValue } from '../../state';
import { actions } from '../../state/customer/customerActions';

const Customers = () => {
    const [loading, setLoading] = useState(true);
    const [{ auth, customers }, dispatch] = useStateValue();

    useEffect(() => {
        if (customers.length == 0) {
            console.log('asking for customers');
            actions
                .getCustomers(dispatch, auth.currentUser.accountId)
                .then(res => {
                    if (res) setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [auth.currentUser.accountId, customers.length, dispatch]);

    return (
        <div>
            <h1>Customers</h1>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <CustomerTable customers={customers} />
            )}
        </div>
    );
};

export default Customers;
