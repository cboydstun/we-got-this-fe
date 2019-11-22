import React, { useState, useEffect } from 'react';
import { useStateValue, withState } from '../../state';
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
import { actions as customerActions } from '../../state/customer/customerActions';
import { actions as jobActions } from '../../state/jobs/jobsActions';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import zipcodes from '../../constants/zipcodes';
import { createTimes, durations } from '../../constants/times';
import SplashLoading from '../loading/SplashLoading';

const useStyles = makeStyles(theme => ({
    textField: {
        width: '100%',
    },
}));

const NewJobForm = ({
    handleClose,
    errors,
    touched,
    values,
    status,
    setFieldValue,
    isSubmitting,
}) => {
    const [loading, setLoading] = useState(true);
    const [{ customers, jobs }, dispatch] = useStateValue();

    const classes = useStyles();

    const typeOptions = [
        'Recurring',
        'Groupon',
        'One-off',
        'Initial Assessment',
    ];

    //
    //If there are no customers, get the customers from the database
    //So they're available for the form
    useEffect(() => {
        if (!customers.customers.length) {
            customerActions.getCustomers(dispatch).then(res => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [customers.customers.length, dispatch]);

    //
    //If the times haven't been generated yet, generate them based on the slot
    //on the calendar that has been selected
    let day = (jobs.slotEvent && jobs.slotEvent.start) || null;
    let times = createTimes(day);

    //
    //If a customer is selected, set the customer docId to the customer field
    //And all the other data related to the customer in the form.
    //This is terribly inefficient as it forces the form to re-render like 10 times which is no beuno
    const setFormToCustomer = async docId => {
        //
        //Check
        let index = customers.customers.findIndex(
            customer => customer.docId == docId
        );
        let customer = customers.customers[index];
        console.log(customer);
        let { name, contact, locations } = customer;
        let { city, state, street, zipcode } = locations[0].address;
        let { phone } = contact;

        await setFieldValue('customer', docId);
        await setFieldValue('name', name);
        await setFieldValue('phone', phone);
        await setFieldValue('street', street);
        await setFieldValue('city', city);
        await setFieldValue('zipcode', parseInt(zipcode, 10));
        await setFieldValue('region', state);
    };

    console.log('Submitting: ', isSubmitting);

    return (
        <>
            <DialogContent>
                {isSubmitting ? (
                    <SplashLoading />
                ) : (
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
                                    error={touched.name && !!errors.name}
                                    value={values.name}
                                    onChange={e => {
                                        setFieldValue('name', e.target.value);
                                    }}
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={7}>
                                <TextField
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    label="Phone"
                                    margin="dense"
                                    errors={touched.phone && errors.phone}
                                    value={values.phone}
                                    onChange={e => {
                                        let formatted = checkPhone(e);
                                        setFieldValue('phoneNumber', formatted);
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
                                    error={touched.street && !!errors.street}
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
                                    error={touched.city && !!errors.city}
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
                                    error={touched.region && !!errors.region}
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
                                    error={touched.zipcode && !!errors.zipcode}
                                    value={values.zipcode}
                                    onChange={e => {
                                        setFieldValue(
                                            'zipcode',
                                            e.target.value
                                        );
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
                                    error={
                                        touched.arrivalWindowStart &&
                                        !!errors.arrivalWindowStart
                                    }
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
                                    error={
                                        touched.arrivalWindowEnd &&
                                        !!errors.arrivalWindowEnd
                                    }
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
                                    error={
                                        touched.duration && !!errors.duration
                                    }
                                    value={values.duration}
                                    onChange={e => {
                                        setFieldValue(
                                            'duration',
                                            e.target.value
                                        );
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
                        >
                            Schedule Job
                        </Button>
                    </Form>
                )}
            </DialogContent>
        </>
    );
};

function checkPhone(obj) {
    let str = obj.target.value.replace(/[^0-9]+?/g, '');
    switch (str.length) {
        case 10:
            str =
                '(' +
                str.substr(0, 3) +
                ') ' +
                str.substr(3, 3) +
                '-' +
                str.substr(6, 4);
            break;
        default:
            return;
    }
    return str;
}

const FormikNewJobForm = withFormik({
    mapPropsToValues({
        customer,
        name,
        phone,
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
            phone: phone || '',
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

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Must enter a First Name'),
        phone: Yup.string().required('Must provide a Phone Number'),
        street: Yup.string().required('Must enter an Address'),
        city: Yup.string().required('Must enter an City'),
        region: Yup.string().required('Must enter a State'),
        zipcode: Yup.number().required('Must enter an Zip'),
        arrivalWindowStart: Yup.string().required(
            'Please select an arrival window start time'
        ),
        arrivalWindowEnd: Yup.string().required(
            'Please select an arrival window end time'
        ),
    }),

    async handleSubmit(values, { props, resetForm, setSubmitting }) {
        setSubmitting(true);
        let res = await jobActions.scheduleNewJob(props.dispatch, values);
        console.log(values);
    },
})(NewJobForm);

export default withState(FormikNewJobForm);
