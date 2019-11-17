import { types } from './customerActions';
// import service from './customerService';

export const customerState = {
    customers: [],
    customerJobs: null,
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
            console.log(payload);
            return {
                ...state,
                customerJobs: payload,
            };
        default:
            return {
                ...state,
            };
    }
}
