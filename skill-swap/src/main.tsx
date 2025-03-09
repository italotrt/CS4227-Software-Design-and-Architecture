import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPage from './Admin/AdminPage';
import App from './App';
import AdminEditUser from './Admin/AdminEditUser';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profile/:id" element={<App />} />
        <Route path="/message/:id" element={<App />} />
        <Route path="/edit/:id" element={<AdminEditUser />} />
      </Routes>
    </Router>
  </StrictMode>,
);