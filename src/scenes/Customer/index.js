import React from 'react';
import CustomerCard from './components/CustomerCard';
import ServiceWrapper from './components/ServiceWrapper';

const Customer = ({ location }) => {
    console.log(location);

    return (
        <>
            <CustomerCard customer={location.state} />
            <ServiceWrapper />
        </>
    );
};

export default Customer;
