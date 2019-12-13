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
    Grid,
    Tooltip
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { routes } from '../constants/routes';

import { CalendarToday, People, Contacts, SettingsApplications } from '@material-ui/icons';

import MenuIcon from '@material-ui/icons/Menu';

import { useStateValue } from '../state';

const useStyles = makeStyles(theme => ({
    root: {
        width: props => !props.expanded && '90px',
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
        paddingRight: theme.spacing(6),
    },

    itemIconContainer: {
        display: 'flex',
        justifyContent: 'center',
        color: 'white',
        padding: theme.spacing(1),
    },

    itemText: {
        display: props => props.compactDisplay ? 'none' : 'inline'
    },
}));

const Item = ({ linkTo, exactLink, compactDisplay, icon: Icon, children, ...rest }) => {
    const classes = useStyles({ compactDisplay });

    return (
        <Tooltip title={(compactDisplay && children) ? children : ''} placement="right">
            <ListItem
                button
                className={classes.item}
                exact={exactLink}
                component={NavLink}
                to={linkTo || ''}
                {...rest}
            >
                <ListItemIcon className={classes.itemIconContainer}><Icon /></ListItemIcon>
                <ListItemText className={classes.itemText} primary={children} />
            </ListItem>
        </Tooltip>
    )
};

const SideBar = () => {
    const [expanded, setExpanded] = useState(false);
    const [{ auth }, dispatch] = useStateValue();
    const classes = useStyles({ expanded });

    const handleHamburgerClick = () => setExpanded(!expanded);

    return (
        <Drawer
            open={true}
            variant="permanent"
            className={classes.root}
            component="nav"
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
                <Item compactDisplay={!expanded} exactLink icon={MenuIcon} onClick={handleHamburgerClick} />
            </List>
            <List className={classes.mainItems}>
                <Item compactDisplay={!expanded} linkTo={routes.HOME} icon={CalendarToday}>
                    Calendar
                </Item>
                <Item compactDisplay={!expanded} linkTo={routes.CUSTOMERS} icon={People}>
                    Customers
                </Item>
                <Item compactDisplay={!expanded} linkTo={routes.TECHS} icon={Contacts}>
                    Teams
                </Item>
            </List>
            <List>
                <Item compactDisplay={!expanded} icon={SettingsApplications}>
                    Settings
                </Item>
            </List>
        </Drawer>
    );
};

export default SideBar;
