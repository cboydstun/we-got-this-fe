import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TechCard from './TechCard';
import { useStateValue, useService } from '../../state';
import teamService from '../../state/team/teamService';
import techService from '../../state/tech/techService';
import { routes } from '../../constants/routes';

const useStyles = makeStyles(theme => ({
    filter: {
        width: '100%',
    },
}));

const filters = {
    all: () => true,
    active: tech => !tech.disabled,
    disabled: tech => tech.disabled,
};

const Techs = ({ history }) => {
    const classes = useStyles();
    const [{ techs }, dispatch] = useStateValue();
    const services = {
        tech: useService(techService, dispatch),
        team: useService(teamService, dispatch),
    };
    const [filter, setFilter] = useState('all');

    const handleFilterChange = e => setFilter(e.target.value);
    const handleNewTechClick = () => history.push(routes.CREATE_TECH);

    useEffect(() => {
        services.team.getAllTeams();
        services.tech.getAllTechs();
    }, []);

    return (
        <>
            <Grid
                container
                xs={12}
                justify="space-between"
                className={classes.header}
            >
                <Grid item xs={4}>
                    <h1>Technicians</h1>
                </Grid>
                <Grid item xs={4}>
                    <FormControl>
                        <Select
                            className={classes.filter}
                            value={filter}
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="disabled">Archived</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" onClick={handleNewTechClick}>
                        New Tech
                    </Button>
                </Grid>
            </Grid>
            <Grid container xs={12} spacing={3} justify="space-between">
                {techs &&
                    techs.techs &&
                    techs.techs
                        .filter(tech => filters[filter](tech))
                        .map((tech, index) => {
                            return (
                                <Grid item sm={12} md={5} key={index}>
                                    <TechCard {...tech} />
                                </Grid>
                            );
                        })}
            </Grid>
        </>
    );
};

export default Techs;
