import { types } from './techActions';

export default function reducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case types.INVITE_TECH:
            return {
                ...state,
                ...payload
            }
        case types.ADD_TECH_TO_TEAM_SUCCESS: {
            return { ...state };
        }
        default:
            return { ...state };
    };
};