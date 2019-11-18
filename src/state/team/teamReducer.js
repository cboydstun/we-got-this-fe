import { types } from './teamActions';

export const teamState = {
    teams: [],
};

export default function reducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case types.TEAM_CREATE:
            return { ...state, teams: [...state.teams, payload] };
        case types.TEAM_GET_ALL_SUCCESS:
            return { ...state, teams: payload };
        default:
            return { ...state };
    };
};