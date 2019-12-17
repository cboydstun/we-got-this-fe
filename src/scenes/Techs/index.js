import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    Select,
    MenuItem,
    FormControl,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TechCard from './TechCard';
import { useStateValue } from '../../state';
import teamService from '../../state/team/teamService';
import { useService } from '../../state';
import techService from '../../state/tech/techService';
import EditTech from '../../components/dialogs/EditTech';

const useStyles = makeStyles(theme => ({
    header: {
        '& > *': {
            display: 'flex',
            alignItems: 'center',
        },
    },

    techs: {
        '& > *': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),

        },
    },

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
    const services = { tech: useService(techService, dispatch), team: useService(teamService, dispatch) }
    const [filter, setFilter] = useState('all');

    const [editDialogData, setEditDialogData] = useState({ open: false });
    const handleCancel = () => setEditDialogData({ ...editDialogData, open: false });
    const handleSave = async () => {
        const saveFunction = editDialogData.isEditing ? services.tech.updateTech : services.tech.createTech;

        saveFunction(editDialogData.tech);
        setEditDialogData({ ...editDialogData, open: false });
    }

    const handleFilterChange = e => setFilter(e.target.value);

    const handleNewTech = () => {
        setEditDialogData({ ...editDialogData, isEditing: false, open: true, tech: {} });
    };

    const handleEdit = techId => {
        const { displayName, email, photoUrl, team: { docId: teamId } = {} } = techs.techs.find(tech => tech.docId === techId)

        setEditDialogData({
            ...editDialogData,
            open: true,
            isEditing: true,
            tech: { displayName, email, photoUrl, teamId, docId: techId },
        });
    };

    const handleEditorChange = e => setEditDialogData(
        {
            ...editDialogData,
            tech: { ...editDialogData.tech, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value },
        }
    );

    useEffect(() => {
        services.team.getAllTeams();
        services.tech.getAllTechs();
    }, []);

    return (
        <>
            <EditTech
                open={editDialogData.open}
                isEditing={editDialogData.isEditing}
                handleChange={handleEditorChange}
                handleCancel={handleCancel}
                handleSave={handleSave}
                tech={editDialogData.tech}
            />
            <Grid container spacing={6} className={classes.header}>
                <Grid item md={3}>
                    <h1>Technicians</h1>
                </Grid>
                <Grid item md={2}>
                    <FormControl className={classes.filter}>
                        <Select
                            value={filter}
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="disabled">Archived</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={3}>
                    <Button variant="contained" onClick={handleNewTech}>New Tech</Button>
                </Grid>
            </Grid>
            <Grid container className={classes.techs} justify="space-between">
                {techs &&
                    techs.techs &&
                    techs.techs
                        .filter(tech => filters[filter](tech))
                        .sort((a, b) => {
                            if (a.disabled && !b.disabled) return 1;
                            if (a.disabled && b.disabled) return 0;

                            return -1;
                        })
                        .map((tech, index) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <TechCard handleEdit={handleEdit} {...tech} />
                                </Grid>
                            );
                        })}
            </Grid>
        </>
    );
};

export default Techs;
