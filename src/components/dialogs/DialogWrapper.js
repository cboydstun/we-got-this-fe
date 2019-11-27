import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const DialogWrapper = ({ children, trigger, title, size }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

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
                <DialogTitle>
                    <Typography variant="h6">
                        {title}
                        <IconButton
                            aria-label="close"
                            className={classes.closeButton}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Typography>
                </DialogTitle>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        </div>
    );
};

export default DialogWrapper;
