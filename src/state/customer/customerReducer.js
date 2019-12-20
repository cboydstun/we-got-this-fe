import { types } from './customerActions';
import { Stats } from 'fs';
// import service from './customerService';

export const customerState = {
    customers: [],
    customerJobs: [],
    currentCustomer: null,
};

export default function reducer(state, action) {
    let { payload } = action;

    switch (action.type) {
        case types.GET_CUSTOMERS:
            return {
                ...state,
                customers: [...payload],
            };

        case types.ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, payload],
            };

        case types.GET_CUSTOMER_JOBS:
            return {
                ...state,
                customerJobs: payload,
            };
        case types.SET_CURRENT_CUSTOMER:
            return {
                ...state,
                currentCustomer: payload,
            };
        case types.UPDATE_CUSTOMER:
            let { docId } = payload;

            let updateIndex = state.customers.findIndex(
                user => user.docId == docId
            );
            let updatedCustomer = state.customers[updateIndex];
            updatedCustomer = payload;

            return {
                ...state,
                customers: [...state.customers],
                currentCustomer: {
                    ...state.customers.currentCustomer,
                    ...payload,
                },
            };
        case types.GET_CUSTOMER_IMAGE:
            return {
                ...state,
                currentCustomer: { ...state.currentCustomer, img: payload },
            };
        case types.ADD_JOB_TO_CUSTOMER:
            let { newJobDocId, customerDocId } = payload;
            console.log(
                'New Job Doc Id',
                newJobDocId,
                'Customer Doc Id',
                customerDocId
            );

            let jobIndex = state.customers.findIndex(
                customer => customer.docId == customerDocId
            );
            let customer = state.customers[jobIndex];

            customer.jobs.push(newJobDocId);

            return {
                ...state,
                customers: [...state.customers],
            };

        default:
            return {
                ...state,
            };
    }
}
