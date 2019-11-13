import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import TechCard from './TechCard';

const Techs = ({ techs }) => {
    techs = [
        {
            displayName: 'Sanny Sherief',
            photoUrl: 'https://i.imgur.com/l5YJgol.png',
            address: '123 Fake Street',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90019',
            phone: '3233233232',
        },
        {
            displayName: 'Sanny Sherief',
            photoUrl: 'https://i.imgur.com/l5YJgol.png',
            address: '123 Fake Street',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90019',
            phone: '3233233232',
        },
        {
            displayName: 'Sanny Sherief',
            photoUrl: 'https://i.imgur.com/l5YJgol.png',
            address: '123 Fake Street',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90019',
            phone: '3233233232',
        },
    ];

    return (
        <>
            <h1>All Technicians</h1>
            <Grid container xs={12} spacing={3} >
                {
                    techs.map((tech, index) => {
                        return (
                            <Grid item sm={12} md={6} key={index}>
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