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
    const [{ jobs, teams }, dispatch] = useStateValue();

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

export default ZipcodeFilter;
