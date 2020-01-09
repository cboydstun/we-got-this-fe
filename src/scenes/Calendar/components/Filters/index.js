import React from 'react';

//Components
import ZipcodeFilter from './Zipcode';
import TeamFilter from './TeamFilter';

//Styling
import { Box } from '@material-ui/core';
import { styled, withTheme } from '@material-ui/core/styles';

const FilterContainer = styled(withTheme(Box))(props => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-content',
    marginBottom: 20,
    marginTop: '-15px',
    [props.theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));

const Filters = () => {
    return (
        <FilterContainer>
            <TeamFilter />
            <ZipcodeFilter />
        </FilterContainer>
    );
};

export default Filters;
