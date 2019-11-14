import React from 'react';
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

const CustomerTable = ({ customers }) => {
    const classes = useStyles();

    return (
        <Table className={classes.table} size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Customer Name</TableCell>
                    <TableCell align="right">First Service</TableCell>
                    <TableCell align="right">Next Service</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell> </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {customers.length &&
                    customers.map(customer => (
                        <TableRow key={customer.name}>
                            <TableCell component="th" scope="row">
                                {customer.name}
                            </TableCell>
                            <TableCell align="right">
                                {customer.firstServiceDate}
                            </TableCell>
                            <TableCell align="right">
                                {customer.nextServiceDate}
                            </TableCell>
                            <TableCell align="right">{customer.type}</TableCell>
                            <TableCell align="right">
                                <Button variant="outlined" color="primary">
                                    Schedule
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};

export default CustomerTable;
