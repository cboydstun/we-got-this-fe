import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//Components / Scenes
import { Navigation, CreateCustomerForm, UserList } from '../components';
import Calendar from './Calendar';

//Constants
import { routes } from '../constants/routes';

//State
import { useStateValue } from '../state';
import { setUser } from '../state/reducers/userReducer';

//Fire
import Firebase from '../firebase';
import { auth } from 'firebase';

//
//Config
var storageRef = Firebase.getStorageRef();
let gapi = window.gapi;

async function initGoogleClient() {
    await gapi.load('client', () => {
        console.log('loaded client');
        gapi.client.init({
            apiKey: 'AIzaSyCSuD-_FQ3ockPsbQRsbCRgg1-lmcNsA6I',
            clientId:
                '566987245774-abeg79tlatngaaupsmdthc8ikouva2qo.apps.googleusercontent.com',
            discoveryDocs: [
                'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
            ],
            scope: 'https://www.googleapis.com/auth/calendar',
        });
        gapi.client.load('calendar', 'v3', () =>
            console.log('loaded calendar')
        );
    });
}

async function login() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;

    console.log(googleUser);

    const credential = auth.GoogleAuthProvider.credential(token);

    await Firebase.signInWithCredential(credential);
}

function logout() {
    Firebase.signOut();
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signOut();
}

const Auth = () => {
    return (
        <>
            <h1>Auth</h1>{' '}
            <button
                onClick={() => {
                    login();
                }}
            >
                Sign In With Google
            </button>
        </>
    );
};

const Dashboard = () => {
    const [files, setFiles] = useState(null);

    const handleFiles = e => {
        setFiles(e.target.files);
    };

    return (
        <>
            <h1>Dashboard</h1>{' '}
            <UserList />
            <label htmlFor="fileInput">Select Files to Upload</label>
            <input
                type="file"
                id="fileInput"
                multiple
                onChange={e => {
                    handleFiles(e);
                }}
            />
            {files !== null && (
                <button
                    onClick={() => {
                        console.log('Clicked!');
                        storageRef
                            .child('images/me')
                            .put(files[0])
                            .then(snapshot => {
                                console.log(snapshot);
                            });
                    }}
                >
                    Upload!
                </button>
            )}
        </>
    );
};

const Me = () => {
    const [{ user }] = useStateValue();
    return <h1>Me is {user && user.displayName} </h1>;
};

const LoadingMessage = () => {
    return <h1>Loading</h1>;
};

function App() {
    const [{ user }, dispatch] = useStateValue();
    const [isLoading, setIsLoading] = useState(true);

    //Initiliaze Google API
    useEffect(() => {
        initGoogleClient();
        Firebase.onAuthStateChanged(user => {
            console.log(user);
            if (user !== null) {
                setUser(dispatch, user);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });
    }, [dispatch]);

    if (isLoading) {
        return <LoadingMessage />;
    } else {
        return (
            <BrowserRouter>
                <Navigation />

                <Route exact path={routes.AUTH} component={Auth} />
                <Route path={routes.HOME} component={Dashboard} />
                <Route path={routes.ME} component={Me} />
                <Route path={routes.CALENDAR} component={Calendar} />

                <button
                    onClick={() => {
                        logout();
                    }}
                >
                    Sign Out
                </button>

                <CreateCustomerForm />
            </BrowserRouter>
        );
    }
}

export default App;
