import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//
//Config
import { initGoogleClient } from '../config/googleClient';

//Components / Scenes
import {
    Navigation,
    CreateCustomerForm,
    SplashLoading,
    RegisterCompany,
    SideBar,
} from '../components';
import Calendar from './Calendar';
import Auth from './Auth';
import Dashboard from './Dashboard';
import Me from './Me';

//Styles
import RootContainer from '../components/styles/containers/RootContainer';
import MainContainer from '../components/styles/containers/MainContainer';

//Constants
import { routes } from '../constants/routes';

//State
import { useStateValue } from '../state';
import { actions } from '../state/auth/authActions';

//Fire
import Firebase from '../config/firebase';

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

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
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

function App() {
    const [{ auth }, dispatch] = useStateValue();
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        //Initiliaze Google API
        initGoogleClient();

        //Auth Change With Firebase
        Firebase.onAuthStateChanged(user => {
            if (user !== null) {
                actions.getOrCreateCurrentUser(dispatch, user);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });
    }, [dispatch]);

    if (isLoading) {
        return <SplashLoading />;
    } else {
        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <Navigation />

                    <Route exact path={routes.AUTH} component={Auth} />
                    <Route path={routes.HOME} component={Dashboard} />
                    <Route path={routes.ME} component={Me} />
                    <Route path={routes.CALENDAR} component={Calendar} />

                    <CreateCustomerForm />
                    <RegisterCompany />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
