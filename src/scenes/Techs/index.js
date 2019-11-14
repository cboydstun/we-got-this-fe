import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import TechCard from './TechCard';

const Techs = ({ techs }) => {
    return (
        <>
            <h1>Technicians</h1>
            <Grid container xs={12} spacing={3} justify='space-between' >
                {
                    techs.map((tech, index) => {
                        return (
                            <Grid item sm={12} md={5} key={index}>
                                <TechCard {...tech} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    );
};

export default Techs;