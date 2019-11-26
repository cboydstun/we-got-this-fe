import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid, TextField } from '@material-ui/core';
import { withState } from '../../state';

import { actions } from '../../state/customer/customerActions';
import { Form, Field, Formik, withFormik } from 'formik';
import * as Yup from 'yup';
import MuiTextInput from '../formItems/MuiTextInput';
import MuiPhoneInput from '../formItems/MuiPhoneInput';
import MuiSingleSelectInput from '../formItems/MuiSingleSelectInput';
import MuiCustomerAutoFillInput from '../formItems/MuiCustomerAutoFillInput';
import paymentOptions from '../../constants/paymentOptions';

import { useStateValue } from '../../state';

const useStyles = makeStyles({
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const CustomerForm = () => {
    const [state, setState] = useState([]);
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
                // actions.addCustomer(dispatch, { ...values }).then(res => {
                //     if (res == true) {
                console.log('redirecting');
                //     }
                // });
                resetForm();
            }}
        >
            <Form>
                <MuiCustomerAutoFillInput
                    name="customer"
                    label="Customer"
                    type="text"
                />
                <MuiTextInput name="name" label="Name" type="text" />
                <MuiTextInput name="email" label="Email" type="text" />
                <MuiPhoneInput
                    name="phoneNumber"
                    label="Phone Number"
                    type="tel"
                />
                <MuiTextInput name="street" label="Street" type="text" />
                <MuiTextInput name="city" label="City" type="text" />
                <MuiTextInput name="region" label="State" type="text" />
                <MuiTextInput name="zipcode" label="Zip" type="number" />
                <MuiSingleSelectInput
                    name="payment"
                    label="Payment Method"
                    data={paymentOptions}
                />
            </Form>
        </Formik>
    );
};

export default CustomerForm;
