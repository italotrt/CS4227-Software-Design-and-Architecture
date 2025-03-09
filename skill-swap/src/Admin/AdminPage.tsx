import { Paper, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminTable from './AdminTable';

export default function AdminPage() {
    return (
        <Paper>
            <AppBar sx={{ bgcolor: '#f7232a'}}>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                    <IconButton edge="start" aria-label="menu" style={{ marginRight: '10px'}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        User Management
                    </Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center'}}>
                    <IconButton edge="start" aria-label="notifications" style={{ marginRight: '10px'}}>
                        <NotificationsIcon/>
                    </IconButton>
                    <IconButton aria-label="profile">
                        <AccountCircleIcon/>
                    </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        <AdminTable />
        </Paper>
    )
}