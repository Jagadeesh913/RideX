import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/ev-vehicles">Electric Vehicles</Link></li>
                <li><Link to="/petrol-vehicles">Petrol Vehicles</Link></li>
                <li><Link to="/test-ride">Book a Test Ride</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;