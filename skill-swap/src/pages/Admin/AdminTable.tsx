import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, deleteUser } from '../../store/usersSlice';
import { RootState, AppDispatch } from  '../../store/store';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useNavigate } from 'react-router-dom';

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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const navigate = useNavigate();

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
            const updatedUser = { 
                id: selectedUser.id, 
                name: selectedUser.name,
                email: selectedUser.email,
                role: selectedUser.role,
                status: "Banned"
            };
    
            dispatch(updateUser(updatedUser))
                .then(() => console.log("User updated successfully"))
                .catch((error) => console.error("Error updating user:", error));
        }
        handleMenuClose();
    };    

    const handleDeleteUser = () => {
        if (selectedUser) {
          dispatch(deleteUser(selectedUser.id));
        }
        handleMenuClose();
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
                        <TableRow key= {index}  sx={{ backgroundColor: user.status === 'Banned' ? 'lightgrey' : 'inherit' }}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell sx={{ color: user.role === 'Admin' ? '#4287f5' : 'black' }}>
                                {user.role}
                            </TableCell>
                            <TableCell sx={{color: user.status === 'Banned' ? 'red' : 'green' }}>
                                {user.status}
                            </TableCell>
                            <TableCell>
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