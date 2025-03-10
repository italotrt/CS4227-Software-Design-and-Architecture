import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../usersSlice';
import { RootState, AppDispatch } from '../store';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Typography } from '@mui/material';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

export default function AdminTable() {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.users.users);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer sx={{ marginTop: '80px', display: 'flex' }}>
            <Table>
                <TableHead style={{ backgroundColor: '#f7232a' }}>
                    <TableRow>
                        <TableCell>
                            <Typography fontWeight="bold">Username</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight="bold">Email</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight="bold">Role</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight="bold">Status</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight="bold">Actions</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedUsers.map((user: User, index: number) => (
                        <TableRow key={index}>
                            <TableCell sx={{ backgroundColor: user.status === 'Banned' ? 'lightgrey' : 'inherit' }}>{user.name}</TableCell>
                            <TableCell sx={{ backgroundColor: user.status === 'Banned' ? 'lightgrey' : 'inherit' }}>{user.email}</TableCell>
                            <TableCell sx={{ backgroundColor: user.status === 'Banned' ? 'lightgrey' : 'inherit', color: user.role === 'Admin' ? 'red' : 'black' }}>
                                {user.role}
                            </TableCell>
                            <TableCell sx={{ backgroundColor: user.status === 'Banned' ? 'lightgrey' : 'inherit', color: user.status === 'Banned' ? 'red' : 'green' }}>
                                {user.status}
                            </TableCell>
                            <TableCell sx={{ backgroundColor: user.status === 'Banned' ? 'lightgrey' : 'inherit' }}>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}