import React, { useEffect, useState } from 'react';
import { Grid, Button, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TechCard from './TechCard';
import { useStateValue } from '../../state';
import teamService from '../../state/team/teamService';
import { useService } from '../../state';
import techService from '../../state/tech/techService';
import { routes } from '../../constants/routes';
import EditTech from '../../components/dialogs/EditTech';

const useStyles = makeStyles(theme => ({
    filter: {
        width: '100%'
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
    const services = { tech: useService(techService, dispatch), team: useService(teamService, dispatch) }
    const [filter, setFilter] = useState('all');
    const [techToEdit, setTechToEdit] = useState();

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const handleCancel = () => setEditDialogOpen(false);
    const handleSave = () => setEditDialogOpen(false);

    const handleFilterChange = e => setFilter(e.target.value);
    const handleNewTech = () => history.push(routes.CREATE_TECH);
    const handleEdit = techId => {
        setEditDialogOpen(true);
        setTechToEdit(techs.techs.find(tech => tech.docId === techId));
    };

    useEffect(() => {
        services.team.getAllTeams();
        services.tech.getAllTechs();
    }, []);

    return (
        <>
            <EditTech open={editDialogOpen} handleCancel={handleCancel} handleSave={handleSave} tech={techToEdit} />
            <Grid container xs={12} justify="space-between" className={classes.header}>
                <Grid item xs={4}>
                    <h1>Technicians</h1>
                </Grid>
                <Grid item xs={4}>
                    <FormControl>
                        <Select className={classes.filter} value={filter} onChange={handleFilterChange}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="disabled">Archived</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" onClick={handleNewTech}>New Tech</Button>
                </Grid>
            </Grid>
            <Grid container xs={12} spacing={3} justify="space-between" >
                {
                    techs && techs.techs && techs.techs.filter(tech => filters[filter](tech))
                        .map((tech, index) => {
                            return (
                                <Grid item sm={12} md={5} key={index}>
                                    <TechCard handleEdit={handleEdit} {...tech} />
                                </Grid>
                            )
                        })
                }
            </Grid>
        </>
    );
};

export default Techs;