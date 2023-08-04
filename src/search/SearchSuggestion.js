// SearchSuggestion.js
import React from 'react';
import './SearchSuggestion.css';

const SearchSuggestion = ({ suggestions, handleSuggestionClick }) => {
  return (
    <div className="search-suggestions">
      {suggestions.map((item, index) => (
        <div
          key={index}
          className="suggestion-item"
          onClick={() => handleSuggestionClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestion;
