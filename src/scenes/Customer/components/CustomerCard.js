import React, { useState, useEffect, useRef } from 'react';

//Components
import EditCustomerForm from '../../../components/forms/EditCustomerForm';
import DialogWrapper from '../../../components/dialogs/DialogWrapper';
import CustomerImage from './CustomerImage';
import {
    Grid,
    IconButton,
    Box,
    makeStyles,
    Typography,
    Paper,
} from '@material-ui/core';

//styles
import { styled } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

//State
import { useStateValue } from '../../../state';
import { actions } from '../../../state/customer/customerActions';

const useStyles = makeStyles(theme => ({
    root: {
        width: '50%',
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
    const [, dispatch] = useStateValue();

    useEffect(() => {
        if (!customer.img) {
            actions.getCustomerImage(dispatch, customer.docId);
        }
    }, []);

    let { address } = customer.locations[0];
    let fullAddress = `${address.street} ${address.city}, ${address.state} ${address.zipcode}`;

    return (
        <Grid component={Paper} container spacing={2} className={classes.root}>
            <Grid item>
                <CustomerImage
                    img={customer.img}
                    //    https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?)'
                />
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
                            dialogContent={close => (
                                <EditCustomerForm handleClose={close} />
                            )}
                            title="Create New Customer"
                            size="sm"
                        />
                    </Title>
                    <p>{fullAddress}</p>
                    <p>{customer.contact.phone}</p>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CustomerCard;
