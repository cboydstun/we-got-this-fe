import React from 'react';
import { useField } from 'formik';
import { TextField, MenuItem } from '@material-ui/core';

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
                <MenuItem component="option" value="2 Weeks" />
                <MenuItem component="option" value="Monthly" />
                <MenuItem component="option" value="3 Weeks" />
            </datalist>
        </>
    );
};

export default MuiTextInput;
