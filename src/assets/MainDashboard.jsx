// src/assets/MainDashboard.jsx

import React, { useState } from 'react';
import '../Css/MainDashboard.css'; 
import PetrolVehicles from './PetrolVehicles';
import EVVehicles from './EVVehicles'; 
import AppFooter from './AppFooter';
import LaunchCountdown from './LaunchCountdown';
import VehicleDetailsModal from './VehicleDetailsModal';
import SearchResultsPage from './SearchResultsPage'; // Ensure this is imported
import vehicleData from '../data/vehicles.json';

function MainDashboard({ searchTerm }) { 
  
  const [activeModalVehicle, setActiveModalVehicle] = useState(null); 

  // Check if the search bar has any non-space characters
  const isSearching = searchTerm && searchTerm.trim().length > 0;

  const petrolList = vehicleData.filter(v => v.fuelType === 'Petrol');
  const evList = vehicleData.filter(v => v.fuelType === 'EV');
  const dealList = vehicleData.filter(v => v.isDeal === true);
  const dealsToDisplay = dealList.slice(0, 3);
  
  const genericExpiryTime = React.useMemo(() => {
    return new Date().getTime() + (24 * 60 * 60 * 1000); 
  }, []); 

  const handleCardClick = (vehicle) => {
    setActiveModalVehicle(vehicle);
  };
  
  const handleCloseModal = () => {
    setActiveModalVehicle(null);
  };


  return (
    <div className="main-dashboard-container">
      
      {/* FIX: If IS SEARCHING, only render the results page */}
      {isSearching ? (
        <>
          <SearchResultsPage searchTerm={searchTerm} />
          <AppFooter />
        </>
      ) : (
        // DEFAULT HOME PAGE VIEW
        <>
          <h2 className="dashboard-title">🔥 Upcoming Hot Deals & New Launches 🔥</h2>
          
          <div className="deals-grid">
            {dealsToDisplay.map((deal) => {
                const targetDate = deal.releaseDate ? deal.releaseDate : genericExpiryTime;

                return (
                    <div 
                        className="deal-card" 
                        key={deal._id}
                        onClick={() => handleCardClick(deal)} 
                        style={{ cursor: 'pointer' }}
                    >
                        {/* ... Deal Card Content ... */}
                        <img 
                            src={deal.photos[0]?.url || 'placeholder'} 
                            alt={`${deal.make} ${deal.model} Deal`} 
                            className="deal-image"
                        />
                        <div className="deal-tag">
                            {deal.releaseDate ? 'UPCOMING LAUNCH' : 'FLASH SALE'}
                        </div>
                        
                        <div className="deal-info">
                            <h3 className="deal-name">{deal.make} {deal.model}</h3>
                            
                            {deal.releaseDate && (
                                <p className="release-date-text">
                                    Releases on: {new Date(deal.releaseDate).toLocaleDateString('en-US', {
                                        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })}
                                </p>
                            )}

                            <LaunchCountdown releaseDate={targetDate} />

                            <div className="price-details">
                                {deal.oldPrice && <p className="old-price">₹ {deal.oldPrice.toLocaleString('en-IN')}</p>}
                                <p className="deal-price">NOW: ₹ {deal.listPrice.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
            {Array(3 - dealsToDisplay.length).fill(0).map((_, index) => (
                <div className="deal-card placeholder-deal" key={`ph-${index}`}>
                    <p className="deal-placeholder-text">Next Deal Coming Soon!</p>
                </div>
            ))}
          </div>
          
          <PetrolVehicles 
            vehicles={petrolList} 
            onCardClick={handleCardClick}
          /> 
          
          <EVVehicles 
            vehicles={evList} 
            onCardClick={handleCardClick}
          /> 
          
          <AppFooter />
        </>
      )}

      <VehicleDetailsModal 
        vehicle={activeModalVehicle} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

export default MainDashboard;