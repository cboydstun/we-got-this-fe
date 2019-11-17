import React, { useState, useEffect } from 'react';
import ServiceTable from './ServiceTable';
import { useStateValue } from '../../../state';
import { actions } from '../../../state/customer/customerActions';

const ServiceWrapper = ({ jobPaths, customer }) => {
    const [loading, setLoading] = useState(true);
    const [{ customers }, dispatch] = useStateValue();

    useEffect(() => {
        // if (customers.customerJobs == null) {
        console.log('calling action to get jobs');
        actions.getCustomerJobs(dispatch, jobPaths).then(res => {
            setLoading(false);
        });
        // } else {
        // setLoading(false);
        // }
    }, [dispatch, jobPaths]);

    let renderServices = () => {
        if (loading) {
            return <h2>Loading...</h2>;
        } else if (!customers.customerJobs.length) {
            return <h2>No Services Performed</h2>;
        } else {
            return <ServiceTable />;
        }
    };
    return (
        <div>
            <h2>Service History</h2>
            {renderServices()}
        </div>
    );
};

export default ServiceWrapper;
