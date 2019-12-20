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
        backgroundColor: "#FFFFFF",
    },
    header: {
        '& th': {
            fontWeight: 600,
            color: "#2678C0",
        },
    },
    main: {
        border: "1px solid #f5f5f5",
    }
}));

/*
    Displays information about the currently registered users.

    Example Props:
        "users": [
            {
            "docId": "1yaSTVlyP0skCgnf03Hw",
            "company": "We Got This!",
            "company_code": "we-got-this-12343",
            "disabled": false,
            "displayName": "Mister Clean",
            "email": "scottknight7@gmail.com",
            "phone": {
                "primary": "(555) 555-5555"
            },
            "phoneNumber": "3233233232",
            "photoUrl": "https://example.com",
            "role": [
                "tech"
            ],
            "roles": [
                "tech",
                "superadmin",
                "admin"
            ],
            "type": "admin"
            },
        ]
*/
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
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Admin</TableCell>
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
                                    <TableCell align="right">
                                        {user.email || 'No email included'}
                                    </TableCell>
                                    <TableCell align="right">
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
