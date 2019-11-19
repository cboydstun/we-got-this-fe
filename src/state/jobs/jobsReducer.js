import { types } from './jobsActions';

export const jobsState = {
    jobs: [],
    dateFilter: null,
    zipcodeFilter: null,
    teamFilter: null,
};

export default function reducer(state, action) {
    let { payload } = action;
    console.log('Payload: ', payload);
    switch (action.type) {
        case types.CLEAR_FILTERS: {
            return {
                ...state,
                dateFilter: null,
                zipcodeFilter: null,
                teamFilter: null,
            };
        }
        case types.SET_ZIP_FILTER: {
            return {
                ...state,
                zipcodeFilter: payload,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}
