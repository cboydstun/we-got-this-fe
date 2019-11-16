import { service } from './customerService';

export const types = {
    ADD_CUSTOMER: 'ADD_CUSTOMERS',
    GET_CUSTOMERS: 'GET_CUSTOMERS',
};

export const actions = {
    async addCustomer(dispatch, values) {
        try {
            let newCustomer = await service.addCustomer(values);
            if (!newCustomer) {
                throw new Error('Adding customer failed');
            }
            dispatch({
                type: types.ADD_CUSTOMER,
                payload: newCustomer,
            });
            return true;
        } catch (err) {
            return err;
        }
    },

    async getCustomers(dispatch, accountId) {
        try {
            console.log('Action to get customers called');
            let customers = await service.getCustomers();
            if (!customers) {
                throw new Error('Failed to get customers');
            }
            dispatch({
                type: types.GET_CUSTOMERS,
                payload: customers,
            });
            return true;
        } catch (err) {
            return err;
        }
    },

    async getCustomerJobs(jobPaths) {
        try {
            let jobs = await service.getCustomerJobs(jobPaths);
            if (!jobs) {
                throw new Error('Failed to get jobs');
            }
            return true;
        } catch (err) {
            return err;
        }
    },
};
