import React from 'react';
import { Grid, ButtonBase, Box, makeStyles } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import EditCustomer from '../../../components/dialogs/EditCustomer';

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
                        <h2>{customer.name}</h2>
                        <EditCustomer />
                    </Title>
                    <p>{fullAddress}</p>
                    <p>{customer.contact.phone}</p>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CustomerCard;
