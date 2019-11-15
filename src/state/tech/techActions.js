import { service } from './techService';

export const types = {
    INVITE_TECH: 'INVITE_TECH',

    ADD_TECH_TO_TEAM_START: 'ADD_TECH_TO_TEAM_START',
    ADD_TECH_TO_TEAM_SUCCESS: 'ADD_TECH_TO_TEAM_SUCCESS',
    ADD_TECH_TO_TEAM_ERROR: 'ADD_TECH_TO_TEAM_ERROR',

    ARCHIVE_TECH_START: 'ARCHIVE_TECH_START',
    ARCHIVE_TECH_SUCCESS: 'ARCHIVE_TECH_SUCCESS',
    ARCHIVE_TECH_ERROR: 'ARCHIVE_TECH_ERROR',

    FETCH_TECHS_START: 'FETCH_TECHS_START',
    FETCH_TECHS_SUCCESS: 'FETCH_TECHS_SUCCESS',
};

export const actions = {
    async addTechToTeam(dispatch, techEmail, teamId) {
        dispatch({ type: types.ADD_TECH_TO_TEAM_START });

        await service.addTechToTeam(techEmail, teamId);

        dispatch({
            type: types.ADD_TECH_TO_TEAM_SUCCESS,
            payload: { techEmail, teamId },
        });
    },

    async archiveTech(dispatch, techId) {
        dispatch({ type: types.ARCHIVE_TECH_START });

        await service.archiveTech(techId);

        dispatch({
            type: types.ARCHIVE_TECH_SUCCESS,
            payload: { techId },
        });
    },
};