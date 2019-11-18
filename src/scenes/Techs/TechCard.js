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
        background: props => props.disabled && '#a4a4a4',

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

const TechCard = ({ docId, displayName, photoUrl, disabled }) => {
    const classes = useStyles({ disabled });
    const [{ teams }, dispatch] = useStateValue();
    const service = useService(techService, dispatch);

    const handleTeamChange = e => service.addTechToTeam(docId, e.target.value);
    const handleArchiveClick = () => service.archiveTech(docId);

    return (
        <Card className={classes.root}>
            <img className="photo" src={photoUrl} alt={displayName} />
            <div className={classes.info}>
                <h2>{displayName}</h2>
                <FormControl className={classes.dropdown}>
                    <InputLabel id="team">Team</InputLabel>
                    <Select displayEmpty onChange={handleTeamChange}>
                        {
                            teams && teams.teams.map(team => {
                                return <MenuItem value={team.docId} key={team.docId}>{team.name}</MenuItem>
                            })
                        }
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
