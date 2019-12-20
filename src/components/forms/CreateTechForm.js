import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, Button } from '@material-ui/core';
import { useStateValue, useService } from '../../state';
import teamService from '../../state/team/teamService';
import techService from '../../state/tech/techService';
import CreateTechCard from '../../scenes/Techs/CreateTechCard';
import { routes } from '../../constants/routes';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    controls: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    topControls: {
        textAlign: 'right',
    },
    bottomControls: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

const CreateTechForm = ({ history }) => {
    const classes = useStyles();
    const [{ teams }, dispatch] = useStateValue();
    const services = { team: useService(teamService, dispatch), tech: useService(techService, dispatch) };
    const [techs, setTechs] = useState([
        { displayName: '', email: '', teamId: '' },
    ]);

    const handleChange = (tech, index) => {
        const newTechs = [...techs];
        newTechs.splice(index, 1, tech);
        setTechs(newTechs);
    };

    const handleSave = async () => {
        await Promise.all(techs.map(tech => services.tech.createTech(tech)));
        history.push(routes.TECHS);
    }
    const handleAddTech = () => setTechs([...techs, { displayName: '', email: '', teamId: '' }]);

    useEffect(() => {
        services.team.getAllTeams();
    }, []);

    return (
        <div className={classes.root}>
            <Grid container xs={7} spacing={3}>
                {
                    techs.map((tech, index) => {
                        return (
                            <Grid item xs={7} key={index}>
                                <CreateTechCard
                                    onChange={newTech => handleChange(newTech, index)}
                                    index={index}
                                    {...tech}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Grid container xs={7} spacing={3}>
                <Grid item xs={7} justify="flex-end">
                    <div className={classes.controls}>
                        <div className={classes.topControls}>
                            <Button onClick={handleAddTech}>Add another technician</Button>
                        </div>
                        <div className={classes.bottomControls}>
                            <Button variant="contained">Cancel</Button>
                            <Button variant="contained" onClick={handleSave}>Save</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>

        </div>
    );
};

export default CreateTechForm;