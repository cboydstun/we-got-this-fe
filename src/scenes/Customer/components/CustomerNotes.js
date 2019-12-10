import React from 'react';

//Components
import { Paper, Typography, Button, Box } from '@material-ui/core';

//Styling
import { styled, withTheme } from '@material-ui/core/styles';

const NotesCard = styled(withTheme(Paper))(props => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    padding: props.theme.spacing(1),
    margin: props.theme.spacing(1),
}));

const EditButton = styled(Button)({
    alignSelf: 'flex-end',
});

const CustomerNotes = ({ customer }) => {
    return (
        <NotesCard>
            <Box>
                <Typography variant="h6">Customer Notes</Typography>
                {customer.notes || 'No notes yet'}
            </Box>
            <EditButton color="primary">Edit</EditButton>
        </NotesCard>
    );
};

export default CustomerNotes;
