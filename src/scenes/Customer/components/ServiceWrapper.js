import React, { useState, useEffect } from 'react';
// import ServiceTable from './ServiceTable';
import { actions } from '../../../state/customer/customerActions';

const ServiceWrapper = ({ jobPaths }) => {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        if (jobs == null) {
            actions.getCustomerJobs(jobPaths).then(jobs => {
                setJobs(jobs);
            });
        } else {
            setLoading(false);
        }
    }, [jobPaths, jobs]);

    return (
        <div>
            <h2>Service History</h2>
        </div>
    );
};

export default ServiceWrapper;
