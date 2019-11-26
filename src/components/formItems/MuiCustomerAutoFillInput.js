import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

//https://github.com/bvaughn/react-window

const customers = [
    {
        name: 'Jane Smith',
    },
    {
        name: 'Kendall Ludlow',
    },
    {
        name: 'Mary Jane',
    },
    {
        name: 'Vericona Hugnsnif',
    },
    {
        name: 'Susan Farts',
    },
];

const MuiCustomerAutoFillInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Autocomplete
            options={customers}
            getOptionLabel={option => option.name}
            style={{ width: '100%' }}
            renderInput={params => (
                <TextField
                    type={props.type}
                    name={props.name}
                    label={label}
                    margin="dense"
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
