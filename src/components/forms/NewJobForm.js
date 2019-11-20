import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../state';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    MenuItem,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
} from '@material-ui/core';
import { actions } from '../../state/customer/customerActions';

import zipcodes from '../../constants/zipcodes';
import { createTimes } from '../../constants/times';

const useStyles = makeStyles(theme => ({
    textField: {
        width: '100%',
    },
}));

const typeOptions = ['Recurring', 'Groupon', 'One-off', 'Initial Assessment'];

const NewJobForm = ({ handleClose }) => {
    const [loading, setLoading] = useState(true);
    const [{ customers, jobs }, dispatch] = useStateValue();
    // const [times, setTimes] = useState(null);

    const classes = useStyles();

    //
    //If there are no customers, get the customers from the database
    useEffect(() => {
        if (!customers.customers.length) {
            actions.getCustomers(dispatch).then(res => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [customers.customers.length, dispatch]);

    //
    //If the times haven't been generated yet, generate them based on the slot
    //event that has been selected
    // useEffect(() => {
    //     if (!times) {
    //         //Checks to make sure that clicking the New Job from the
    //         //topbar / sidebar works as well as from the calendar
    //         let day = (jobs.slotEvent && jobs.slotEvent.start) || null;
    //         setTimes(createTimes(day));
    //     }
    // }, [jobs.slotEvent, times]);
    let day = (jobs.slotEvent && jobs.slotEvent.start) || null;
    let times = createTimes(day);

    return (
        <>
            <DialogContent>
                <form>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Typography>Create New Job</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                id="customer"
                                name="customer"
                                label="Customer"
                                margin="dense"
                                className={classes.textField}
                            >
                                {customers.customers &&
                                    customers.customers.map(
                                        (customer, index) => (
                                            <MenuItem
                                                key={index}
                                                value={customer.docId}
                                            >
                                                {customer.name}
                                            </MenuItem>
                                        )
                                    )}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                margin="dense"
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                margin="dense"
                                className={classes.textField}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="street"
                                name="street"
                                label="Street Address"
                                margin="dense"
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="city"
                                name="city"
                                label="City"
                                margin="dense"
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="region"
                                name="region"
                                label="State"
                                margin="dense"
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                select
                                id="zipcode"
                                name="zipcode"
                                label="Zipcode"
                                margin="dense"
                                className={classes.textField}
                            >
                                {zipcodes.map(zipcode => (
                                    <MenuItem key={zipcode} value={zipcode}>
                                        {zipcode}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                id="arrivalWindowStart"
                                name="arrivalWindowStart"
                                label="Arrival Window Start"
                                margin="dense"
                                onChange={e => console.log(e.target.value)}
                                className={classes.textField}
                            >
                                {times &&
                                    times.map(time => (
                                        <MenuItem
                                            key={time.display}
                                            value={time.time}
                                        >
                                            {time.display}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                id="arrivalWindowEnd"
                                name="arrivalWindowEnd"
                                label="Arrival Window End"
                                margin="dense"
                                onChange={e => console.log(e.target.value)}
                                className={classes.textField}
                            >
                                {times &&
                                    times.map(time => (
                                        <MenuItem
                                            key={time.display}
                                            value={time.time}
                                        >
                                            {time.display}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                select
                                id="type"
                                name="cleaningType"
                                label="Cleaning Type"
                                margin="dense"
                                className={classes.textField}
                            >
                                {typeOptions.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        handleClose();
                    }}
                >
                    Find Times
                </Button>
            </DialogActions>
        </>
    );
};

export default NewJobForm;
