import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import SideBar from '../components/SideBar';
import NewJob from '../components/dialogs/NewJob';

it('NewJob Dialog Snapshot', () => {
    const newJob = renderer.create(<NewJob />);
    expect(newJob).toMatchSnapshot();
});
