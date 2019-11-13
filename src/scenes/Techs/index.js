import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TechCard from './TechCard';

const useStyles = makeStyles(theme => ({
    techs: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0',
        padding: '0',
        listStyle: 'none',
        justifyContent: 'space-between',
    },
    techWrapper: {
        // marginLeft: -theme.spacing(2),
        // marginRight: -theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '48%',
    },
    tech: {
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(2),
    },
}));

const Techs = ({ techs }) => {
    const styles = useStyles();

    techs = [
        { 
            displayName: 'Sanny Sherief',
            photoUrl: 'https://i.imgur.com/l5YJgol.png',
            address: '123 Fake Street',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90019',
        },
        { 
            displayName: 'Sanny Sherief',
            photoUrl: 'https://i.imgur.com/l5YJgol.png',
            address: '123 Fake Street',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90019',
        },
        { 
            displayName: 'Sanny Sherief',
            photoUrl: 'https://i.imgur.com/l5YJgol.png',
            address: '123 Fake Street',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90019',
        },
    ];

    return (
        <>
            <h1>All Technicians</h1>
            <ul className={styles.techs}>
                {techs.map((tech, index) => {
                    return (
                        <li className={styles.techWrapper}>
                            <div className={styles.tech}>
                                <TechCard key={index} {...tech} />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    );
};

export default Techs;