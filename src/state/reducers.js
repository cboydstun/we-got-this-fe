//
//Import in individual reducers here
import authReducer, { authState } from './auth/authReducer';
import customerReducer, { customerState } from './customer/customerReducer';
import teamReducer, { teamState } from './team/teamReducer';
import techReducer, { techState } from './tech/techReducer';

//
//Destructure state object here
export const mainReducer = ({ auth, customers, teams, techs }, action) => {
    console.log('Auth state', auth, 'Auth Action', action);
    return {
        //
        //Middleware goes here, i.e. calling analytic, etc...

        //
        //Destructure state object and define with reducer here
        auth: authReducer(auth, action),
        customers: customerReducer(customers, action),
        teams: teamReducer(teams, action),
        techs: techReducer(techs, action),
    };
};

export const initialState = {
    auth: authState,
    customers: customerState,
    teams: teamState,
    techs: techState,
};
