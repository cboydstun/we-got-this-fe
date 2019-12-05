import React, { useState } from 'react';
import { useStateValue } from '../../state';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@material-ui/core';

const useStyles = makeStyles({
    control: {
        width: '100%',
    },

    headshotContainer: {
        display: 'flex',
        justifyContent: 'space-around',
    },

    headshot: {
        borderRadius: '50%',
        maxWidth: '100px',
    },

    imageInput: {
        display: 'none',
    },

    uploadLabel: {
        display: 'flex',
        alignItems: 'center',
    },
})

export default function EditTech({ tech, handleCancel, handleSave, open }) {
    const classes = useStyles();
    const [{ teams }] = useStateValue();
    const [data, setData] = useState(tech);

    const handleChange = e => setData({ ...data, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });

    console.log('tech:', tech, 'data:', data)

    return tech ? (
        <Dialog open={open} maxWidth="xs">
            <DialogTitle>Edit Technician</DialogTitle>
            <DialogContent>
                <TextField
                    id="techName"
                    label="Technician Name"
                    value={data.displayName}
                    className={classes.control}
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField
                    id="techEmail"
                    label="Technician Email"
                    value={data.email}
                    className={classes.control}
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField
                    select
                    id="techTeam"
                    label="Assigned Team"
                    value={data.team && data.team.docId}
                    className={classes.control}
                    margin="normal"
                    onChange={handleChange}
                >
                    {
                        teams.teams.map(team => {
                            return <MenuItem key={team.docId} value={team.docId}>
                                {team.name}
                            </MenuItem>
                        })
                    }
                </TextField>
                <div className={classes.headshotContainer}>
                    <img className={classes.headshot} src={tech.photoUrl} alt={tech.displayName} />
                    <label className={classes.uploadLabel} htmlFor="techPhoto">
                        <Button component="span">Upload new image</Button>
                    </label>
                    <input
                        className={classes.imageInput}
                        name="techPhoto"
                        id="techPhoto"
                        type="file"
                        onChange={handleChange}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    ) : null;
};