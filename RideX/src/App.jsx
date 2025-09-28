import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AuthService from './services/AuthService';
import Navbar from './assets/Navbar';
import MainDashboard from './assets/MainDashboard';
import LoginPage from './assets/LoginPage';
import RegisterPage from './assets/RegisterPage';

// Dealer Components
import DealerLogin from './assets/DealerLogin';
import DealerRegistration from './assets/DealerRegistration';
import DealerDashboard from './assets/DealerDashboard';

// CSS imports
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isAuthenticated());
  const [isDealerLoggedIn, setIsDealerLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleDealerLogin = () => {
    setIsDealerLoggedIn(true);
  };

  const handleLogout = () => {
    AuthService.logoutUser();
    setIsLoggedIn(false);
  };

  const handleDealerLogout = () => {
    setIsDealerLoggedIn(false);
  };

  return (
    <React.Fragment>
      <Routes>
        {/* Dealer Routes - No Navbar */}
        <Route
          path="/dealer/login"
          element={
            <DealerLogin
              onLoginSuccess={() => {
                handleDealerLogin();
                navigate('/dealer/dashboard');
              }}
              onCreateAccount={() => navigate('/dealer/register')}
            />
          }
        />

        <Route
          path="/dealer/register"
          element={
            <DealerRegistration
              onRegistrationSuccess={() => navigate('/dealer/login')}
              onLoginRedirect={() => navigate('/dealer/login')}
            />
          }
        />

        <Route
          path="/dealer-dashboard"
          element={
            <DealerDashboard
              onLogout={() => {
                handleDealerLogout();
                navigate('/');
                con
              }}
            />
          }
        />

        {/* Regular User Routes - With Navbar */}
        <Route
          path="/*"
          element={
            <>
              <Navbar
                isAuthenticated={isLoggedIn}
                onLogout={handleLogout}
                onSearchChange={setSearchTerm}
                currentSearchTerm={searchTerm}
              />
              <Routes>
                <Route path="/" element={<MainDashboard searchTerm={searchTerm} />} />
                <Route path="/login" element={<LoginPage onLoginSuccess={handleLogin} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/DealerLogin" element={<DealerLogin />} />
               <Route path="/DRegistration" element={<DealerRegistration />} />
               
              <Route path="/dealer-dashboard" element={<DealerDashboard />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </React.Fragment>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
