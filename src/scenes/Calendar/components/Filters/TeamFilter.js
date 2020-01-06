import React from 'react';

//Components
import { TextField, MenuItem } from '@material-ui/core';
import { styled, withTheme } from '@material-ui/core/styles';

//State
import { actions as jobActions } from '../../../../state/jobs/jobsActions';
import { useStateValue } from '../../../../state';

const StyledTextField = styled(withTheme(TextField))(props => ({
    width: '25%',
    [props.theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));

const TeamFilter = () => {
    const [{ jobs, teams }, dispatch] = useStateValue();

    return (
        <StyledTextField
            select
            type="text"
            id="team-filter"
            label="Team Filter"
            margin="none"
            value={jobs.teamFilter || ''}
            onChange={e => jobActions.setTeamFilter(dispatch, e.target.value)}
            // style={{ width: '25%' }}
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
        </StyledTextField>
    );
};

export default TeamFilter;
