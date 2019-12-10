import Firebase from '../../config/firebase';
import { auth } from 'firebase';
import { service } from './authService';

let gapi = window.gapi;

export const types = {
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_LOGOUT: 'AUTH_LOGOUT',

    COMPANY_LIST: 'COMPANY_LIST',
    EDIT_ADMIN: 'EDIT_ADMIN',
    GET_USERS: 'GET_USERS',
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    GIVE_ADMIN_STATUS: 'GIVE_ADMIN_STATUS',
    UPDATE_USER: 'UPDATE_USER',

    CALENDAR_LOADED: 'CALENDAR_LOADED',
};

export const actions = {
    async login(dispatch) {
        try {
            const googleAuth = gapi.auth2.getAuthInstance();
            const googleUser = await googleAuth.signIn();

            const token = googleUser.getAuthResponse().id_token;
            const credential = auth.GoogleAuthProvider.credential(token);

            let result = await Firebase.signInWithCredential(credential);
            console.log('Firebase credential: ', result);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async getOrCreateCurrentUser(dispatch, user) {
        try {
            let data = await service.getOrCreateCurrentUser(user);
            // console.log(data);

            await dispatch({
                type: types.AUTH_SUCCESS,
                payload: data,
            });
            return true;
        } catch (error) {
            return error;
        }
    },

    logout(dispatch) {
        Firebase.signOut();
        const googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.signOut();
        dispatch({ type: types.AUTH_LOGOUT });
    },

    async editAdmin(dispatch, values) {
        try {
            let updatedAdmin = await service.editAdmin(values);
            if (!updatedAdmin) {
                throw new Error('Failed to update Admin');
            }
            dispatch({
                type: types.EDIT_ADMIN,
                payload: updatedAdmin,
            });
            return true;
        } catch (err) {
            return err;
        }
    },

    async getCompany(dispatch, values) {
        try {
            let companyInfo = await service.getCompany(values);
            console.log('company info', companyInfo);

            dispatch({
                type: types.COMPANY_LIST,
                payload: companyInfo,
            });
            return true;
        } catch (error) {
            dispatch({ type: types.AUTH_ERROR });
        }
    },
    async getUsers(dispatch) {
        try {
            console.log('Action to get Users');
            let users = await service.getUsers();
            if (!users) {
                throw new Error('Failed to get users');
            }
            dispatch({
                type: types.GET_USERS,
                payload: users,
            });
            return true;
        } catch (err) {
            return err;
        }
    },
    async setCurrentUser(dispatch, user) {
        await dispatch({ type: types.SET_CURRENT_USER, payload: user });
        return true;
    },
    async giveAdminStatus(dispatch, values) {
        try {
            let adminStatus = await service.giveAdminStatus(values);
            dispatch({
                type: types.GIVE_ADMIN_STATUS,
                payload: adminStatus,
            });
        } catch (err) {
            return Error;
        }
    },
    async updateUser(dispatch, values) {
        try {
            let updatedUser = await service.updateUser(values);
            console.log(
                'UpdatedUser returned from service in Action: ',
                updatedUser
            );
            dispatch({
                type: types.UPDATE_USER,
                payload: updatedUser,
            });
        } catch (error) {
            return error;
        }
    },
    setCalendarLoaded(dispatch) {
        dispatch({
            type: types.CALENDAR_LOADED,
        });
    },
};
