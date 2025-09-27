import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthService from './services/AuthService';
import Navbar from './assets/Navbar';
import MainDashboard from './assets/MainDashboard';
import LoginPage from './assets/LoginPage';
import RegisterPage from './assets/RegisterPage';
import TestRideBookingPage from './assets/TestRideBookingPage';
// You will need to ensure your other imports are here
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import React, { useState } from 'react';
// ... rest of imports
function AppWrapper() {
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isAuthenticated());
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        AuthService.logoutUser();
        setIsLoggedIn(false);
    };

    return (
        <React.Fragment>
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