import React from 'react';

//Components
import { TextField, MenuItem } from '@material-ui/core';

//State
import { actions as jobActions } from '../../../../state/jobs/jobsActions';
import { useStateValue } from '../../../../state';

const TeamFilter = () => {
    const [{ jobs, teams }, dispatch] = useStateValue();

    return (
        <TextField
            select
            type="text"
            id="team-filter"
            label="Team Filter"
            margin="none"
            value={jobs.teamFilter || ''}
            onChange={e => jobActions.setTeamFilter(dispatch, e.target.value)}
            style={{ width: '25%' }}
        >
            <MenuItem key={'asdf'} value={null}>
                All
            </MenuItem>
            {teams.teams &&
                teams.teams.map((team, i) => (
                    <MenuItem key={i} value={team.docId}>
                        {team.name}
                    </MenuItem>
                ))}
        </TextField>
    );
};

export default TeamFilter;
