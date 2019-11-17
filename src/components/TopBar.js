import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    InputBase,
    useMediaQuery,
    Icon,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

import { NavLink, Link } from 'react-router-dom';
import { routes } from '../constants/routes';

import { useStateValue } from '../state';
import { setState } from 'expect/build/jestMatchersObject';

const useStyles = makeStyles(theme => ({
    appBar: {
        width: '100%',
    },
    routes: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        color: theme.palette.common.white,
        fontSize: 16,
    },
    logo: {
        textDecoration: 'none',
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.common.white,
        marginRight: theme.spacing(2),
    },
    login: {
        color: theme.palette.common.white,
    },
}));

const activeStyles = {
    fontWeight: 600,
    textDecoration: 'underline',
};

const TopBar = () => {
    const [open, setOpen] = useState(false);
    const [{ auth }] = useStateValue();
    const classes = useStyles();
    const theme = useTheme();
    const smallWidth = useMediaQuery(theme.breakpoints.down('xs'));

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar variant="dense">
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
                            <Link to={routes.CALENDAR} className={classes.logo}>
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
                                        to={routes.CALENDAR}
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
                                className={classes.login}
                            >
                                Login
                            </Button>
                        )}
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
