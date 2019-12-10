import React from 'react';
import ReactDOM from 'react-dom';
import App from './scenes/App';
import * as serviceWorker from './serviceWorker';
import './index.css';

import { StateProvider } from './state';
import { mainReducer, initialState } from './state/reducers.js';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <StateProvider reducer={mainReducer} initialState={initialState}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StateProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
