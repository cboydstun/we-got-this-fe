import { service } from './teamService';

export const types = {
    TEAM_CREATE_START: 'TEAM_CREATE_START',
    TEAM_CREATE_SUCCESS: 'TEAM_CREATE_SUCCESS',
    TEAM_CREATE_ERROR: 'TEAM_CREATE_ERROR',
};

export const actions = {
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