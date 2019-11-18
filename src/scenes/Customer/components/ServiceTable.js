import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes';
import {
    Toolbar,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
    header: {
        '& th': {
            fontWeight: 600,
        },
    },
}));

const teams = techsArray => {
    let team = techsArray.reduce((acc, curr) => {
        return acc + curr.name + ' & ';
    }, 'Serviced By: ');

    //Remove the last & because I'm lazy
    return team.slice(0, -2);
};

const ServiceTable = ({ jobs, match, location }) => {
    console.log(('Service Table Location: ', location));
    const classes = useStyles();
    return (
        <>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell>Service Date</TableCell>
                        <TableCell align="right">Serviced By</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right"> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.length &&
                        jobs.map(job => {
                            return (
                                <TableRow key={job.details.schedule_date}>
                                    <TableCell component="th" scope="row">
                                        {job.details.schedule_date}
                                    </TableCell>
                                    <TableCell align="right">
                                        {job.techs && teams(job.techs)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {job.type || 'Unknown'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={{
                                                pathname: `${match.url}/${job.docId}`,
                                                state: job.docId,
                                            }}
                                        >
                                            Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </>
    );
};

export default ServiceTable;
