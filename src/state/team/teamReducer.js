import { types } from './teamActions';

export const teamState = {
    teams: [],
};

export default function reducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case types.TEAM_CREATE:
            return { ...state, teams: [...state.teams, payload] };
        case types.GET_TEAMS:
            return { ...state, teams: payload };
        default:
            return { ...state };
    }
}
