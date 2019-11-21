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
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import zipcodes from '../../constants/zipcodes';
import { createTimes, durations } from '../../constants/times';

const useStyles = makeStyles(theme => ({
    textField: {
        width: '100%',
    },
}));

const typeOptions = ['Recurring', 'Groupon', 'One-off', 'Initial Assessment'];

const NewJobForm = ({
    handleClose,
    errors,
    touched,
    values,
    status,
    setFieldValue,
}) => {
    const [loading, setLoading] = useState(true);
    const [{ customers, jobs }, dispatch] = useStateValue();

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
    let day = (jobs.slotEvent && jobs.slotEvent.start) || null;
    let times = createTimes(day);

    const setFormToCustomer = async docId => {
        let index = customers.customers.findIndex(
            customer => customer.docId == docId
        );
        let customer = customers.customers[index];
        console.log(customer);
        let { name, locations } = customer;
        let { city, state, street, zipcode } = locations[0].address;

        await setFieldValue('customer', docId);
        await setFieldValue('name', name);
        await setFieldValue('street', street);
        await setFieldValue('city', city);
        await setFieldValue('zipcode', parseInt(zipcode, 10));
        await setFieldValue('region', state);
    };

    return (
        <>
            <DialogContent>
                <Form>
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
                                value={values.customer}
                                onChange={e => {
                                    setFormToCustomer(e.target.value);
                                }}
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
                        <Grid item xs={5}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                margin="dense"
                                value={values.name}
                                onChange={e => {
                                    setFieldValue('name', e.target.value);
                                }}
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                margin="dense"
                                value={values.email}
                                onChange={e => {
                                    setFieldValue('email', e.target.value);
                                }}
                                className={classes.textField}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="street"
                                name="street"
                                label="Street Address"
                                margin="dense"
                                value={values.street}
                                onChange={e => {
                                    setFieldValue('street', e.target.value);
                                }}
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="city"
                                name="city"
                                label="City"
                                margin="dense"
                                value={values.city}
                                onChange={e => {
                                    setFieldValue('city', e.target.value);
                                }}
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="region"
                                name="region"
                                label="State"
                                margin="dense"
                                value={values.region}
                                onChange={e => {
                                    setFieldValue('region', e.target.value);
                                }}
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                type="number"
                                id="zipcode"
                                name="zipcode"
                                label="Zipcode"
                                margin="dense"
                                value={values.zipcode}
                                onChange={e => {
                                    setFieldValue('zipcode', e.target.value);
                                }}
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                id="arrivalWindowStart"
                                name="arrivalWindowStart"
                                label="Arrival Window Start"
                                margin="dense"
                                value={values.arrivalWindowStart}
                                onChange={e => {
                                    setFieldValue(
                                        'arrivalWindowStart',
                                        e.target.value
                                    );
                                }}
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
                                value={values.arrivalWindowEnd}
                                onChange={e => {
                                    setFieldValue(
                                        'arrivalWindowEnd',
                                        e.target.value
                                    );
                                }}
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
                                id="duration"
                                name="duration"
                                label="Appt Duration"
                                margin="dense"
                                value={values.duration}
                                onChange={e => {
                                    setFieldValue('duration', e.target.value);
                                }}
                                className={classes.textField}
                            >
                                {durations.map(duration => (
                                    <MenuItem
                                        key={duration.duration}
                                        value={duration.duration}
                                    >
                                        {duration.display}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                id="type"
                                name="cleaningType"
                                label="Cleaning Type"
                                margin="dense"
                                value={values.cleaningType}
                                onChange={e => {
                                    setFieldValue(
                                        'cleaningType',
                                        e.target.value
                                    );
                                }}
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Schedule Job
                    </Button>
                </Form>
            </DialogContent>
        </>
    );
};

const FormikNewJobForm = withFormik({
    mapPropsToValues({
        customer,
        name,
        email,
        street,
        region,
        city,
        zipcode,
        arrivalWindowStart,
        arrivalWindowEnd,
        duration,
        cleaningType,
    }) {
        return {
            customer: customer || '',
            name: name || '',
            email: email || '',
            street: street || '',
            region: region || '',
            city: city || '',
            zipcode: zipcode || '',
            arrivalWindowStart: arrivalWindowStart || '',
            arrivalWindowEnd: arrivalWindowEnd || '',
            duration: duration || '',
            cleaningType: cleaningType || '',
        };
    },
    handleSubmit(values, { props, resetForm }) {
        console.log(values);
    },
})(NewJobForm);

export default FormikNewJobForm;
