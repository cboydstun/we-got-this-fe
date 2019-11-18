import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { useStateValue } from '../../state';

const useStyles = makeStyles({
    column: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
});

const Job = ({ location }) => {
    const [{ customers }, dipatch] = useStateValue();
    const [job, setJob] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        let index = customers.customerJobs.findIndex(job => {
            return job.docId == location.state;
        });
        let job = customers.customerJobs[index];
        setJob(job);
    }, [customers.customerJobs, location.state]);

    return (
        <>
            {!job ? (
                <h2>Loading...</h2>
            ) : (
                <div className={classes.column}>
                    <h1>{job.details.schedule_date}</h1>
                </div>
            )}
        </>
    );
};

export default Job;
