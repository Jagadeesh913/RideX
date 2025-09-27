import React from 'react';

const VehicleDetailsModal = ({ vehicle, onClose }) => {
    return (
        <div className="vehicle-details-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{vehicle.name}</h2>
                <img src={vehicle.image} alt={vehicle.name} />
                <p>{vehicle.description}</p>
                <p>Price: ${vehicle.price}</p>
                <button onClick={() => alert('Test ride booked!')}>Book Test Ride</button>
            </div>
        </div>
    );
};

export default VehicleDetailsModal;