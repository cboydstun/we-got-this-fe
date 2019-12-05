import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid, TextField, Button, MenuItem } from '@material-ui/core';
import { withState } from '../../state';

import { actions } from '../../state/auth/authActions';
import { Form, withFormik, Formik } from 'formik';
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
        fontSize: '15px',
    },
});

const roles = ['admin', 'tech'];

const UserForm = ({ errors, touched, values, status, setFieldValue }) => {
    const [state, setState] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        if (status) {
            setState([...state, status]);
        }
    }, [status, state]);
    return (
        <Form className={classes.marginBottom}>
            <Grid container spacing={3}>
                <Grid item className={classes.column} xs={6}>
                    <TextField
                        type="text"
                        name="displayName"
                        placeholder="First Name"
                        value={values.displayName}
                    />
                    {touched.displayName && errors.displayName && (
                        <p className="error">{errors.displayName}</p>
                    )}

                    <TextField
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={values.phone}
                        onChange={e => {
                            let formatted = checkPhone(e);
                            setFieldValue('phone', formatted);
                        }}
                    />
                    {touched.phone && errors.phone && (
                        <p className="error">{errors.phone}</p>
                    )}

                    <TextField
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                    />
                    {touched.email && errors.email && (
                        <p className="error">{errors.email}</p>
                    )}

                    <TextField
                        select
                        className={classes.inputWidth}
                        name="role"
                        placeholder="Choose role"
                        value={values.role}
                    >
                        {roles.map(role => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Add in form error here for type */}

                    <div className={classes.marginBottom}>
                        <Button
                            variant="outlined"
                            color="secondar"
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
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
    mapPropsToValues({ displayName, email, phone, role, user }) {
        return {
            docId: user.docId || '',
            displayName: displayName || user.displayName || '',
            email: email || user.email || '',
            phone: phone || (user.phone && user.phone.primary) || '',
            role: role || 'tech',
        };
    },

    validationSchema: Yup.object().shape({
        displayName: Yup.string().required('Must enter a Name'),
        phone: Yup.string().required('Must enter a Phone Number'),
        email: Yup.string().required('Must enter an Email'),
        role: Yup.string().required('Must select at least 1 role'),
    }),

    handleSubmit(values, { setStatus, props, resetForm }) {
        actions.updateUser(props.dispatch, { ...values }).then(res => {
            if (res == true) {
                console.log('redirecting');
            }
        });
        resetForm();
    },
})(UserForm);

export default withState(EditUserForm);
