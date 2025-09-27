import React from 'react';
import { Link } from 'react-router-dom';
import AppFooter from './AppFooter';
import Navbar from './Navbar';
import EVVehicles from './EVVehicles';
import PetrolVehicles from './PetrolVehicles';
import LaunchCountdown from './LaunchCountdown';

const MainDashboard = () => {
    return (
        <div>
            <Navbar />
            <h1>Main Dashboard</h1>
            <LaunchCountdown />
            <h2>Available Vehicles</h2>
            <div>
                <h3>Electric Vehicles</h3>
                <EVVehicles />
            </div>
            <div>
                <h3>Petrol Vehicles</h3>
                <PetrolVehicles />
            </div>
            <Link to="/test-ride-booking">Book a Test Ride</Link>
            <AppFooter />
        </div>
    );
};

export default MainDashboard;