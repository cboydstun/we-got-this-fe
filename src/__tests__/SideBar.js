import React from 'react';
import {render} from 'providers';

import SideBar from '../components/SideBar';

describe('SideBar Component', () => {
	const {container} = render(<SideBar />);

	it('Renders with the right settings', () => {
		expect(container).toHaveTextContent('Teams');
	});
});
