import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './CocktailSearch.css';

const MIN_SEARCH_LENGTH = 2;

function CocktailSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('name');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCocktail, setSelectedCocktail] = useState(null);

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim().length < MIN_SEARCH_LENGTH) {
      return;
    }

    const response = await axios.post(`http://localhost:8080/search/keyword?keyword=${searchTerm}`);
    console.log('Search Response:', response.data);
    if (response.status === 200) {
      setFilteredRecipes(response.data);
    } else {
      console.error('Error fetching recipes:', response.statusText);
    }
  };

  const closeModal = () => {
    setSelectedCocktail(null);
  };

  useEffect(() => {
    setLoading(true);
    // Fetch initial data here if needed
    setLoading(false);
  }, []);

  const inputProps = {
    placeholder: 'Search for a cocktail...',
    value: searchTerm,
    onChange: (event, { newValue }) => setSearchTerm(newValue),
    onKeyPress: handleKeyPress,
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    setSearchTerm(value);

    if (value.length >= MIN_SEARCH_LENGTH) {
      const response = await axios.post(`http://localhost:8080/search/keyword?keyword=${value}`);
      if (response.status === 200) {
        setFilteredRecipes(response.data);
      } else {
        console.error('Error fetching suggestions:', response.statusText);
      }
    } else {
      setFilteredRecipes([]);
    }
  };

  const onSuggestionsClearRequested = () => {
    setFilteredRecipes([]);
  };

  const getSuggestionValue = suggestion => suggestion.koreanName;

  const renderSuggestion = suggestion => <span>{suggestion.koreanName}</span>;

  return (
    <div className="cocktailsearch-container">
      <h1 className="center">Cocktail Recipe Search</h1>
      <div className="center">
        <div className="fancySearchContainer">
          <select className="btn" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="name">Name</option>
            <option value="ingredients">Ingredients</option>
          </select>
          <Autosuggest
            suggestions={filteredRecipes}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <button className="btn btn__secondary" onClick={handleSearch}>
            <span className="button-text"></span>
          </button>
        </div>
        {filteredRecipes.length === 0 && <div className="cockp center">No search results found.</div>}
      </div>

      <div className="center">
        <div className="recipieCards" style={{ width: '100%' }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredRecipes.map(recipe => (
              <div
                className="flip-card"
                key={recipe.id}
                onClick={() => setSelectedCocktail(recipe)}
              >
                <div className="flip-card-inner">
                  <div
                    className="flip-card-front combined"
                    style={{ backgroundImage: `url(${recipe.image})` }}
                  >
                    <h2 className="highlight">{recipe.englishName}</h2>
                    <h3>{recipe.koreanName}</h3>
                  </div>
                  <div className="flip-card-back">
                    <h2>Ingredients</h2>
                    <div className="ingredients">
                      {recipe.ingredients.split(',').map((ingredient, index) => (
                        <React.Fragment key={index}>
                          {ingredient.trim()}
                          {index !== recipe.ingredients.split(',').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedCocktail && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedCocktail.englishName}</h2>
            <h3>Method</h3>
            <br></br>
            <p>{selectedCocktail.method}</p>
            <h3>Garnish</h3>
            <br></br>
            <p>{selectedCocktail.garnish}</p>
            <button className="modal-close" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CocktailSearch;
