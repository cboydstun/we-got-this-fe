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

/*
    Displays extra information about a customer and their needs,
    circumstances, requirements, etc.

    Example Props:
        "customer": {
            "docId": "I0G0og0tcoa0KUlrzxPK",
            "contact": "Object",
            "hearabout": null,
            "jobs": "Array[1]",
            "locations": "Array[1]",
            "name": "Zoe",
            "notes": "What a beautiful woman!",
            "payment": null,
            "paymentAmount": null,
            "schedule": null
        }
*/
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
