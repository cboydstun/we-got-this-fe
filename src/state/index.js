import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    );
};

const createActionName = functionName => functionName.replace(/[A-Z]/g, match => `_${match}`).toUpperCase();
const createActionNames = functionName => {
    return {
        start: `${createActionName(functionName)}_START`,
        success: `${createActionName(functionName)}_SUCCESS`,
        error: `${createActionName(functionName)}_ERROR`,
    }
};

export const installActionNames = service => {
    for (const [key, value] of Object.entries(service)) {
        const { start, success, error } = createActionNames(key);

        value.start = start;
        value.success = success;
        value.error = error;
    }

    return service;
};

export const useService = (service, dispatch) => {
    const wrapper = {};

    for (const [key, value] of Object.entries(service)) {
        wrapper[key] = async (...others) => {
            dispatch({ type: value.start, payload: others });

            try {
                const result = await value(...others);

                dispatch({ type: value.success, payload: result });

                return result;
            }
            catch (error) {
                dispatch({ type: value.error, payload: error });
            }
        }
    };

    return wrapper;
};

export const useStateValue = () => useContext(StateContext);

export const withState = WrappedComponent => {
    return props => {
        const [state, dispatch] = useStateValue();
        return (
            <WrappedComponent state={state} dispatch={dispatch} {...props} />
        );
    };
};
