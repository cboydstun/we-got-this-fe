import React, { useState, useEffect } from 'react';
import CustomerCard from './components/CustomerCard';
import ServiceWrapper from './components/ServiceWrapper';
import { Link, Route } from 'react-router-dom';
import { routes } from '../../constants/routes';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Job from '../Job';
import { useStateValue } from '../../state';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
});

const Customer = ({ match }) => {
    const [loading, setLoading] = useState(true);
    const [{ customers }, dispatch] = useStateValue();
    const classes = useStyles();

    useEffect(() => {
        if (customers.currentCustomer) {
            setLoading(false);
        }
    }, [customers.currentCustomer]);

    return (
        <>
            <IconButton component={Link} to={routes.CUSTOMERS}>
                <ArrowBackIcon />
                Customers
            </IconButton>
            {loading && !customers.currentCustomer ? (
                <h2>Loading...</h2>
            ) : (
                <div className={classes.row}>
                    <div className={classes.column}>
                        <CustomerCard customer={customers.currentCustomer} />
                        <ServiceWrapper
                            jobPaths={customers.currentCustomer.jobs}
                            customer={customers.currentCustomer}
                        />
                    </div>
                    <Route path={`${match.path}/:job_id`} component={Job} />
                </div>
            )}
        </>
    );
};

export default Customer;
