import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@material-ui/core';
import { useStateValue } from '../../state';
import { classes } from 'istanbul-lib-coverage';

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
}));

const Customers = () => {
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useStateValue();

    const classes = useStyles();

    useEffect(() => {
        //Insert action to get data
        setLoading(false);
    }, []);

    const rows = [
        {
            name: 'Frank Sinatra',
            firstServiceDate: 'Nov 1, 2019',
            nextServiceDate: 'Nov 15, 2019',
            type: 'Recurring',
        },
        {
            name: 'Frank Sinatra',
            firstServiceDate: 'Nov 1, 2019',
            nextServiceDate: 'Nov 15, 2019',
            type: 'Recurring',
        },
        {
            name: 'Frank Sinatra',
            firstServiceDate: 'Nov 1, 2019',
            nextServiceDate: 'Nov 15, 2019',
            type: 'Recurring',
        },
        {
            name: 'Frank Sinatra',
            firstServiceDate: 'Nov 1, 2019',
            nextServiceDate: 'Nov 15, 2019',
            type: 'Recurring',
        },
    ];

    return (
        <div className={classes.root}>
            <h1>Customers</h1>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <Paper>
                    <Table className={classes.table} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer Name</TableCell>
                                <TableCell align="right">
                                    First Service
                                </TableCell>
                                <TableCell align="right">
                                    Next Service
                                </TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.firstServiceDate}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.nextServiceDate}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.type}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="primary">
                                            Schedule
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </div>
    );
};

export default Customers;
