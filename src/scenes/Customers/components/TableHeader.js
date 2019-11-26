import React, { useState, useEffect } from 'react';
import { Toolbar, Tooltip, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
});

const TableHeader = ({ title }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography variant="h6">{title}</Typography>
            <Tooltip title="Filter">
                <IconButton onClick={() => alert('Clicked')}>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default TableHeader;
