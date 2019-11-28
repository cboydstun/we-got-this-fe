import React, { useState } from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useField } from 'formik';

const options = [
    { label: '2 Weeks' },
    { label: '3 Weeks' },
    { label: 'Monthly' },
    { label: '6 Weeks' },
];

function renderInputComponent(inputProps) {
    const { inputRef = () => {}, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
            }}
            {...other}
        />
    );
}

const MuiAutosuggest = props => {
    const [field, meta] = useField(props);
    const [suggestions, setSuggestions] = useState([]);

    const getSuggestions = value => {
        const inputValue = value.toLowerCase();
        const inputLength = inputValue.length;

        if (inputLength === 0) {
            return [];
        } else {
            let suggestions = options.filter(
                option =>
                    option.label.toLowerCase().slice(0, inputLength) ===
                    inputValue
            );
            if (suggestions.length == 0) {
                return [{ label: 'No Options' }];
            } else {
                return suggestions;
            }
        }
    };

    const onSuggestionSelected = (event, { suggestion, suggestionValue }) => {
        field.onChange(event);
    };

    const getSuggestionValue = suggestion => suggestion.label;

    const renderSuggestion = suggestion => {
        return (
            <MenuItem component="div" key={suggestion.label}>
                {suggestion.label}
            </MenuItem>
        );
    };

    const handleSuggestions = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const clearSuggestions = () => {
        setSuggestions([]);
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={handleSuggestions}
            onSuggestionsClearRequested={clearSuggestions}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderSuggestionsContainer={options => (
                <Paper>{options.children}</Paper>
            )}
            onSuggestionSelected={onSuggestionSelected}
            inputProps={{
                type: props.type,
                name: props.name,
                margin: 'none',
                label: props.label,
                value: field.value || '',
                onChange: e => field.onChange(e),
            }}
            renderInputComponent={renderInputComponent}
        />
    );
};

export default MuiAutosuggest;
