import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function AdminAppBar() {
    return (
        <AppBar sx={{ bgcolor: '#f7232a'}}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                <IconButton edge="start" aria-label="menu" style={{ marginRight: '10px'}}>
                    <MenuIcon/>
                </IconButton>
                <Typography fontWeight="bold" variant="h6" style={{ color: 'black'}}>
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
    )
}