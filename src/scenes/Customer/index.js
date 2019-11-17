import React from 'react';
import CustomerCard from './components/CustomerCard';
import ServiceWrapper from './components/ServiceWrapper';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/routes';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Customer = ({ location }) => {
    console.log(location);

    return (
        <>
            <IconButton component={Link} to={routes.CUSTOMERS}>
                <ArrowBackIcon />
                Customers
            </IconButton>
            <CustomerCard customer={location.state} />
            <ServiceWrapper
                jobPaths={location.state.jobs}
                customer={location.state}
            />
        </>
    );
};

export default Customer;
