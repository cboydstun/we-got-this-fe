import React, { useState, useEffect, createContext, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { routes } from '../constants/routes';

import {
    Menu as MenuIcon,
    CalendarToday,
    People,
    Contacts,
    SettingsApplications,
} from '@material-ui/icons';

const SideBarContext = createContext();

const useStyles = makeStyles(theme => ({
    root: {
        width: props => (props.mobile && '100%') || (!props.expanded && '90px'),
        height: props =>
            (!props.mobile && '100%') || (!props.expanded && '72px'),
        position: props => (props.mobile ? 'static' : 'fixed'),
        overflow: props => props.mobile && 'hidden',
        zIndex: '2',
    },

    container: {
        height: '100%',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: props => !props.mobile && 'space-between',
    },

    mainItems: {
        height: props => !props.mobile && '60%',
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
        display: props =>
            props.expanded || (props.override && props.mobile)
                ? 'inline'
                : 'none',
    },
}));

const Item = ({
    linkTo,
    exactLink,
    icon: Icon,
    children,
    override = false,
    ...rest
}) => {
    const { expanded } = useContext(SideBarContext);
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles({ expanded, override, mobile });

    return (
        <Tooltip
            title={!expanded && children ? children : ''}
            placement="right"
        >
            <ListItem
                button
                className={classes.item}
                exact={exactLink}
                component={linkTo && NavLink}
                to={linkTo || ''}
                {...rest}
            >
                <ListItemIcon className={classes.itemIconContainer}>
                    <Icon />
                </ListItemIcon>
                <ListItemText className={classes.itemText} primary={children} />
            </ListItem>
        </Tooltip>
    );
};

const SideBar = ({ history }) => {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles({ expanded, mobile });

    const handleHamburgerClick = () => setExpanded(!expanded);

    useEffect(() => history.listen(() => setExpanded(false)), [history]);

    return (
        <SideBarContext.Provider value={{ expanded }}>
            <Drawer
                open={true}
                variant="permanent"
                className={classes.root}
                PaperProps={{
                    style: {
                        width: 'inherit',
                        position: 'static',
                        color: 'white',
                    },

                    className: classes.container,
                }}
            >
                <List>
                    <Item
                        icon={MenuIcon}
                        onClick={handleHamburgerClick}
                        override={true}
                    >
                        We Got This!!
                    </Item>
                </List>
                <List className={classes.mainItems}>
                    <Item linkTo={routes.HOME} icon={CalendarToday}>
                        Schedule
                    </Item>
                    <Item linkTo={routes.CUSTOMERS} icon={People}>
                        Customers
                    </Item>
                    <Item linkTo={routes.TECHS} icon={Contacts}>
                        Teams
                    </Item>
                </List>
                <List>
                    <Item linkTo={routes.PROFILE} icon={SettingsApplications}>
                        Settings
                    </Item>
                </List>
            </Drawer>
        </SideBarContext.Provider>
    );
};

export default withRouter(SideBar);
