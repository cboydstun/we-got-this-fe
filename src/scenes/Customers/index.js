import React, { useState, useEffect } from 'react';
import { Toolbar, Tooltip, IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import CustomerTable from './components/Table';
import { useStateValue } from '../../state';
import { actions } from '../../state/customer/customerActions';
import NewCustomer from '../../components/dialogs/NewCustomer';

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
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h1>Customers</h1>
                <Tooltip title="Filter">
                    <IconButton onClick={() => alert('Clicked')}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>{' '}
                <NewCustomer />
            </div>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <CustomerTable customers={customers} />
            )}
        </div>
    );
};

export default Customers;
