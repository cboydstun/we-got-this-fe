import React from 'react';

//Components
import ZipcodeFilter from './Zipcode';
import TeamFilter from './TeamFilter';

//Styling
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const FilterContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-content',
    marginBottom: 20,
    marginTop: '-15px',
});

const Filters = () => {
    return (
        <FilterContainer>
            <TeamFilter />
        </FilterContainer>
    );
};

export default Filters;
