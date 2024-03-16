import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import Profile from './Profile';
import UploadItem from './UploadItem';
import OfferManagement from './OfferManagement';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes> {/* Wrap Routes around Route components */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/upload-item" element={<UploadItem/>} />
          <Route path="/offer-management" element={<OfferManagement/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
