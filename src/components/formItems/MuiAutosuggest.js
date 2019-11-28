import React from 'react';
import PropTypes from 'prop-types';

//Components
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const MuiAutosuggest = props => {
    const [field, meta] = useField(props);

    return (
        <Autocomplete
            freeSolo
            options={props.options.map(option => option.display)}
            value={field.value}
            renderInput={params => (
                <TextField
                    {...params}
                    type={props.type}
                    name={props.name}
                    label={props.label}
                    margin="none"
                    error={meta.touched && !!meta.error}
                    value={field.value}
                    onChange={field.onChange}
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
