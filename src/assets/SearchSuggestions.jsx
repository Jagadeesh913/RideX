import React, { useMemo } from 'react';
import vehicleData from '../data/vehicles.json';
import '../Css/SearchSuggestions.css';

const SearchSuggestions = ({ searchTerm, onSelect }) => {

    const suggestions = useMemo(() => {
        if (!searchTerm || searchTerm.length < 2) return [];

        const term = searchTerm.toLowerCase().trim();
        const results = new Set();
        
        // Search across all relevant fields
        vehicleData.forEach(vehicle => {
            if (vehicle.make.toLowerCase().includes(term)) {
                results.add(vehicle.make);
            }
            if (vehicle.model.toLowerCase().includes(term)) {
                results.add(vehicle.model);
            }
            if (vehicle.fuelType.toLowerCase().includes(term)) {
                results.add(vehicle.fuelType);
            }
        });

        // Limit to top 5 suggestions
        return Array.from(results).slice(0, 5);
    }, [searchTerm]);

    if (suggestions.length === 0 && searchTerm.length >= 2) {
        return (
            <div className="suggestions-container">
                <div className="suggestion-item no-match">No suggestions found.</div>
            </div>
        );
    }

    if (suggestions.length === 0) {
        return null;
    }

    return (
        <div className="suggestions-container">
            {suggestions.map((suggestion) => (
                <div 
                    key={suggestion} 
                    className="suggestion-item"
                    // On click, execute the search for the full suggestion term
                    onClick={() => onSelect(suggestion)}
                >
                    <span className="suggestion-icon">🔍</span>
                    {suggestion}
                </div>
            ))}
        </div>
    );
};

export default SearchSuggestions;