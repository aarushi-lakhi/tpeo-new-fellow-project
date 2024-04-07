import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import Profile from './Profile';
import UploadItem from './UploadItem';
import OfferManagement from './OfferManagement';
import OnboardingStart from './OnboardingStart';
import ChooseStyleOnboarding from './ChooseStyleOnboarding';
import ChooseSizeOnboarding from './ChooseSizeOnboarding';

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
          <Route path="/onboarding-start" element={<OnboardingStart/>} />
          <Route path="/onboarding-choose-style" element={<ChooseStyleOnboarding/>} />
          <Route path="/onboarding-choose-size" element={<ChooseSizeOnboarding/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
