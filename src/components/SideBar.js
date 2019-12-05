import React, { useState, useEffect } from 'react';
import {
    Button,
    Drawer,
    Divider,
    List,
    ListItem,
    TextField,
    MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { privateRoutes, publicRoutes } from '../constants/routes';
import teamActions from '../state/team/teamService';
import { actions as jobActions } from '../state/jobs/jobsActions';
import { useStateValue, useService } from '../state';

import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import zipcodes from '../constants/zipcodes';

const drawerWidth = 150;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        padding: theme.spacing(1),
        zIndex: 0,
    },
    toolbar: {
        height: 48,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

const SideBar = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [{ teams, jobs }, dispatch] = useStateValue();
    const service = useService(teamActions, dispatch);
    const classes = useStyles();

    useEffect(
        () => {
            if (!teams.teams || teams.teams.length == 0) {
                service.getAllTeams();
                setLoading(false);
            } else {
                setLoading(false);
            }
        },
        [
            /* */
        ]
    );

    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
            >
                <div className={classes.toolbar}></div>
                <h3>Filters</h3>
                <TextField
                    id="zipcode-filter"
                    select
                    label="Zipcode"
                    value={jobs.zipcodeFilter || ''}
                    onChange={e =>
                        jobActions.setZipFilter(dispatch, e.target.value)
                    }
                >
                    {zipcodes.map(zipcode => (
                        <MenuItem key={zipcode} value={zipcode}>
                            {zipcode}
                        </MenuItem>
                    ))}
                </TextField>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-filter"
                        label="Date Filter"
                        onChange={date =>
                            jobActions.setDateFilter(dispatch, date)
                        }
                    />
                </MuiPickersUtilsProvider>
                <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => jobActions.clearFilters(dispatch)}
                >
                    Clear Filters
                </Button>
                <h4>Teams</h4>
                {loading ? (
                    <h3>Loading</h3>
                ) : (
                    <>
                        <List>
                            {teams.teams &&
                                teams.teams.length &&
                                teams.teams.map((team, index) => {
                                    return (
                                        <ListItem
                                            button
                                            key={index}
                                            onClick={() => alert('clicked')}
                                        >
                                            {team.name}
                                        </ListItem>
                                    );
                                })}
                        </List>
                    </>
                )}
            </Drawer>
            <div className={classes.appBar}>{children}</div>
        </>
    );
};

export default SideBar;
