import service from './teamService';

export const teamState = {
    teams: [],
};

export default function reducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case service.createTeam.success:
            return { ...state, teams: [...state.teams, payload] };
        case service.getAllTeams.success:
            return { ...state, teams: payload };
        default:
            return { ...state };
    }
}
