import React, { useState , useEffect } from 'react';
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
import { actions } from '../../../state/auth/authActions';
import EditUser from '../../../components/dialogs/EditUser';


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

const UserTable = ({ users }) => {
    const [, dispatch] = useStateValue();
    const classes = useStyles();
    const []
    

    return (
        <>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell>User List</TableCell>
                        <TableCell align="right">Admin</TableCell>
                        <TableCell align="right">Email</TableCell>
                        {/* <TableCell align="right">Type</TableCell> */}
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length &&
                        users.map(user => {
                            return (
                                <TableRow key={user.name}>
                                    <TableCell component="th" scope="row">
                                        {user.displayName ||
                                            'No name provided'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <input type='checkbox' />
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.email ||
                                            'No email included'}
                                    </TableCell>
                                    {/* <TableCell align="right">
                                        {customer.type || 'Unknown'}
                                    </TableCell> */}
                                    <TableCell align="right">
                                        <EditUser />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </>
    );
};

export default UserTable;
