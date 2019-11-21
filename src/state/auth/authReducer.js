import { types } from './authActions';

export const authState = {
    currentUser: null,
};

export default function reducer(state, action) {
    let { payload } = action;
    switch (action.type) {
        case types.AUTH_SUCCESS:
            return {
                ...state,
                currentUser: payload,
            };
        case types.AUTH_LOGOUT:
            return {
                ...state,
                currentUser: null,
            };
        case types.CREATE_COMPANY:
            return {
                ...state,
                company: payload,
            };
        case types.COMPANY_LIST:
            return {
                ...state,
                currentCompany: payload,
            };
        case types.EDIT_ADMIN:
            return {
                ...state,
                currentAdmin: payload,
            };
        case types.GET_USERS:
            return {
                ...state,
                users: [...payload],
            };
        case types.SET_CURRENT_USER:
            return {
                ...state,
                currentUsers: [...payload],
            };
        case types.GIVE_ADMIN_STATUS:
            return {
                ...state,
                admin: payload,
            };
        default:
            return {
                ...state,
            };
    }
}
