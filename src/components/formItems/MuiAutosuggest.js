import React from 'react';
import PropTypes from 'prop-types';

//Components
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const MuiAutosuggest = props => {
    const [field, meta] = useField(props);

    console.log(field);

    return (
        <Autocomplete
            options={props.options}
            getOptionLabel={option => option[props.displayKey]}
            // renderOption={option => option[props.valueKey]}
            name={props.name}
            // value={field.value}
            onChange={(event, value) => {
                // console.log('Event', e, 'Value', value);
                let { target } = event;
                let newE = { ...event, target: { ...event.target, value } };
                field.onChange(newE);
            }}
            renderInput={params => (
                <TextField
                    {...params}
                    {...field}
                    {...props}
                    name={props.name}
                    label={props.label}
                    margin="none"
                    error={meta.touched && !!meta.error}
                    fullWidth
                />
            )}
        />
    );
};

MuiAutosuggest.propTypes = {
    options: PropTypes.array,
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
};

export default MuiAutosuggest;
