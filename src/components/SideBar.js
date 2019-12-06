import React, { useState, useEffect } from 'react';
import {
    Button,
    Drawer,
    Divider,
    List,
    ListItem,
    useMediaQuery,
    Icon,
    IconButton,
    Typography,
    TextField,
    MenuItem,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core';
import { NavLink, Link } from 'react-router-dom';
import { routes } from '../constants/routes';

import AccountCircle from '@material-ui/icons/AccountCircle';

import MenuIcon from '@material-ui/icons/Menu';

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
        padding: theme.spacing(1),
        zIndex: 0,
    },
    toolbar: {
        height: 48,
    },
    content: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
    },
}));

const activeStyles = {
    fontWeight: 600,
    textDecoration: 'underline',
};

const SideBar = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [{ auth }, dispatch] = useStateValue();
    const classes = useStyles();

    const theme = useTheme();
    const smallWidth = useMediaQuery(theme.breakpoints.down('xs'));

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
            >
                {smallWidth ? (
                    <>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h5">
                            <Link to={routes.HOME} className={classes.logo}>
                                We Got This!
                            </Link>
                        </Typography>

                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={() => setOpen(false)}
                        >
                            <List>
                                <ListItem>
                                    <NavLink
                                        to={routes.HOME}
                                        onClick={handleClose}
                                    >
                                        Dashboard
                                    </NavLink>
                                </ListItem>
                                <ListItem>
                                    <NavLink
                                        to={routes.CUSTOMERS}
                                        onClick={handleClose}
                                    >
                                        Customers
                                    </NavLink>
                                </ListItem>
                                <ListItem>
                                    <NavLink
                                        to={routes.TECHS}
                                        onClick={handleClose}
                                    >
                                        Techs
                                    </NavLink>
                                </ListItem>
                                <ListItem>
                                    <NavLink
                                        to={routes.PROFILE}
                                        onClick={handleClose}
                                    >
                                        Admin
                                    </NavLink>
                                </ListItem>
                            </List>
                        </Drawer>
                    </>
                ) : (
                    <>
                        <div className={classes.routes}>
                            <Typography variant="h5">
                                <Link to={routes.HOME} className={classes.logo}>
                                    We Got This!
                                </Link>
                            </Typography>
                            <NavLink
                                exact
                                to={routes.HOME}
                                className={classes.link}
                                activeStyle={activeStyles}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to={routes.CUSTOMERS}
                                className={classes.link}
                                activeStyle={activeStyles}
                            >
                                Customers
                            </NavLink>
                            <NavLink
                                to={routes.TECHS}
                                className={classes.link}
                                activeStyle={activeStyles}
                            >
                                Techs
                            </NavLink>
                            <NavLink
                                to={routes.JOBS}
                                className={classes.link}
                                activeStyle={activeStyles}
                            >
                                Jobs
                            </NavLink>
                        </div>
                        {auth.currentUser ? (
                            <IconButton component={Link} to={routes.PROFILE}>
                                <AccountCircle style={{ color: 'white' }} />
                            </IconButton>
                        ) : (
                            <Button
                                component={Link}
                                to={routes.AUTH}
                                className={classes.white}
                            >
                                Login
                            </Button>
                        )}
                    </>
                )}
            </Drawer>
            <div className={classes.content}>{children}</div>
        </>
    );
};

export default SideBar;
