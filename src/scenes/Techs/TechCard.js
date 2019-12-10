import React from 'react';
import techService from '../../state/tech/techService';
import { useService } from '../../state';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../state';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '330px',
        maxHeight: '120px',
        background: props => props.disabled && '#dcdbdb',

        '& *': {
            margin: '0',
            padding: '0',
        },

        '& button': {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },

        '& .photo': {
            maxWidth: '120px',
        },
    },

    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: '160px',
    },

    controls: {
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        paddingTop: theme.spacing(1),
        '& *': {
            // marginLeft: theme.spacing(1),
            // marginRight: theme.spacing(1),
        },
    },
}));

const TechCard = ({ docId, displayName, photoUrl, disabled, team, handleEdit }) => {
    const classes = useStyles({ disabled });
    const [, dispatch] = useStateValue();
    const service = useService(techService, dispatch);

    const handleArchive = () => service.setTechDisabled(docId, !disabled);

    return (
        <div className={classes.root}>
            <img className="photo" src={photoUrl} alt={displayName} />
            <div className={classes.info}>
                <h2>{displayName}</h2>
                <p>{team && team.name}</p>
                <div className={classes.controls}>
                    <Button onClick={handleArchive}>{disabled ? 'Activate' : 'Archive'}</Button>
                    <Button onClick={() => handleEdit(docId)} disabled={disabled}>Edit</Button>
                </div>
            </div>
        </div>
    );
};

export default TechCard;
