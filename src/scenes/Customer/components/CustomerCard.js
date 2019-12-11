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
        width: '40%',
        margin: theme.spacing(1),
    },
}));

const Title = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
});

/*
    Displays information about a specific customer.

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
const CustomerCard = ({ customer }) => {
    const classes = useStyles();
    const [, dispatch] = useStateValue();

    useEffect(() => {
        if (!customer.img) {
            actions.getCustomerImage(dispatch, customer.docId);
        }
    }, [customer.docId, customer.img, dispatch]);

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
