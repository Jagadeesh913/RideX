import React, { useState, useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import vehicleData from '../data/vehicles.json';
import '../Css/SearchResults.css';

const SearchResultsPage = ({ searchTerm }) => {
    
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    
    const [filters, setFilters] = useState({
        brand: 'All',
        fuelType: 'All',
        minPrice: '',
        maxPrice: ''
    });

    const uniqueBrands = useMemo(() => {
        const brands = vehicleData.map(v => v.make);
        return ['All', ...new Set(brands)].sort();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        
        const term = searchTerm.toLowerCase().trim();
        
        const initialResults = vehicleData.filter((vehicle) => {
            if (!searchTerm) return true;
            
            return (
                (vehicle.make && vehicle.make.toLowerCase().includes(term)) ||
                (vehicle.model && vehicle.model.toLowerCase().includes(term)) ||
                (vehicle.fuelType && vehicle.fuelType.toLowerCase().includes(term)) ||
                (vehicle.shopName && vehicle.shopName.toLowerCase().includes(term))
            );
        });

        const finalResults = initialResults.filter((vehicle) => {
            const price = vehicle.listPrice;
            
            if (filters.brand !== 'All' && vehicle.make !== filters.brand) {
                return false;
            }
            
            if (filters.fuelType !== 'All' && vehicle.fuelType !== filters.fuelType) {
                return false;
            }
            
            if (filters.minPrice && price < parseFloat(filters.minPrice)) {
                return false;
            }
            
            if (filters.maxPrice && price > parseFloat(filters.maxPrice)) {
                return false;
            }
            
            return true;
        });

        setFilteredVehicles(finalResults);
    }, [searchTerm, filters]);


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

    const NO_IMAGE_PLACEHOLDER = 'https://via.placeholder.com/280x280.png?text=RideX+Unavailable';

    // Renders nothing when the app first loads (only renders when search is active)
    if (!searchTerm && filters.brand === 'All' && !filters.minPrice && !filters.maxPrice) {
        return null;
    }

    return (
        <div className="search-results-container">
            <h2 className="results-title">
                {filteredVehicles.length} Result{filteredVehicles.length !== 1 ? 's' : ''} for: "{searchTerm || 'All Vehicles'}"
            </h2>

            <div className="filter-bar">
                
                <div className="filter-group">
                    <label htmlFor="brand-filter">Brand</label>
                    <select name="brand" id="brand-filter" value={filters.brand} onChange={handleFilterChange}>
                        {uniqueBrands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="type-filter">Fuel Type</label>
                    <select name="fuelType" id="type-filter" value={filters.fuelType} onChange={handleFilterChange}>
                        <option value="All">All Types</option>
                        <option value="Petrol">Petrol</option>
                        <option value="EV">EV (Electric)</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="min-price">Min Price (₹)</label>
                    <input 
                        type="text" 
                        name="minPrice" 
                        id="min-price" 
                        value={filters.minPrice} 
                        placeholder="e.g., 50000"
                        onChange={handleFilterChange} 
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="max-price">Max Price (₹)</label>
                    <input 
                        type="text" 
                        name="maxPrice" 
                        id="max-price" 
                        value={filters.maxPrice} 
                        placeholder="e.g., 150000"
                        onChange={handleFilterChange} 
                    />
                </div>
            </div>

            {filteredVehicles.length > 0 ? (
                <Slider {...settings}>
                    {filteredVehicles.map((vehicle) => (
                        <div className="card-wrapper" key={vehicle._id}>
                            <div className="vehicle-card">
                                <img src={vehicle.photos[0]?.url || NO_IMAGE_PLACEHOLDER} alt={vehicle.model} className="vehicle-image" />
                                <div className="vehicle-details">
                                    <h3 className="vehicle-name">{vehicle.make} {vehicle.model} ({vehicle.year})</h3>
                                    <p className="vehicle-price">₹ {vehicle.listPrice.toLocaleString('en-IN')}</p>
                                    <p className="vehicle-mileage">Mileage: {vehicle.mileage} km</p>
                                    <p className="vehicle-shop">Shop: {vehicle.shopName}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p className="no-results-message">No matching vehicles found. Adjust your filters or search term.</p>
            )}
        </div>
    );
};

export default SearchResultsPage;