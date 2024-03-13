import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Profile from './Profile';
import UploadItem from './UploadItem';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes> {/* Wrap Routes around Route components */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/upload-item" element={<UploadItem/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
