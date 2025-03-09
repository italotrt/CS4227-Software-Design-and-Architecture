import { Box, Button, TextField, Typography } from "@mui/material"
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import AdminAppBar from "./AdminAppBar"
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AdminEditUser() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    const [name, setName] = useState(user?.name || '');
    const [role, setRole] = useState(user?.role || 'User');
    const [status, setStatus] = useState(user?.status || 'Active');

    const handleSave = () => {
        const updatedUser = { ...user, name, role, status };
        console.log('Updated User:', updatedUser);

        navigate('/admin');
    };

    return (
        <>
            <AdminAppBar />
            <Box 
                alignSelf={'center'} 
                padding={5}
                marginTop={10}
                display={'flex'} 
                flexDirection={'column'}
                gap={2}
                sx={{ backgroundColor: '#f5f5f5' }}
                borderRadius={5}
            >
                <h1>Edit User</h1>
                <TextField
                    id="outlined-required"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="Email (View Only)"
                    defaultValue={user?.email || ''}
                />
                <Box
                    component="fieldset"
                    borderColor="transparent"
                    display={'flex'}
                    gap={5}
                >
                    <Typography fontWeight="bold" style={{ color: 'black'}}>
                        Role:
                    </Typography>
                    <RadioGroup
                        aria-label="role"
                        name="row-radio-buttons-group"
                        orientation="horizontal"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <Radio value="Admin" label="Admin"/>
                        <Radio value="User" label="User"/>
                    </RadioGroup>
                </Box>
                <Box
                    component="fieldset"
                    borderColor="transparent"
                    display={'flex'}
                    gap={3}
                >
                    <Typography fontWeight="bold" style={{ color: 'black'}}>
                        Status:
                    </Typography>
                    <RadioGroup
                        aria-label="status"
                        name="row-radio-buttons-group"
                        orientation="horizontal"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <Radio value="Active" label="Active"/>
                        <Radio value="Banned" label="Banned"/>
                    </RadioGroup>
                </Box>
                <Box display={'flex'} gap={2}>
                    <Button variant="contained" color="success" startIcon={<SaveAltIcon />} onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="contained" color="error" startIcon={<CloseIcon />} onClick={() => navigate('/admin')}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </>
    )
}