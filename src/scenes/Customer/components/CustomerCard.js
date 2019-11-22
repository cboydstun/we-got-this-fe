import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid, ButtonBase } from '@material-ui/core';
import EditCustomer from '../../../components/dialogs/EditCustomer';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const CustomerCard = ({ customer }) => {
    const classes = useStyles();

    let { address } = customer.locations[0];
    let fullAddress = `${address.street} ${address.city}, ${address.state} ${address.zipcode}`;

    return (
        <Grid container spacing={2}>
            <Grid item>
                <ButtonBase className={classes.image}>
                    <img
                        className={classes.img}
                        alt="img"
                        src="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?"
                    />
                </ButtonBase>
            </Grid>
            <Grid item xs={6} sm container>
                <Grid item xs>
                    <h2>{customer.name}<EditCustomer /></h2>
                    <p>{fullAddress}</p>
                    <p>{customer.contact.phone}</p>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CustomerCard;
