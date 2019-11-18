import React from 'react';
import techService from '../../state/tech/techService';
import { useService } from '../../state';
import {
    Card,
    Button,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../state';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',

        '& .photo': {
            maxWidth: '150px',
        },
    },

    info: {
        width: '100%',
        padding: theme.spacing(2),
        '& h2': {
            marginTop: '0',
        },
    },

    dropdown: {
        width: '100%',
    },

    controls: {
        width: '100%',
        textAlign: 'center',
        paddingTop: theme.spacing(2),
        '& *': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    },
}));

const TechCard = ({ displayName, photoUrl, disabled }) => {
    const classes = useStyles();
    const service = useService(techService);

    const handleTeamChange = e =>
        service.addTechToTeam('example', e.target.value.toString());
    const handleArchiveClick = () =>
        service.archiveTech('jq5Ijo6dpsgLOFsOTMeq');

    return (
        <Card className={classes.root}>
            <img className="photo" src={photoUrl} alt={displayName} />
            <div className={classes.info}>
                <h2>{displayName}</h2>
                <FormControl className={classes.dropdown}>
                    <InputLabel id="team">Team</InputLabel>
                    <Select displayEmpty value={3} onChange={handleTeamChange}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="2UHQpb30P1KtFKe5F5qK">Team A</MenuItem>
                        <MenuItem value="Ewjs46GMdKVqBDPsqzK8">Team B</MenuItem>
                        <MenuItem value="MnZEZUNX03kM3bUYVbH6">Team C</MenuItem>
                    </Select>
                </FormControl>
                <div className={classes.controls}>
                    <Button onClick={handleArchiveClick}>Archive</Button>
                    <Button>Edit</Button>
                </div>
            </div>
        </Card>
    );
};

export default TechCard;
