import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid, TextField } from '@material-ui/core';
import { withState } from '../../state';

import { actions } from '../../state/customer/customerActions';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

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

const CustomerForm = ({ errors, touched, values, status, setFieldValue }) => {
    const [state, setState] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        if (status) {
            setState([...state, status]);
        }
    }, [status, state]);

    console.log('Values: ', values, 'Status: ', status);

    return (
        <Form>
            <Grid container spacing={3}>
                <Grid item className={classes.column} xs={6}>
                    <Field
                        type="text"
                        name="name"
                        placeholder="First Name"
                        value={values.name}
                    />
                    {touched.name && errors.name && (
                        <p className="error">{errors.name}</p>
                    )}

                    <Field
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        render={({ field, value, onChange }) => (
                            <input
                                {...field}
                                type="tel"
                                placeholder="(713) 264-1320"
                                onChange={e => {
                                    let formatted = checkPhone(e);
                                    setFieldValue('phoneNumber', formatted);
                                }}
                            />
                        )}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                        <p className="error">{errors.phoneNumber}</p>
                    )}

                    <Field
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                    />
                    {touched.email && errors.email && (
                        <p className="error">{errors.email}</p>
                    )}

                    <Field
                        component="select"
                        className="payment-select"
                        name="payment"
                        placeholder="Choose a Payment Method"
                        value={values.payment}
                    >
                        <option>Choose a Payment Method </option>
                        <option value="cash">Cash</option>
                        <option value="check">Check</option>
                        <option value="debit/credit">Debit/Credit Card</option>
                        <option value="ach">ACH</option>
                    </Field>

                    <Field
                        component="select"
                        className="hearabout-select"
                        name="hearabout"
                        value={values.hearabout}
                    >
                        <option>How Did You Hear About Us</option>
                        <option value="customer referral">
                            Customer Referral
                        </option>
                        <option value="internet">Internet</option>
                        <option value="employee referral">
                            Employee Refferal
                        </option>
                    </Field>
                </Grid>

                <Grid item className={classes.column} xs={6}>
                    <Field
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={values.street}
                    />
                    {touched.street && errors.street && (
                        <p className="error">{errors.street}</p>
                    )}

                    <Field
                        type="text"
                        name="city"
                        placeholder="City"
                        value={values.city}
                    />
                    {touched.city && errors.city && (
                        <p className="error">{errors.city}</p>
                    )}

                    <Field
                        type="text"
                        name="region"
                        placeholder="State"
                        value={values.region}
                    />
                    {touched.region && errors.region && (
                        <p className="error">{errors.region}</p>
                    )}

                    <Field
                        type="number"
                        name="zipcode"
                        placeholder="Zip Code"
                        value={values.zipcode}
                    />
                    {touched.zipcode && errors.state && (
                        <p className="error">{errors.zipcode}</p>
                    )}

                    <textarea
                        type="text"
                        name="notes"
                        placeholder="Special Notes"
                        value={values.notes}
                    />
                    {touched.zipcode && errors.notes && (
                        <p className="error">{errors.notes}</p>
                    )}

                    <div className={classes.controls}>
                        {' '}
                        <button type="button">Cancel</button>{' '}
                        <button type="submit">Submit</button>{' '}
                    </div>
                </Grid>
            </Grid>
        </Form>
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

const CreateCustomerForm = withFormik({
    mapPropsToValues({
        name,
        email,
        phoneNumber,
        street,
        city,
        region,
        zipcode,
        notes,
    }) {
        return {
            name: name || '',
            email: email || '',
            phoneNumber: phoneNumber || '',
            street: street || '',
            city: city || '',
            region: region || 'ID',
            zipcode: zipcode || '',
            notes: notes || '',
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Must enter a First Name'),
        phoneNumber: Yup.string().required('Must enter a Phone Number'),
        street: Yup.string().required('Must enter an Address'),
        city: Yup.string().required('Must enter an City'),
        region: Yup.string().required('Must enter a State'),
        zipcode: Yup.number().required('Must enter an Zip'),
    }),

    handleSubmit(values, { setStatus, props, resetForm }) {
        actions.addCustomer(props.dispatch, { ...values }).then(res => {
            if (res == true) {
                console.log('redirecting');
            }
        });
        resetForm();
    },
})(CustomerForm);

export default withState(CreateCustomerForm);
