import React from 'react';

//Components
import EditCustomerForm from '../../../components/forms/EditCustomerForm';
import DialogWrapper from '../../../components/dialogs/DialogWrapper';
import {
    Grid,
    ButtonBase,
    IconButton,
    Box,
    makeStyles,
    Typography,
} from '@material-ui/core';

//styles
import { styled } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    image: {
        width: 128,
        height: 128,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
            'url(https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?)',
    },
}));

const Title = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
});

const CustomerCard = ({ customer }) => {
    const classes = useStyles();

    let { address } = customer.locations[0];
    let fullAddress = `${address.street} ${address.city}, ${address.state} ${address.zipcode}`;

    return (
        <Grid container spacing={2}>
            <Grid item>
                <ButtonBase className={classes.image} />
            </Grid>
            <Grid item xs={6} sm container>
                <Grid item xs>
                    <Title>
                        <Typography variant="h6">{customer.name}</Typography>
                        <DialogWrapper
                            trigger={click => (
                                <IconButton
                                    size="small"
                                    onClick={() => click()}
                                >
                                    <EditIcon />
                                </IconButton>
                            )}
                            title="Create New Customer"
                            size="sm"
                        >
                            <EditCustomerForm />
                        </DialogWrapper>
                    </Title>
                    <p>{fullAddress}</p>
                    <p>{customer.contact.phone}</p>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CustomerCard;
