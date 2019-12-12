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
    AppBar,
    Toolbar,
    Hidden,
    ListItemIcon,
    ListItemText,
    Grid
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { routes } from '../constants/routes';

import { CalendarToday, People, Contacts, SettingsApplications } from '@material-ui/icons';

import MenuIcon from '@material-ui/icons/Menu';

import { useStateValue } from '../state';

const useStyles = makeStyles(theme => ({
    root: {
        width: '90px',
        zIndex: '2',
    },

    container: {
        height: '100%',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    mainItems: {
        height: '60%',
    },

    item: {
        '& > *': {
            display: 'flex',
            justifyContent: 'center',
            color: 'white',
            padding: theme.spacing(1),
        }
    }
}));

const Item = ({ linkTo, exact, children }) => {
    const classes = useStyles();

    return (
        <ListItem button exact={exact} className={classes.item} component={NavLink} to={linkTo} activeClassName="Mui-selected">
            {children}
        </ListItem>
    )
};

const SideBar = () => {
    const [expanded, setExpanded] = useState(false);
    const [{ auth }, dispatch] = useStateValue();
    const theme = useTheme();
    const classes = useStyles();

    const handleHamburgerClick = () => setExpanded(!expanded);

    return (
        <Drawer
            open={true}
            variant="permanent"
            className={classes.root}
            PaperProps={
                {
                    style: {
                        width: 'inherit',
                        position: 'static',
                        color: 'white',
                    },

                    className: classes.container,
                }
            }
        >
            <List>
                <ListItem button className={classes.item} onClick={handleHamburgerClick}>
                    <ListItemIcon><MenuIcon /></ListItemIcon>
                </ListItem>
            </List>
            <List className={classes.mainItems}>
                <Item exact linkTo={routes.HOME}>
                    <ListItemIcon><CalendarToday /></ListItemIcon>
                </Item>
                <Item linkTo={routes.CUSTOMERS}>
                    <ListItemIcon><People /></ListItemIcon>
                </Item>
                <Item linkTo={routes.TECHS}>
                    <ListItemIcon><Contacts /></ListItemIcon>
                </Item>
            </List>
            <List>
                <ListItem button className={classes.item}>
                    <ListItemIcon><SettingsApplications /></ListItemIcon>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default SideBar;
