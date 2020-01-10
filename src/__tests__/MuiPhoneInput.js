import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, act, wait, waitForElement} from 'providers';
// import {render, act} from '@testing-library/react';
// import {getQueriesForElement, fireEvent} from '@testing-library/dom';

import {Formik, Form} from 'formik';
import MuiPhoneInput from '../components/formItems/MuiPhoneInput';

test('it renders', () => {
	let {debug, getByLabelText} = render(
		<Formik>
			<MuiPhoneInput name='phone' label='Phone Number' type='text' />
		</Formik>,
	);
	let input = getByLabelText(/Phone Number/i);
	expect(input).toHaveAttribute('type', 'text');
	// debug();
});

test('adding 10 digits converts string to phone number', async () => {
	const {getByLabelText, debug} = render(
		<Formik initialValues={{phone: ''}}>
			<Form>
				<MuiPhoneInput name='phone' label='Phone Number' type='text' />
			</Form>
		</Formik>,
	);

	let input = getByLabelText(/phone number/i);
	await wait(() => {
		fireEvent.change(input, {target: {value: '1234567890'}});
	});
	debug(input);
	expect(input.value).toStrictEqual('(123) 456-7890');
});
