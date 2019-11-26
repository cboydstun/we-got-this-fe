import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

const DialogWrapper = ({ children, trigger, title, size }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {trigger(handleOpen)}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={size}
                scroll="body"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        </div>
    );
};

export default DialogWrapper;
