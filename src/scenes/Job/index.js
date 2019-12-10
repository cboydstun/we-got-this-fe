import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../state';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
    Tab,
    Tabs,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from '@material-ui/core';

import PhotosPanel from './components/PhotosPanel';
import NotesPanel from './components/NotesPanel';

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

const Job = ({ location, history }) => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState('');
    const [{ customers }, dipatch] = useStateValue();
    const [job, setJob] = useState(null);
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        let index = customers.customerJobs.findIndex(job => {
            return job.docId == location.state;
        });
        let job = customers.customerJobs[index];
        setJob(job);
    }, [customers.customerJobs, location.state]);

    const handleChange = (e, newVal) => {
        setValue(newVal);
    };

    const handleNoteChange = e => {
        setNote(e.target.value);
    };

    const handleSubmit = () => {
        console.log('The submitted note is!: ', note);
    };

    return (
        <>
            {!job ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    {mobile && (
                        <IconButton onClick={() => history.goBack()}>
                            <ArrowBackIcon />
                            {customers.currentCustomer.name}
                        </IconButton>
                    )}
                    <div className={classes.column}>
                        <h1>{job.details.schedule_date}</h1>
                        <p>Serviced By: Get this to work</p>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Photos" />
                            <Tab label="Job Notes" />
                            {value == 0 ? (
                                <Button variant="contained" color="primary">
                                    Add Photo
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setOpen(true)}
                                >
                                    Add Note
                                </Button>
                            )}
                        </Tabs>
                        <PhotosPanel value={value} index={0} job={job} />
                        <NotesPanel value={value} index={1} job={job} />
                        <Dialog open={open}>
                            <DialogContent>
                                <form>
                                    <input
                                        type="text"
                                        value={note}
                                        onChange={handleNoteChange}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onCLick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit}>Submit</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </>
            )}
        </>
    );
};

export default Job;
