import React, { useState, useEffect } from 'react';
import { makeStyles, TextareaAutosize } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withState } from '../../state';

import { actions } from '../../state/customer/customerActions';
import { Form, Field, withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { classExpression } from '../../../node_modules/@babel/types';

const useStyles = makeStyles({
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    marginBottom: {
        marginBottom: '30px;',
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    inputWidth: {
        width: '300px',
        height: '30px',
        cursor: 'pointer',
    },
    buttonStyle: {
        height: '40px',
        width: '65px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '15px'
    }
});

const UserForm = ({ errors, touched, values, status, setFieldValue }) => {
    const [state, setState] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        if (status) {
            setState([...state, status]);
        }
    }, [status, state]);

    console.log('Values: ', values, 'Status: ', status);

    return (
        <Form className={classes.marginBottom}>
            <Grid container spacing={3}>
                <Grid item className={classes.column} xs={6}>
                    <Field
                        className={classes.inputWidth}
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
                                className={classes.inputWidth}
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
                        className={classes.inputWidth}
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
                        className={classes.inputWidth}
                        name="payment"
                        placeholder="Choose a Payment Method"
                        value={values.payment}
                    >
                        <option>Choose a type </option>
                        <option value="cash">Admin</option>
                        <option value="check">User</option>

                        
            
                    </Field>
                        <div className={classes.marginBottom}>
                            <button className={classes.buttonStyle} type="button">Cancel</button>{' '}
                            <button className={classes.buttonStyle} type="submit">Submit</button>{' '}
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

const EditUserForm = withFormik({
    mapPropsToValues({
        name,
        email,
        phoneNumber,
        type,
        
    }) {
        return {
            name: name || '',
            email: email || '',
            phoneNumber: phoneNumber || '',
            type: type || '',
            
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Must enter a Name'),
        phoneNumber: Yup.string().required('Must enter a Phone Number'),
        email: Yup.string().required('Must enter an Email'),
        type: Yup.string().required('Must select a Type'),
        
    }),

    handleSubmit(values, { setStatus, props, resetForm }) {
        actions.addCustomer(props.dispatch, { ...values }).then(res => {
            if (res == true) {
                console.log('redirecting');
            }
        });
        resetForm();
    },
})(UserForm);

export default withState(EditUserForm);
