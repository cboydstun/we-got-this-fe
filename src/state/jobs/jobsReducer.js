import { types } from './jobsActions';

export const jobsState = {
    jobs: [],
    dateFilter: null,
    zipcodeFilter: null,
    teamFilter: null,
    newServiceFormOpen: false,
    slotEvent: null,
};

export default function reducer(state, action) {
    let { payload } = action;
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
        case types.SET_NEW_SERVICE_FORM_OPEN:
            return {
                ...state,
                newServiceFormOpen: payload,
            };
        case types.SET_SLOT_EVENT:
            return {
                ...state,
                slotEvent: payload,
            };
        default: {
            return {
                ...state,
            };
        }
    }
}
