import { service } from './teamService';

export const types = {
    TEAM_CREATE_START: 'TEAM_CREATE_START',
    TEAM_CREATE_SUCCESS: 'TEAM_CREATE_SUCCESS',
    TEAM_CREATE_ERROR: 'TEAM_CREATE_ERROR',
    GET_TEAMS: 'GET_TEAMS',
};

export const actions = {
    async createTeam(dispatch, team) {
        try {
            dispatch({ type: types.TEAM_CREATE_START });

            const newTeam = service.createTeam(team);

            if (!newTeam) {
                throw new Error(
                    `Failed to create new team: ${JSON.stringify(team)}`
                );
            }

            dispatch({
                type: types.TEAM_CREATE_SUCCESS,
                payload: newTeam,
            });
        } catch (error) {
            dispatch({ type: types.TEAM_CREATE_ERROR, payload: error });
        }
    },

    async getTeams(dispatch) {
        try {
            let teams = await service.getTeams();
            if (!teams) {
                throw new Error('Failed to get teams');
            }
            dispatch({
                type: types.GET_TEAMS,
                payload: teams,
            });
            return true;
        } catch (err) {
            return err;
        }
    },
};
