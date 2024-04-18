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
import NavBar from './components/NavBar';
import TempNavBarPage from './TempNavBarPage';
import TempPageTwo from './TempPageTwo';
import AddClothingItem from "./AddClothingItem"
import Offers from "./Offers"
import ManageListings from "./ManageListingsPage"
import PreviewPage from "./PreviewPage"

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
          <Route path="/temp-navbar" element={<TempNavBarPage/>} /> 
          <Route path="/temp-page-two" element={<TempPageTwo/>} /> 
          <Route path="/add-item" element={<AddClothingItem/>} /> 
          <Route path="/check-offers" element={<Offers/>} /> 
          <Route path="/manage-listings" element={<ManageListings/>} /> 
          <Route path="/preview-page" element={<PreviewPage/>} /> 

          {/* DELETE ABOVE ROUTE, ONLY TEMPORARY FOR TESTING */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
