import React from 'react';

//Components
import ZipcodeFilter from './Zipcode';

//Styling
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const FilterContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
});

const Filters = () => {
    return (
        <FilterContainer>
            <ZipcodeFilter />
        </FilterContainer>
    );
};

export default Filters;
