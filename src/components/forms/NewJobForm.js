import React, { useState, useEffect } from 'react';
import { useStateValue, withState } from '../../state';
import { styled, makeStyles, withTheme } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    MenuItem,
    Paper,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Divider,
    Box,
    Typography,
} from '@material-ui/core';
import { actions as customerActions } from '../../state/customer/customerActions';
import { actions as jobActions } from '../../state/jobs/jobsActions';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import zipcodes from '../../constants/zipcodes';
import { createTimes, durations } from '../../constants/times';
import SplashLoading from '../loading/SplashLoading';

import MuiTextInput from '../formItems/MuiTextInput';
import MuiPhoneInput from '../formItems/MuiPhoneInput';
import MuiSingleSelectInput from '../formItems/MuiSingleSelectInput';

import moment from 'moment';

const SelectedTime = styled(withTheme(Paper))(props => ({
    padding: props.theme.spacing(1),
    margin: props.theme.spacing(1),
}));

const NewJobForm = ({ handleClose }) => {
    const [loading, setLoading] = useState(true);
    const [{ customers, jobs }, dispatch] = useStateValue();

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

    const formatSlotEvent = slotEvent => {
        //So it doesn't break on mount while slotEvent is being added to global
        if (!slotEvent.start) {
            return 'Loading...';
        }

        //Give me the date
        let date = moment(slotEvent.start).format('LL');

        //Give me the start time
        let startTime = moment(slotEvent.start).format('LT');

        //Give me the end time
        let endTime = moment(slotEvent.end).format('LT');

        //Check if a day was selected or the individual time slot was selected
        if (startTime == '12:00 AM' || endTime == '12:00 AM') {
        }
        return (
            <Box>
                <h4>Selected Slot</h4>
                <p>Date: {date}</p>
                <p>Start Time: {startTime}</p>
                <p>End Time: {endTime}</p>
            </Box>
        );
    };

    return (
        <>
            <DialogContent>
                <Grid container spacing={1}>
                    {/* Dialog Header */}
                    <Grid item xs={12}>
                        <h2>Create New Job</h2>
                        <SelectedTime>
                            {formatSlotEvent(jobs.newJob.slotEvent)}
                        </SelectedTime>
                    </Grid>

                    {/* Select Customer Form Option */}
                    <Grid item xs={12}>
                        <Formik
                            initialValues={{
                                customer: '',
                            }}
                            validationSchema={Yup.object().shape({
                                customer: Yup.string().required(),
                            })}
                            onSubmit={(values, { resetForm }) => {
                                //Get the index of the customer selected
                                let index = customers.customers.findIndex(
                                    customer =>
                                        customer.docId == values.customer
                                );
                                //Get the customer
                                let customer = customers.customers[index];
                                console.log(customer);
                                //Send it to global state
                                jobActions.setNewJobCustomer(
                                    dispatch,
                                    customer
                                );
                            }}
                        >
                            <Form>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <h3>Select Existing Customer</h3>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MuiSingleSelectInput
                                            name="customer"
                                            label="Select By Name"
                                            data={customers.customers}
                                            valueKey="docId"
                                            displayKey="name"
                                        />
                                    </Grid>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        style={{
                                            marginTop: 20,
                                            float: 'right',
                                        }}
                                    >
                                        Next ->
                                    </Button>
                                </Grid>
                            </Form>
                        </Formik>
                    </Grid>

                    {/* New Customer Form */}
                    <Grid item xs={12}>
                        <Formik
                            initialValues={{
                                docId: '',
                                name: '',
                                phone: '',
                                street: '',
                                region: 'ID',
                                city: '',
                                zipcode: '',
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required(),
                                phone: Yup.string().required(),
                                street: Yup.string().required(),
                                city: Yup.string().required(),
                                region: Yup.string().required(),
                                zipcode: Yup.number().required(),
                            })}
                            onSubmit={(values, { resetForm }) => {
                                console.log(values);
                                jobActions.setNewJobCustomer(dispatch, values);
                            }}
                        >
                            <Form>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <h3 style={{ marginTop: 20 }}>
                                            OR Create New Customer
                                        </h3>
                                    </Grid>

                                    <Grid item xs={5}>
                                        <MuiTextInput
                                            name="name"
                                            label="Name"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={7}>
                                        <MuiPhoneInput
                                            name="phone"
                                            label="Phone"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MuiTextInput
                                            name="street"
                                            label="Street Address"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <MuiTextInput
                                            name="city"
                                            label="City"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <MuiTextInput
                                            name="region"
                                            label="State"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <MuiTextInput
                                            name="zipcode"
                                            label="Zipcode"
                                            type="number"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        marginTop: 20,
                                        float: 'right',
                                    }}
                                >
                                    Next ->
                                </Button>
                            </Form>
                        </Formik>
                    </Grid>
                </Grid>
            </DialogContent>
        </>
    );
};

export default NewJobForm;
