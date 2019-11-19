import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer, Divider, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { privateRoutes, publicRoutes } from '../constants/routes';
import { actions } from '../state/team/teamActions';
import { useStateValue } from '../state';

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
    const [{ teams }, dispatch] = useStateValue();
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (!teams.teams || teams.teams.length == 0) {
            actions.getTeams(dispatch).then(res => {
                if (res) {
                    setLoading(false);
                }
            });
        } else {
            setLoading(false);
        }
    }, [dispatch, teams.teams]);

    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
            >
                <div className={classes.toolbar}></div>
                {loading ? (
                    <h3>Loading</h3>
                ) : (
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
                )}
            </Drawer>
            <div className={classes.appBar}>{children}</div>
        </>
    );
};

export default SideBar;
