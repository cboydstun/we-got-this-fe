import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

import NewJobForm_02 from '../forms/NewJobForm_02';
import { useStateValue } from '../../state';

import { actions } from '../../state/jobs/jobsActions';

export default function NewJobDialog() {
    const [open, setOpen] = useState(false);
    const [{ jobs }, dispatch] = useStateValue();
    const handleOpen = () => {
        actions.setNewServiceForm_02Open(dispatch, true);
    };
    const handleClose = () => {
        actions.setNewServiceForm_02Open(dispatch, false);
    };

    return (
        <div>
            <Dialog
                open={jobs.newServiceForm_02Open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="xs"
            >
                <NewJobForm_02 handleClose={handleClose} />
            </Dialog>
        </div>
    );
}
