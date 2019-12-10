import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

import NewJobForm from '../forms/NewJobForm';
import { useStateValue } from '../../state';

import { actions } from '../../state/jobs/jobsActions';

export default function NewJobDialog() {
    const [open, setOpen] = useState(false);
    const [{ jobs }, dispatch] = useStateValue();
    const handleOpen = () => {
        actions.setNewServiceFormOpen(dispatch, true);
    };
    const handleClose = () => {
        actions.setNewServiceFormOpen(dispatch, false);
    };

    return (
        <div>
            <Dialog
                open={jobs.newServiceFormOpen}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="xs"
            >
                <NewJobForm handleClose={handleClose} />
            </Dialog>
        </div>
    );
}
