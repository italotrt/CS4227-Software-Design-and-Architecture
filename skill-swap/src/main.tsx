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
          <Route path="/CS4227-Software-Design-and-Architecture/" element={<Navigate to="/CS4227-Software-Design-and-Architecture/admin" />} />
          <Route path="/CS4227-Software-Design-and-Architecture/admin" element={<AdminPage />} />
          <Route path="/CS4227-Software-Design-and-Architecture/profile/:id" element={<App />} />
          <Route path="/CS4227-Software-Design-and-Architecture/message/:id" element={<App />} />
          <Route path="/CS4227-Software-Design-and-Architecture/edit/:id" element={<AdminEditUser />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);