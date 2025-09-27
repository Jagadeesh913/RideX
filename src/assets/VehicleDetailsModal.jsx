import React from 'react';
import { createPortal } from 'react-dom';
import LaunchCountdown from './LaunchCountdown'; 

function VehicleDetailsModal({ vehicle, onClose }) {
    
    if (!vehicle) return null;

    const PopUP = {
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        backgroundColor: '#FFF', padding: '30px', borderRadius: '10px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)', zIndex: 1001, 
        width: '90%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto'
    };

    const OVERLAY_STYLES = {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 1000
    };

    const modalContent = (
        <div style={PopUP}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #5849ff', paddingBottom: '10px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.8rem', color: '#333', margin: 0 }}>
                    {vehicle.make} {vehicle.model} ({vehicle.year})
                </h2>
                <button 
                    onClick={onClose} 
                    style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: '#aaa' }}
                >&times;</button>
            </div>

            <div style={{ display: 'flex', gap: '30px' }}>
                <div style={{ flex: 1 }}>
                    <img 
                        src={vehicle.photos[0]?.url || 'placeholder'} 
                        alt={vehicle.model} 
                        style={{ width: '100%', borderRadius: '8px', marginBottom: '15px', objectFit: 'cover', height: 'auto' }} 
                    />
                    
                    {/* START TIMER/RELEASE DATE BLOCK */}
                    {vehicle.releaseDate && (
                        <div style={{ textAlign: 'center', marginBottom: '20px', padding: '10px', border: '1px solid #f0f0f0', borderRadius: '5px' }}>
                            <h4 style={{ color: '#5849ff', margin: '0 0 10px 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
                                Upcoming Launch Countdown
                            </h4>
                            <p style={{ fontSize: '1rem', color: '#333', margin: '0 0 5px 0' }}>
                                Estimated Launch: 
                                <span style={{ fontWeight: '600', marginLeft: '5px' }}>
                                    {new Date(vehicle.releaseDate).toLocaleDateString('en-US', {
                                        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })}
                                </span>
                            </p>
                            <LaunchCountdown releaseDate={vehicle.releaseDate} />
                        </div>
                    )}
                    {/* END TIMER/RELEASE DATE BLOCK */}

                    <p style={{ fontWeight: 'bold', color: '#ff4500', fontSize: '2.2rem', margin: '0' }}>
                        ₹ {vehicle.listPrice.toLocaleString('en-IN')}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '5px' }}>
                        Condition: {vehicle.condition} &bull; {vehicle.mileage.toLocaleString()} km
                    </p>
                </div>

                <div style={{ flex: 1, lineHeight: 1.6 }}>
                    <h4 style={{ color: '#5849ff', marginBottom: '10px', fontSize: '1.2rem' }}>Vehicle Details</h4>
                    <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
                    <p><strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} km</p>
                    <p><strong>Description:</strong> {vehicle.description || 'No detailed description available.'}</p>

                    <h4 style={{ color: '#5849ff', marginTop: '20px', marginBottom: '10px', fontSize: '1.2rem' }}>Seller Information</h4>
                    <p><strong>Shop Name:</strong> {vehicle.shopName}</p>
                    <p><strong>Shop Address:</strong> {vehicle.shopAddress || 'N/A'}</p>
                    <p><strong>Shop Phone:</strong> {vehicle.shopPhone || 'N/A'}</p>
                    
                    <button style={{ 
                        marginTop: '30px', padding: '12px 25px', 
                        backgroundColor: '#1a9f5d', color: 'white', 
                        border: 'none', borderRadius: '5px', cursor: 'pointer',
                        fontWeight: 'bold', fontSize: '1rem'
                    }}>
                        Book Test Ride / Contact Dealer
                    </button>
                </div>
            </div>
        </div>
    );

    const portalRoot = document.getElementById('root-profile');
    if (!portalRoot) return null;
    
    return createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            {modalContent}
        </>,
        portalRoot
    );
}

export default VehicleDetailsModal;