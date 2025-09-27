import React from 'react';
import Slider from 'react-slick'; 
import '../Css/PetrolVehicles.css';

const DEFAULT_PLACEHOLDER = 'https://via.placeholder.com/280x280.png?text=RideX+Unavailable';

function PetrolVehicles({ vehicles, onCardClick }) { 
  
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  const displayList = vehicles.length > 0 ? vehicles : [1, 2, 3]; 

  return (
    <div className="petrol-vehicles-container">
      
      <h2 className="section-title">Currently Available Petrol Bikes & Scooters ⛽</h2>
      
      <Slider {...settings}>
        {displayList.map((item, index) => {
          const isRealData = vehicles.length > 0;
          const vehicle = isRealData ? item : {};
          
          return (
            <div 
              className="card-wrapper" 
              key={isRealData ? vehicle._id : index}
              onClick={() => isRealData && onCardClick(vehicle)}
              style={{ cursor: 'pointer' }}
            >
                <div className="vehicle-card">
                  
                  {isRealData ? (
                    <>
                      <img 
                        src={vehicle.photos[0]?.url || DEFAULT_PLACEHOLDER} 
                        alt={`${vehicle.make} ${vehicle.model}`} 
                        className="vehicle-image"
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = DEFAULT_PLACEHOLDER;
                        }}
                        loading="lazy"
                      />
                      <div className="vehicle-details">
                        <h3 className="vehicle-name">{vehicle.make} {vehicle.model} ({vehicle.year})</h3>
                        <p className="vehicle-price">₹ {vehicle.listPrice.toLocaleString('en-IN')}</p>
                        <p className="vehicle-mileage">Mileage: {vehicle.mileage} km</p>
                        <p className="vehicle-shop">Shop: {vehicle.shopName}</p>
                      </div>
                    </>
                  ) : (
                    <>
                        <div className="vehicle-image vehicle-placeholder"></div>
                        <div className="vehicle-details">
                            <h3 className="vehicle-name">Vehicle Name Placeholder</h3>
                            <p className="vehicle-price">₹ --,--</p>
                            <p className="vehicle-mileage">Details Pending...</p>
                        </div>
                    </>
                  )}

                </div>
            </div>
          );
        })}
      </Slider>
      
      {vehicles.length === 0 && <p className="no-vehicles">No petrol vehicles currently available.</p>}
      
    </div>
  );
}

export default PetrolVehicles;