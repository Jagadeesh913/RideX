import React from 'react';
import '../Css/PetrolVehicles.css'; // Import new CSS file

function PetrolVehicles() {
  return (
    <div className="petrol-vehicles-container">
      
      {/* Section Header */}
      <h2 className="section-title">Currently Available Petrol Bikes & Scooters ⛽</h2>
      
      {/* Grid container for the vehicles/images */}
      <div className="vehicles-grid">
        
        {/* Placeholder div for the first petrol vehicle */}
        <div className="vehicle-card">
          <p className="card-placeholder-text">Petrol Vehicle Image 1</p>
        </div>
        
        {/* Placeholder div for the second petrol vehicle */}
        <div className="vehicle-card">
          <p className="card-placeholder-text">Petrol Vehicle Image 2</p>
        </div>
        
        {/* Placeholder div for the third petrol vehicle */}
        <div className="vehicle-card">
          <p className="card-placeholder-text">Petrol Vehicle Image 3</p>
        </div>
        
        {/* Placeholder div for the fourth petrol vehicle */}
        <div className="vehicle-card">
          <p className="card-placeholder-text">Petrol Vehicle Image 4</p>
        </div>
        
        {/* Add more .vehicle-card divs here as needed */}
        
      </div>
      
    </div>
  );
}

export default PetrolVehicles;