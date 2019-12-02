import React from 'react';

//Components
import { TextField, MenuItem } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

//State
import { actions as jobActions } from '../../../../state/jobs/jobsActions';
import { useStateValue } from '../../../../state';

//Constants
import zipcodes from '../../../../constants/zipcodes';

const ZipcodeFilter = () => {
    const [{ jobs }, dispatch] = useStateValue();

    return (
        <TextField
            type="number"
            id="zipcode-filter"
            label="Zipcode"
            value={jobs.zipcodeFilter || ''}
            onChange={e => jobActions.setZipFilter(dispatch, e.target.value)}
        />
    );
};

{
    /* <Autocomplete
	freeSolo
	options={zipcodes.map(zip => `${zip}`)}
	getOptionLabel={zipcode => `${zipcode}`}
	onChange={e => {
		console.log(e.target);
		jobActions.setZipFilter(dispatch, e.target.value);
	}}
	onInputChange={() => e => {
		console.log(e.target.value);
	}}
	style={{ width: 300 }}
	renderInput={params => (
		<TextField
			{...params}
			name="zipcode"
			label="Zipcode"
			margin="none"
			onChange={e => {
				console.log(e.target);
				jobActions.setZipFilter(dispatch, e.target.value);
			}}
			fullWidth
		/>
	)}
/> */
}

export default ZipcodeFilter;
