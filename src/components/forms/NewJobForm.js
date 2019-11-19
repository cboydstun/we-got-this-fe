import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../state';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, MenuItem, Menu } from '@material-ui/core';
import { actions } from '../../state/customer/customerActions';

import zipcodes from '../../constants/zipcodes';

const useStyles = makeStyles(theme => ({
    textField: {
        width: '100%',
    },
}));

const NewJobForm = () => {
    const [loading, setLoading] = useState(true);
    const [{ customers }, dispatch] = useStateValue();

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
        <form>
            <TextField
                select
                id="zipcode"
                label="Zipcode"
                margin="normal"
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
                id="customer"
                label="Customer"
                margin="normal"
                className={classes.textField}
            >
                {/* {!customers.customers.length ? (
                    <MenuItem>Loading...</MenuItem>
                ) : (
                    <> */}
                {customers.customers &&
                    customers.customers.map((customer, index) => (
                        <MenuItem key={index} value={customer.name}>
                            {customer.name}
                        </MenuItem>
                    ))}
                {/* </>
                )} */}
            </TextField>
        </form>
    );
};

export default NewJobForm;
