import React from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        '& h3': {
            color: 'red',
        },
    
        'background': 'red',
    }
    
});

const TechCard = ({ displayName, photoUrl }) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <img src={photoUrl} alt='Test' />
            <h3>{displayName}</h3>
        </Card>
    );
};

export default TechCard;