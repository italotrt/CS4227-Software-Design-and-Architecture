import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TableFooter, TablePagination, Menu, MenuItem } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

export default function AdminTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    const handleViewProfile = () => {
        if (selectedUser) {
            navigate(`/profile/${selectedUser.id}`);
        }
        handleMenuClose();
    };

    const handleMessage = () => {
        if (selectedUser) {
            navigate(`/message/${selectedUser.id}`);
        }
        handleMenuClose();
    };

    const handleEditUser = () => {
        if (selectedUser) {
            navigate(`/edit/${selectedUser.id}`, { state: { user: selectedUser } });
        }
        handleMenuClose();
    };

    const handleBanUser = () => {
        if (selectedUser) {
            setUsers(users.map(user => 
                user.id === selectedUser.id ? { ...user, status: 'Banned' } : user
            ));
        }
        handleMenuClose();
    };

    const handleDeleteUser = () => {
        if (selectedUser) {
            setUsers(users.filter(user => user.id !== selectedUser.id));
        }
        handleMenuClose();
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
                            <TableCell sx={{ backgroundColor: user.status === 'Banned' ? 'lightgrey' : 'inherit' }}>{user.name}</TableCell>
                            <TableCell sx={{ backgroundColor: user.status === 'Banned' ? 'lightgrey' : 'inherit' }}>{user.email}</TableCell>
                            <TableCell sx={{ backgroundColor: user.status === 'Banned' ? 'lightgrey' : 'inherit', color: user.role === "Admin" ? "red" : "black" }}>
                                {user.role}
                            </TableCell>
                            <TableCell sx={{ backgroundColor: user.status === 'Banned' ? 'lightgrey' : 'inherit', color: user.status === "Banned" ? "red" : "green" }}>
                                {user.status}
                            </TableCell>
                            <TableCell sx={{ backgroundColor: user.status === 'Banned' ? 'lightgrey' : 'inherit' }}>
                                <IconButton aria-label="edit" onClick={(event) => handleMenuOpen(event, user)}>
                                    <TuneIcon/>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
                                    <MenuItem onClick={handleMessage}>Message</MenuItem>
                                    <MenuItem onClick={handleEditUser}>Edit</MenuItem>
                                    <MenuItem onClick={handleBanUser}>Ban</MenuItem>
                                    <MenuItem onClick={handleDeleteUser}>Delete</MenuItem>
                                </Menu>
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