import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

import CreateCustomerForm from '../forms/CreateCustomerForm';

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
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                New Customer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle>Create New Customer</DialogTitle>
                <DialogContent>
                    <CreateCustomerForm />
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Create!</Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
}
