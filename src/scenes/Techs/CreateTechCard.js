import React, { useState, useEffect } from 'react';
import {
    Card,
    Button,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../state';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',

        '& .photo': {
            maxWidth: '150px',
            height: '100%',
            cursor: 'pointer',
        },
    },
    info: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    imageInput: {
        display: 'none',
    }
}));

const CreateTechCard = ({ displayName, email, teamId, onChange, index }) => {
    const classes = useStyles();
    const [{ teams }] = useStateValue();
    const [data, setData] = useState({ displayName, email, teamId });

    const handleChange = e => {
        const newData = { ...data, [e.target.name]: e.target.files && e.target.files[0] || e.target.value };

        if (onChange) {
            onChange(newData)
        };

        setData(newData);
    };

    return (
        <Card className={classes.root}>
            <label htmlFor={`photo_${index}`}>
                <img className="photo" src="http://via.placeholder.com/150x150" alt="test" />
            </label>
            <input className={classes.imageInput} name="photo" id={`photo_${index}`} type="file" onChange={handleChange} />
            <div className={classes.info}>
                <TextField id="displayName" name="displayName" label="Name" value={data.displayName} onChange={handleChange} />
                <TextField id="email" name="email" label="Email" value={data.email} onChange={handleChange} />
                <FormControl>
                    <InputLabel>Team</InputLabel>
                    <Select displayEmpty onChange={handleChange} value={data.teamId} id="teamId" name="teamId">
                        {
                            teams && teams.teams.map(team => {
                                return <MenuItem value={team.docId} key={team.docId}>{team.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </div>
        </Card>
    );
};

export default CreateTechCard;
