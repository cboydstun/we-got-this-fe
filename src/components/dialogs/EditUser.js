import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from '@material-ui/core';

import EditUserForm from '../forms/EditUserForm';
import EditIcon from '@material-ui/icons/Edit';

export default function NewUser({ user }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <IconButton onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <EditUserForm user={user} />
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Create!</Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
}
