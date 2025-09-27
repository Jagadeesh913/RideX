import React from 'react';
import '../Css/EVVehicles.css'; // Import new CSS file

function EVVehicles() {
  return (
    <div className="ev-vehicles-container">
      
      {/* Section Header */}
      <h2 className="section-title">Explore Electric Vehicles (EVs) ⚡</h2>
      
      {/* Grid container for the vehicles/images */}
      <div className="vehicles-grid">
        
        {/* Placeholder div for the first EV vehicle */}
        <div className="vehicle-card">
          <p className="card-placeholder-text">EV Vehicle Image 1</p>
        </div>
        
        {/* Placeholder div for the second EV vehicle */}
        <div className="vehicle-card">
          <p className="card-placeholder-text">EV Vehicle Image 2</p>
        </div>
        
        {/* Placeholder div for the third EV vehicle */}
        <div className="vehicle-card">
          <p className="card-placeholder-text">EV Vehicle Image 3</p>
        </div>
        
        {/* Placeholder div for the fourth EV vehicle */}
        <div className="vehicle-card">
          <p className="card-placeholder-text">EV Vehicle Image 4</p>
        </div>
        
        {/* Add more .vehicle-card divs here as needed */}
        
      </div>
      
    </div>
  );
}

export default EVVehicles;