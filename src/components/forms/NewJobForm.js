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
} from '@material-ui/core';
import { actions } from '../../state/customer/customerActions';
import { useForm } from '../../hooks/useForm';

import zipcodes from '../../constants/zipcodes';

const useStyles = makeStyles(theme => ({
    textField: {
        width: '100%',
    },
}));

const typeOptions = ['Recurring', 'Groupon', 'One-off'];

const NewJobForm = ({ handleClose }) => {
    const [loading, setLoading] = useState(true);
    const [{ customers }, dispatch] = useStateValue();

    const submitHandler = values => {
        console.log(values);
    };

    const [formValues, handleChange, handleSubmit] = useForm(
        { customer: '', zipcode: '', cleaningType: '' },
        submitHandler
    );

    const classes = useStyles();

    useEffect(() => {
        if (!customers.customers.length) {
            actions.getCustomers(dispatch).then(res => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [customers.customers.length, dispatch]);

    return (
        <>
            <DialogContent>
                <DialogContentText>
                    If you wish to see all unscheduled times, leave everything
                    blank and just click schedule
                </DialogContentText>
                <form>
                    <TextField
                        select
                        id="customer"
                        name="customer"
                        label="Customer"
                        margin="normal"
                        value={formValues.customer}
                        onChange={handleChange}
                        className={classes.textField}
                    >
                        {customers.customers &&
                            customers.customers.map((customer, index) => (
                                <MenuItem key={index} value={customer.docId}>
                                    {customer.name}
                                </MenuItem>
                            ))}
                    </TextField>
                    <TextField
                        select
                        id="zipcode"
                        name="zipcode"
                        label="Zipcode"
                        margin="normal"
                        value={formValues.zipcode}
                        onChange={handleChange}
                        className={classes.textField}
                    >
                        {zipcodes.map(zipcode => (
                            <MenuItem key={zipcode} value={zipcode}>
                                {zipcode}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        id="type"
                        name="cleaningType"
                        label="Cleaning Type"
                        margin="normal"
                        value={formValues.cleaningType}
                        onChange={handleChange}
                        className={classes.textField}
                    >
                        {typeOptions.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        handleSubmit();
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
