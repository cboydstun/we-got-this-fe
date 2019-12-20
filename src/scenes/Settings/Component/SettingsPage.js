import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
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
import EditUser from '../../../components/dialogs/EditUser';

import { useStateValue } from '../../../state';
import { auth } from 'firebase';

const UserTable = ({ users }) => {
    const [{ auth }, dispatch] = useStateValue();
    const [state, setState] = useState();
    const classes = useStyles();

    return (
        <>
        <div className={classes.main}>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell>User List</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="t">Admin</TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length &&
                        users.map(user => {
                            return (
                                <TableRow key={user.name}>
                                    <TableCell component="th" scope="row">
                                        {user.displayName || 'No name provided'}
                                    </TableCell>
                                    <TableCell align="left">
                                        {user.email || 'No email included'}
                                    </TableCell>
                                    <TableCell align="left">
                                        <input type="checkbox" checked={true} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <EditUser user={user} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
            </div>
        </>
    );
};

export default UserTable;
