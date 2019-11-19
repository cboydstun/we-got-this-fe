import { service } from './teamService';

export const types = {
    TEAM_CREATE_START: 'TEAM_CREATE_START',
    TEAM_CREATE_SUCCESS: 'TEAM_CREATE_SUCCESS',
    TEAM_CREATE_ERROR: 'TEAM_CREATE_ERROR',

    TEAM_GET_ALL_SUCCESS: 'TEAM_GET_ALL_SUCCESS',
    TEAM_GET_ALL_ERROR: 'TEAM_GET_ALL_ERROR',
};

export const actions = {
    async getAllTeams(dispatch) {
        try {
            const teams = await service.getAllTeams();

            dispatch({
                type: types.TEAM_GET_ALL_SUCCESS,
                payload: teams,
            });

            return teams;
        }
        catch (error) {
            dispatch({ type: types.TEAM_GET_ALL_ERROR, payload: error });
        }
    },

    async createTeam(dispatch, team) {
        try {
            dispatch({ type: types.TEAM_CREATE_START });

            const newTeam = service.createTeam(team);

            if (!newTeam) {
                throw new Error(`Failed to create new team: ${JSON.stringify(team)}`);
            };

            dispatch({
                type: types.TEAM_CREATE_SUCCESS,
                payload: newTeam,
            });
        }
        catch (error) {
            dispatch({ type: types.TEAM_CREATE_ERROR, payload: error });
        };
    }
};