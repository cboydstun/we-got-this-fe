import React, { useState, useEffect } from 'react';
import { Toolbar, Tooltip, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import CustomerTable from './components/Table';
import { useStateValue } from '../../state';
import { actions } from '../../state/customer/customerActions';
import CustomerTableHeader from './components/TableHeader';

const Customers = () => {
    const [loading, setLoading] = useState(true);
    const [{ customers }, dispatch] = useStateValue();
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('name');

    useEffect(() => {
        //Check if the customers in State is there
        if (customers.customers.length == 0) {
            console.log('asking for customers');
            actions.getCustomers(dispatch).then(res => {
                if (res) setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [customers.customers.length, dispatch]);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    return (
        <div>
            <CustomerTableHeader title="Customers" />
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <CustomerTable
                    customers={customers.customers}
                    onRequestSort={handleRequestSort}
                    orderBy={orderBy}
                    order={order}
                />
            )}
        </div>
    );
};

export default Customers;
