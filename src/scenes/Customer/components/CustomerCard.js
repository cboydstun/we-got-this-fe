import React, { useRef } from 'react';

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

const CustomerImage = styled(ButtonBase)({
    width: 128,
    height: 128,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage:
        'url(https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?)',

    '& p': {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        color: '#fff',
        visibility: 'hidden',
        opacity: 0,
    },

    '&:hover p': {
        opacity: 1,
        visibility: 'visible',
    },
});

const CustomerCard = ({ customer }) => {
    const classes = useStyles();
    const fileInput = useRef(null);

    let { address } = customer.locations[0];
    let fullAddress = `${address.street} ${address.city}, ${address.state} ${address.zipcode}`;

    return (
        <Grid container spacing={2}>
            <Grid item>
                <input
                    type="file"
                    ref={fileInput}
                    id="imgUpload"
                    style={{ display: 'none' }}
                />
                <CustomerImage onClick={() => fileInput.current.click()}>
                    <p>Click to change</p>
                </CustomerImage>
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
