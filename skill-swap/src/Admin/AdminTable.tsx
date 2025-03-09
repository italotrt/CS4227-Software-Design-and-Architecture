import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TableFooter, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface User {
    name: string;
    email: string;
    role: string;
    status: string;
}

export default function AdminPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        axios.get("./users.json")
            .then(response => {
                console.log("Fetched data:", response.data);

                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else if (response.data && Array.isArray(response.data.users)) {
                    setUsers(response.data.users);
                } else {
                    console.error("Unexpected response format:", response.data);
                    setUsers([]);
                }
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                setUsers([]);
            });
    }, []);

    const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    
    return (
            <TableContainer sx={{ marginTop: '80px', display: 'flex'}}>
                <Table>
                    <TableHead style={{ backgroundColor: '#fa5258'}}>
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
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell style={{ color: user.role === "Admin" ? "red" : "black" }}>
                                    {user.role}
                                </TableCell>
                                <TableCell style={{ color: user.status === "Banned" ? "red" : "green" }}>
                                    {user.status}
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="edit">
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon/>
                                    </IconButton>
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
};