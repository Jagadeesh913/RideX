import React from 'react';

const SearchSuggestions = ({ suggestions }) => {
    return (
        <div className="search-suggestions">
            {suggestions.length > 0 ? (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
                </ul>
            ) : (
                <p>No suggestions available.</p>
            )}
        </div>
    );
};

export default SearchSuggestions;