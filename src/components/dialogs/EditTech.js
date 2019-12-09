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

export default function EditTech({ isEditing, tech, handleChange, handleCancel, handleSave, open }) {
    const classes = useStyles();
    const [{ teams }] = useStateValue();

    return tech ? (
        <Dialog open={open} maxWidth="xs">
            <DialogTitle>{isEditing ? 'Edit Technician' : 'New Technician'}</DialogTitle>
            <DialogContent>
                <TextField
                    id="techName"
                    name="displayName"
                    label="Technician Name"
                    value={tech.displayName}
                    className={classes.control}
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField
                    id="techEmail"
                    name="email"
                    label="Technician Email"
                    value={tech.email}
                    className={classes.control}
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField
                    select
                    id="techTeam"
                    name="teamId"
                    label="Assigned Team"
                    value={tech.teamId}
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
                        name="photo"
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