import React, { useEffect } from 'react';
import { Grid, Button, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TechCard from './TechCard';
import { useStateValue } from '../../state';
import { actions as teamActions } from '../../state/team/teamActions';
import { useService } from '../../state';
import techService from '../../state/tech/techService';

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        '& *': {
            marginRight: theme.spacing(10),
        }
    },
}));

const Techs = () => {
    const classes = useStyles();
    const [{ techs }, dispatch] = useStateValue();
    const service = useService(techService, dispatch);

    useEffect(() => {
        teamActions.getAllTeams(dispatch);
        service.getAllTechs();
    }, []);

    return (
        <>
            <div className={classes.header}>
                <h1>Technicians</h1>
                <FormControl>
                    <InputLabel id="team">Team</InputLabel>
                    <Select displayEmpty>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem>Ten</MenuItem>
                        <MenuItem>Twenty</MenuItem>
                        <MenuItem>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained">New Tech</Button>
            </div>
            <Grid container xs={12} spacing={3} justify='space-between' >
                {
                    techs && techs.techs && techs.techs.map((tech, index) => {
                        return (
                            <Grid item sm={12} md={5} key={index}>
                                <TechCard {...tech} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    );
};

export default Techs;