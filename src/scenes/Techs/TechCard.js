import React from 'react';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    personalInfo: {
        display: 'flex',

        '& .photo': {
            maxWidth: '150px',
            marginRight: theme.spacing(2)
        }
    },

    employmentInfo: {
        padding: theme.spacing(2),
    },

    controls: {
        textAlign: 'right',
    },
}));

const TechCard = ({ displayName, photoUrl, address, city, state, zip, phone }) => {
    const classes = useStyles();

    return (
        <Card>
            <div className={classes.personalInfo}>
                <img className="photo" src={photoUrl} alt={displayName} />
                <div>
                    <h2>{displayName}</h2>
                    <span>{address}</span>
                    <br />
                    <span>{city}, {state} {zip}</span>
                    <br />
                    <span>{phone}</span>
                </div>
            </div>
            <div className={classes.employmentInfo}>
                <div className={classes.controls}>
                    <Button variant="contained">Edit</Button>
                </div>
            </div>
        </Card>
    );
};

export default TechCard;