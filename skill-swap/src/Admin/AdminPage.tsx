import { Paper } from '@mui/material';
import AdminTable from './AdminTable';
import AdminAppBar from './AdminAppBar';

export default function AdminPage() {
    return (
        <Paper>
            <AdminAppBar />
            <AdminTable />
        </Paper>
    )
}