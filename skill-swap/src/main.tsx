import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import AdminPage from './pages/Admin/AdminPage';
import App from './App';
import AdminEditUser from './pages/Admin/AdminEditUser';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile/:id" element={<App />} />
          <Route path="/message/:id" element={<App />} />
          <Route path="/edit/:id" element={<AdminEditUser />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);