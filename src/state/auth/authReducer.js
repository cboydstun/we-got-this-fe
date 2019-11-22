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
        case types.UPDATE_USER:
            //get the docId from payload
            let { docId } = payload;
            //find user in global state
            let index = state.users.findIndex(user => user.docId == docId);
            let updatedUser = state.users[index];
            //update user in global state

            updatedUser = payload;

            //return
            return {
                ...state,
                users: [...state.users],
            };
        default:
            return {
                ...state,
            };
    }
}
