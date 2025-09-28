import React, { useState, useEffect } from 'react';
import VehicleDetailsModal from './VehicleDetailsModal';
// import './SearchResults.css';

// Inline styles for search results
const searchStyles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    marginBottom: '30px'
  },
  filterSection: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    flexWrap: 'wrap'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '150px'
  },
  filterLabel: {
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
    fontSize: '0.9rem'
  },
  filterInput: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '0.9rem',
    backgroundColor: 'white'
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px'
  },
  vehicleCard: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  vehicleImage: {
    height: '200px',
    overflow: 'hidden',
    backgroundColor: '#f8f9fa'
  },
  vehicleImageImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  vehicleInfo: {
    padding: '20px'
  },
  vehicleName: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 10px 0',
    lineHeight: '1.3'
  },
  vehicleDetails: {
    display: 'flex',
    gap: '12px',
    marginBottom: '15px',
    flexWrap: 'wrap'
  },
  detailBadge: {
    fontSize: '0.85rem',
    color: '#666',
    backgroundColor: '#f0f0f0',
    padding: '4px 8px',
    borderRadius: '4px'
  },
  vehiclePrice: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ff4500',
    marginBottom: '8px'
  },
  vehicleLocation: {
    fontSize: '0.9rem',
    color: '#666',
    display: 'flex',
    alignItems: 'center'
  },
  loading: {
    textAlign: 'center',
    padding: '60px 20px',
    fontSize: '1.1rem',
    color: '#666'
  },
  noResults: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    marginTop: '40px'
  }
};

const SearchResults = ({ searchTerm }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Use searchTerm prop directly instead of URL params
  const searchQuery = searchTerm || '';

  useEffect(() => {
    // Fetch search results based on searchTerm prop
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      // Import vehicle data and filter based on search query
      const vehicleData = await import('../data/vehicles.json');
      const allVehicles = vehicleData.default || vehicleData;
      
      if (!query || query.trim() === '') {
        setSearchResults([]);
        setLoading(false);
        return;
      }

      // Filter vehicles based on search query
      const filtered = allVehicles.filter(vehicle => {
        const searchLower = query.toLowerCase();
        return (
          vehicle.make?.toLowerCase().includes(searchLower) ||
          vehicle.model?.toLowerCase().includes(searchLower) ||
          vehicle.fuelType?.toLowerCase().includes(searchLower) ||
          `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchLower)
        );
      });

      setSearchResults(filtered);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle vehicle card click
  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
  };

  if (loading) {
    return (
      <div style={searchStyles.container}>
        <div style={searchStyles.loading}>Loading search results...</div>
      </div>
    );
  }

  return (
    <div style={searchStyles.container}>
      <div style={searchStyles.header}>
        <h2>{searchResults.length} Results for "{searchQuery}"</h2>
      </div>

      {/* Filter Section */}
      <div style={searchStyles.filterSection}>
        <div style={searchStyles.filterGroup}>
          <label style={searchStyles.filterLabel}>Brand</label>
          <select style={searchStyles.filterInput}>
            <option value="">All</option>
            <option value="tvs">TVS</option>
            <option value="hero">Hero</option>
            <option value="honda">Honda</option>
            <option value="bajaj">Bajaj</option>
          </select>
        </div>

        <div style={searchStyles.filterGroup}>
          <label style={searchStyles.filterLabel}>Fuel Type</label>
          <select style={searchStyles.filterInput}>
            <option value="">All Types</option>
            <option value="petrol">Petrol</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <div style={searchStyles.filterGroup}>
          <label style={searchStyles.filterLabel}>Min Price (₹)</label>
          <input 
            type="number" 
            placeholder="e.g., 50000" 
            style={searchStyles.filterInput}
          />
        </div>

        <div style={searchStyles.filterGroup}>
          <label style={searchStyles.filterLabel}>Max Price (₹)</label>
          <input 
            type="number" 
            placeholder="e.g., 150000" 
            style={searchStyles.filterInput}
          />
        </div>
      </div>

      {/* Results Grid */}
      <div style={searchStyles.resultsGrid}>
        {searchResults.length > 0 ? (
          searchResults.map((vehicle) => (
            <div 
              key={vehicle.id} 
              style={searchStyles.vehicleCard}
              onClick={() => handleVehicleClick(vehicle)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={searchStyles.vehicleImage}>
              <img 
                src={vehicle.photos?.[0]?.url || '/default-vehicle.jpg'} 
                alt={`${vehicle.make} ${vehicle.model}`}
                style={searchStyles.vehicleImageImg}
                onError={(e) => {
                  e.target.src = '/default-vehicle.jpg';
                }}
              />
              </div>
              <div style={searchStyles.vehicleInfo}>
                <h3 style={searchStyles.vehicleName}>{vehicle.make} {vehicle.model}</h3>
                <div style={searchStyles.vehicleDetails}>
                  <span style={searchStyles.detailBadge}>({vehicle.year})</span>
                  <span style={searchStyles.detailBadge}>{vehicle.mileage} km</span>
                  <span style={searchStyles.detailBadge}>{vehicle.fuelType}</span>
                </div>
                <div style={searchStyles.vehiclePrice}>
                  ₹ {vehicle.listPrice?.toLocaleString('en-IN')}
                </div>
                <div style={searchStyles.vehicleLocation}>
                  📍 {vehicle.location || 'Hyderabad, Telangana'}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={searchStyles.noResults}>
            <h3>No vehicles found</h3>
            <p>Try adjusting your search criteria or browse all vehicles.</p>
          </div>
        )}
      </div>

      {/* Vehicle Details Modal */}
      {showModal && selectedVehicle && (
        <VehicleDetailsModal 
          vehicle={selectedVehicle}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default SearchResults;