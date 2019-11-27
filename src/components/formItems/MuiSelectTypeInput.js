import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

const MuiTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <TextField
                type={props.type}
                name={props.name}
                label={label}
                margin="none"
                error={meta.touched && !!meta.error}
                {...field}
                {...props}
                inputProps={{
                    list: 'schedule',
                }}
                style={{ width: '100%' }}
            />
            <datalist id="schedule">
                <option value="2 Weeks">2 Weeks</option>
                <option value="Monthly">Monthly</option>
                <option value="3 Weeks">3 Weeks</option>
            </datalist>
        </>
    );
};

export default MuiTextInput;
