import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useStateValue } from '../../state';
//https://github.com/bvaughn/react-window

const MuiCustomerAutoFillInput = ({ label, ...props }) => {
    const [{ customers }] = useStateValue();
    const [field, meta] = useField(props);

    return (
        <Autocomplete
            options={customers.customers}
            getOptionLabel={option => option.name}
            style={{ width: '100%' }}
            renderInput={params => (
                <TextField
                    type={props.type}
                    name={props.name}
                    label={label}
                    margin="none"
                    error={meta.touched && !!meta.error}
                    {...params}
                    {...field}
                    {...props}
                    style={{ width: '100%' }}
                />
            )}
        />
    );
};

export default MuiCustomerAutoFillInput;
