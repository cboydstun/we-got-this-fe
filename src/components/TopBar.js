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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    title: {
        flexGrow: 1,
    },
}));

const TopBar = () => {
    const [open, setOpen] = useState(false);
    const [{ auth }] = useStateValue();
    const classes = useStyles();
    const theme = useTheme();
    const smallWidth = useMediaQuery(theme.breakpoints.down('xs'));

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

                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={() => setOpen(false)}
                        >
                            <List>
                                <ListItem>
                                    <NavLink to={routes.CUSTOMERS}>
                                        Customers
                                    </NavLink>
                                </ListItem>
                                <ListItem>
                                    <NavLink to={routes.TECHS}>Techs</NavLink>
                                </ListItem>
                                <ListItem>
                                    <NavLink to={routes.ADMIN}>Admin</NavLink>
                                </ListItem>
                            </List>
                        </Drawer>
                    </>
                ) : (
                    <>
                        <Typography variant="h5" className={classes.flexGrow}>
                            <Link to="/dashboard">We Got This!</Link>
                        </Typography>
                        <NavLink to={routes.CUSTOMERS}>Customers</NavLink>
                        <NavLink to={routes.TECHS}>Techs</NavLink>
                        <NavLink to={routes.HOME}>Dashboard</NavLink>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        {auth.currentUser ? (
                            <IconButton component={Link} to={routes.PROFILE}>
                                <AccountCircle />
                            </IconButton>
                        ) : (
                            <Button
                                color="inherir"
                                component={Link}
                                to={routes.AUTH}
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
