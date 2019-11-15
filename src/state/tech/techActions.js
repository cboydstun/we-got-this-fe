import { service } from './techService';

export const types = {
    INVITE_TECH: 'INVITE_TECH',
    ADD_TECH_TO_TEAM_START: 'ADD_TECH_TO_TEAM_START',
    ADD_TECH_TO_TEAM_SUCCESS: 'ADD_TECH_TO_TEAM_SUCCESS',
    ADD_TECH_TO_TEAM_ERROR: 'ADD_TECH_TO_TEAM_ERROR',
};

export const actions = {
    async addTechToTeam(dispatch, techEmail, teamId) {
        dispatch({ type: types.ADD_TECH_TO_TEAM_START });

        await service.addTechToTeam(techEmail, teamId);

        dispatch({
            type: types.ADD_TECH_TO_TEAM_SUCCESS,
            payload: { techEmail, teamId },
        });
    }
};