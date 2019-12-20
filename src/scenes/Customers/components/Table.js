import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
} from '@material-ui/core';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes';
import { actions } from '../../../state/customer/customerActions';
import { useStateValue } from '../../../state';

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

const headerCells = [
    {
        id: 'name',
        align: 'left',
        label: 'Customer Name',
    },
    {
        id: 'street',
        align: 'right',
        label: 'Street Address',
    },
    {
        id: 'firstService',
        align: 'right',
        label: 'First Service Date',
    },
    {
        id: 'nextService',
        align: 'right',
        label: 'Next Service Date',
    },
    {
        id: 'type',
        align: 'right',
        label: 'Type',
    },
];

function desc(a, b, orderBy) {
    if (orderBy == 'street') {
        let aLocation = a.locations[0].address.street;
        let bLocation = b.locations[0].address.street;
        if (bLocation < aLocation) {
            return -1;
        }
        if (bLocation > aLocation) {
            return 1;
        }
    } else {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

const CustomerTable = ({ customers, onRequestSort, orderBy, order }) => {
    const [, dispatch] = useStateValue();
    const classes = useStyles();

    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow className={classes.header}>
                        {headerCells.map(headCell => {
                            return (
                                <TableCell
                                    key={headCell.id}
                                    align={headCell.align}
                                    sortDirection={
                                        orderBy === headCell.id ? order : false
                                    }
                                >
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={order}
                                        onClick={createSortHandler(headCell.id)}
                                    >
                                        {headCell.label}
                                    </TableSortLabel>
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(
                        customers.length ? customers : [],
                        getSorting(order, orderBy)
                    ).map(customer => {
                        return (
                            <TableRow key={customer.docId}>
                                <TableCell component="th" scope="row">
                                    <Link
                                        to={`${routes.CUSTOMERS}/${customer.docId}`}
                                        onClick={() => {
                                            actions.setCurrentCustomer(
                                                dispatch,
                                                customer
                                            );
                                        }}
                                    >
                                        {customer.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    {customer.locations[0].address.street}
                                </TableCell>
                                <TableCell align="right">
                                    {customer.firstServiceDate || 'No services'}
                                </TableCell>
                                <TableCell align="right">
                                    {customer.nextServiceDate ||
                                        'No service scheduled'}
                                </TableCell>
                                <TableCell align="right">
                                    {customer.type || 'Unknown'}
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
