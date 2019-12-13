import React, { useState, createContext, useContext } from 'react';
import {
    Drawer,
    List,
    ListItem,
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

const SideBarContext = createContext();

const useStyles = makeStyles(theme => ({
    root: {
        width: props => !props.expanded && '90px',
        height: '100%',
        position: 'fixed',
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
        display: props => !props.expanded ? 'none' : 'inline'
    },
}));

const Item = ({ linkTo, exactLink, icon: Icon, children, ...rest }) => {
    const { expanded } = useContext(SideBarContext);
    const classes = useStyles({ expanded });

    return (
        <Tooltip title={(!expanded && children) ? children : ''} placement="right">
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
        <SideBarContext.Provider value={{ expanded }}>
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
                    <Item exactLink icon={MenuIcon} onClick={handleHamburgerClick} />
                </List>
                <List className={classes.mainItems}>
                    <Item linkTo={routes.HOME} icon={CalendarToday}>
                        Calendar
                    </Item>
                    <Item linkTo={routes.CUSTOMERS} icon={People}>
                        Customers
                    </Item>
                    <Item linkTo={routes.TECHS} icon={Contacts}>
                        Teams
                    </Item>
                </List>
                <List>
                    <Item icon={SettingsApplications}>
                        Settings
                    </Item>
                </List>
            </Drawer>
        </SideBarContext.Provider>
    );
};

export default SideBar;
