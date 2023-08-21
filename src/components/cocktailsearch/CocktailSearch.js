import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './CocktailSearch.css';

const MIN_SEARCH_LENGTH = 2;

function CocktailSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('name');
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [cocktailImages, setCocktailImages] = useState({});

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const fetchImages = async () => {
    const images = {};
    for (const recipe of allRecipes) {
      if (recipe.cnum) {
        try {
          const response = await fetch(`http://localhost:8080/images/${recipe.cnum}`);
          if (response.ok) {
            const imageData = await response.text();
            images[recipe.cnum] = `data:image/jpeg;base64,${imageData}`;
          } else {
            console.error('Image not found');
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    }
    setCocktailImages(images);
  };

  const handleScroll = () => {
    if (!hasMore) return;
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8080/recipes')
      .then(response => {
        const recipesWithIngredientsArray = response.data.map(recipe => ({
          ...recipe,
          ingredientsArray: recipe.ingredients.split(', ').filter(ingredient => ingredient.trim() !== "")
        }));
        setAllRecipes(recipesWithIngredientsArray);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/recipes?page=${page}`)
      .then(response => {
        const newRecipes = response.data.map(recipe => ({
          ...recipe,
          ingredientsArray: recipe.ingredients.split(', ').filter(ingredient => ingredient.trim() !== "")
        }));
        setAllRecipes(prevRecipes => [...prevRecipes, ...newRecipes]);
        setHasMore(newRecipes.length > 0);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [allRecipes]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, page]); // handleScroll 함수에서 hasMore와 page를 사용하므로 의존성 추가

  const handleSearch = () => {
    if (searchTerm.trim().length < MIN_SEARCH_LENGTH) {
      return;
    }

    const filtered = allRecipes.filter(recipe =>
      (category === 'name' && recipe.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (category === 'ingredients' && recipe.ingredientsArray.some(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
    setFilteredRecipes(filtered);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSearchTerm(value);
  };

  const onSuggestionsClearRequested = () => {
    setFilteredRecipes(allRecipes);
  };

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : category === 'name' ? allRecipes.filter(recipe =>
      recipe.name.toLowerCase().slice(0, inputLength) === inputValue
    ) : allRecipes.flatMap(recipe =>
      recipe.ingredientsArray.filter(ingredient =>
        ingredient.toLowerCase().includes(inputValue)
      )
    );
  };

  const renderSuggestion = suggestion => {
    const suggestionText = category === 'name' ? suggestion.name : suggestion;
    const highlightText = searchTerm.toLowerCase();

    const parts = suggestionText.split(new RegExp(`(${highlightText})`, 'gi'));
    return (
      <div>
        {parts.map((part, index) =>
          part.toLowerCase() === highlightText ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </div>
    );
  };

  const inputProps = {
    placeholder: 'Search for a cocktail...',
    value: searchTerm,
    onChange: (event, { newValue }) => setSearchTerm(newValue),
    onKeyPress: handleKeyPress
  };

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
            suggestions={getSuggestions(searchTerm)}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={suggestion => (category === 'name' ? suggestion.name : suggestion)}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <button className="btn btn__secondary" onClick={handleSearch}>
            <span className="button-text">Search</span>
          </button>
        </div>
      </div>

      <div className="center">
        <div className="recipieCards" style={{ width: '200%' }}>
          {loading ? (
            <p>Loading...</p>
          ) : filteredRecipes.length === 0 ? (
            <p>No search results found.</p>
          ) : (
            filteredRecipes.map(recipe => (
              <div className="flip-card" key={recipe.cnum}>
                <div className="flip-card-inner">
                  <div className="flip-card-front combined" style={{ backgroundImage: `url(${cocktailImages[recipe.cnum]})` }}>
                    <h1>{recipe.name}</h1>
                    <div className="ingredient-table">
                      {recipe.ingredientsArray.map((ingredient, index) => (
                        <div
                          key={index}
                          className={`ingredient-cell ${
                            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
                              ? 'highlight-cell'
                              : ''
                          }`}
                        >
                          {ingredient.split(', ').map((item, index) => (
                            <p
                              key={index}
                              className={`ingredient-line ${
                                item.toLowerCase().includes(searchTerm.toLowerCase()) ? 'highlight' : ''
                              }`}
                            >
                              {item}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <h2>제조법</h2>
                    <div className="cmethod">{recipe.cmethod}</div>
                    <h2>가니쉬</h2>
                    <div className="garnish">{recipe.garnish}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CocktailSearch;
