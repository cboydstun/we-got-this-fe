import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { useStateValue } from '../../state';
import { Tab, Tabs } from '@material-ui/core';

const useStyles = makeStyles({
    column: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
});

const teams = techsArray => {
    let team = techsArray.reduce((acc, curr) => {
        return acc + curr.name + ' & ';
    }, 'Serviced By: ');

    //Remove the last & because I'm lazy
    return team.slice(0, -2);
};

const Job = ({ location }) => {
    const [values, setValues] = useState();
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
                <>
                    <div className={classes.column}>
                        <h1>{job.details.schedule_date}</h1>
                        <p>{teams(job.techs)}</p>
                    </div>
                    <Tabs indicatorColor="primary" textColor="primary">
                        <Tab label="Photos" />
                        <Tab label="Notes" />
                    </Tabs>
                </>
            )}
        </>
    );
};

export default Job;
