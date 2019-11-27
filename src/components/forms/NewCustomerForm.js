import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid, DialogContent, DialogActions, Button } from '@material-ui/core';
import { actions } from '../../state/customer/customerActions';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MuiTextInput from '../formItems/MuiTextInput';
import MuiPhoneInput from '../formItems/MuiPhoneInput';
import MuiSingleSelectInput from '../formItems/MuiSingleSelectInput';
import MuiTextAreaInput from '../formItems/MuiTextAreaInput';
import paymentOptions from '../../constants/paymentOptions';
import referralOptions from '../../constants/referralOptions';

import { useStateValue } from '../../state';

const useStyles = makeStyles({
    button: {
        marginTop: 20,
        marginBottom: 15,
        float: 'right',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
});

const CustomerForm = () => {
    const [, dispatch] = useStateValue();
    const classes = useStyles();

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                phoneNumber: '',
                street: '',
                city: '',
                region: 'ID',
                zipcode: '',
                notes: '',
                payment: '',
                hearabout: '',
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required('Must enter a First Name'),
                email: Yup.string().email(),
                phoneNumber: Yup.string().required('Must enter a Phone Number'),
                street: Yup.string().required('Must enter an Address'),
                city: Yup.string().required('Must enter an City'),
                region: Yup.string().required('Must enter a State'),
                zipcode: Yup.number().required('Must enter an Zip'),
            })}
            onSubmit={(values, { resetForm }) => {
                actions.addCustomer(dispatch, { ...values }).then(res => {
                    if (res == true) {
                        console.log('redirecting');
                    }
                });
                resetForm();
            }}
        >
            <Form>
                <Grid container spacing={3}>
                    <Grid item className={classes.column} xs={6}>
                        <MuiTextInput name="name" label="Name" type="text" />
                        <MuiTextInput name="email" label="Email" type="text" />
                        <MuiPhoneInput
                            name="phoneNumber"
                            label="Phone Number"
                            type="text"
                        />

                        <MuiTextInput
                            name="street"
                            label="Street"
                            type="text"
                        />
                        <MuiTextInput name="city" label="City" type="text" />
                        <MuiTextInput name="region" label="State" type="text" />
                        <MuiTextInput
                            name="zipcode"
                            label="Zip"
                            type="number"
                        />
                    </Grid>
                    <Grid item className={classes.column} xs={6}>
                        <MuiSingleSelectInput
                            name="payment"
                            label="Payment Method"
                            data={paymentOptions}
                        />
                        <MuiSingleSelectInput
                            name="hearabout"
                            label="How did you hear about us?"
                            data={referralOptions}
                        />
                        <MuiTextAreaInput
                            name="notes"
                            label="Notes"
                            type="text"
                        />
                    </Grid>
                </Grid>
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Create Customer
                </Button>
            </Form>
        </Formik>
    );
};

export default CustomerForm;
