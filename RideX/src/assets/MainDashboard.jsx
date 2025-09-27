// MainDashboard.jsx

import React from 'react';
import '../Css/MainDashboard.css'; 
import PetrolVehicles from './PetrolVehicles';
import EVVehicles from './EVVehicles';
import AppFooter from './AppFooter'; // NEW IMPORT

function MainDashboard() {
  return (
    <div className="main-dashboard-container">
      
      {/* 1. Upcoming Hot Deals Section */}
      <h2 className="dashboard-title">🔥 Upcoming Hot Deals & New Launches 🔥</h2>
      
      <div className="deals-grid">
        <div className="deal-card">
          <p className="deal-placeholder-text">Deal Image 1 Placeholder</p>
        </div>
        <div className="deal-card">
          <p className="deal-placeholder-text">Deal Image 2 Placeholder</p>
        </div>
        <div className="deal-card">
          <p className="deal-placeholder-text">Deal Image 3 Placeholder</p>
        </div>
      </div>
      
      {/* 2. Petrol Vehicles Section */}
      <PetrolVehicles />
      
      {/* 3. EV Vehicles Section */}
      <EVVehicles />
      
      {/* 4. Footer Section (NEW) */}
      <AppFooter />
      
    </div>
  );
}

export default MainDashboard;