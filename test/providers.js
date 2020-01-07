import React from 'react';
import {StateProvider} from '../src/state';
import {MemoryRouter} from 'react-router-dom';
import {render as rtlRender} from '@testing-library/react';

const mainReducer = (state, action) => {
	let {payload} = action;
	switch (action.type) {
		default:
			return {...state};
	}
};

const initialState = {
	auth: {},
	customers: {},
	teams: {},
	techs: {},
	jobs: {},
};

function Wrapper({children}) {
	return (
		<StateProvider reducer={mainReducer} initialState={initialState}>
			<MemoryRouter>{children}</MemoryRouter>
		</StateProvider>
	);
}

function render(ui, options) {
	return rtlRender(ui, {wrapper: Wrapper, ...options});
}

export * from '@testing-library/react';
export {render};
