import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import SideBar from '../components/SideBar';

describe('SideBar Component', () => {
	const {container} = render(
		<MemoryRouter>
			<SideBar />
		</MemoryRouter>,
	);

	it('Renders with the right settings', () => {
		expect(container).toHaveTextContent('Teams');
	});
});
