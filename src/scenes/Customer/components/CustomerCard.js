import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid, ButtonBase } from '@material-ui/core';

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
                    <h2>{customer.name}</h2>
                    <p>123 Cherry St. Boise, ID 8345</p>
                    <p>(234) 546-1234</p>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CustomerCard;
