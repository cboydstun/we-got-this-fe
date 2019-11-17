import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import FilterListIcon from '@material-ui/icons/FilterList';
import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes';

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

const CustomerTable = ({ customers }) => {
    const classes = useStyles();

    return (
        <>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell>Customer Name</TableCell>
                        <TableCell align="right">First Service</TableCell>
                        <TableCell align="right">Next Service</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.length &&
                        customers.map(customer => {
                            return (
                                <TableRow key={customer.name}>
                                    <TableCell component="th" scope="row">
                                        <Link
                                            to={{
                                                pathname: `${routes.CUSTOMERS}/${customer.docId}`,
                                                state: customer,
                                            }}
                                        >
                                            {customer.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        {customer.firstServiceDate ||
                                            'No services'}
                                    </TableCell>
                                    <TableCell align="right">
                                        {customer.nextServiceDate ||
                                            'No service scheduled'}
                                    </TableCell>
                                    <TableCell align="right">
                                        {customer.type || 'Unknown'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Schedule
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

export default CustomerTable;
