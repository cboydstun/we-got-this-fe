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
import NewCustomerForm from '../forms/NewCustomerForm';

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
            <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleOpen}
            >
                New Customer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="sm"
                scroll="body"
            >
                <DialogTitle>Create New Customer</DialogTitle>
                <DialogContent>
                    <NewCustomerForm />
                </DialogContent>
            </Dialog>
        </div>
    );
}
