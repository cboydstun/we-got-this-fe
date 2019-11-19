import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';

import EditCustomerForm from '../forms/EditCustomerForm';

export default function NewCustomer() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleOpen}><EditIcon /></IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <EditCustomerForm />
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Create!</Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
}
