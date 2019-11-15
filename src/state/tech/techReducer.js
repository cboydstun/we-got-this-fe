import { types } from './teamActions';

export default function reducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case types.INVITE_TECH:
            return {
                ...state,
                ...payload
            }
        default:
            return { ...state };
    };
};