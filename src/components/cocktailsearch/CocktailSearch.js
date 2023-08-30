import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './CocktailSearch.css';

const MIN_SEARCH_LENGTH = 1;

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

    const response = await axios.post(
      `http://localhost:8080/search/keyword`,
      null,
      {
        params: {
          keywordType: category,
          keyword: searchTerm,
        },
      }
    );

    try {
      if (response.status === 200) {
        setFilteredRecipes(response.data);
      } else {
        console.error('Error fetching recipes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error.message);
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

  let inputPlaceholder = 'ex) 앱솔루트, malibu';
  if (category === '베이스술') {
    inputPlaceholder = 'ex) 앱솔루트, malibu';
  } else if (category === '재료') {
    inputPlaceholder = 'ex) 보드카, 말리부';
  } else if (category === '칵테일명') {
    inputPlaceholder = 'ex) 모히토, 도하';
  }

  const inputProps = {
    placeholder: inputPlaceholder,
    value: searchTerm,
    onChange: (event, { newValue }) => setSearchTerm(newValue),
    onKeyPress: handleKeyPress,
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    setSearchTerm(value);

    if (value.length >= MIN_SEARCH_LENGTH) {
      const response = await axios.post(
        `http://localhost:8080/search/keyword`,
        null,
        {
          params: {
            keywordType: category,
            keyword: value,
          },
        }
      );

      try {
        if (response.status === 200) {
          setFilteredRecipes(response.data);
        } else {
          console.error('Error fetching suggestions:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error.message);
      }
    } else {
      setFilteredRecipes([]);
    }
  };

  const onSuggestionsClearRequested = () => {
    setFilteredRecipes([]);
  };

  const getSuggestionValue = suggestion => suggestion.koreanCocktailName;

  const renderSuggestion = suggestion => <span>{suggestion.koreanCocktailName}</span>;

  return (
    <div className="cocktailsearch-container">
      <h1 className="center">Cocktail Recipe Search</h1>
      <div className="center">
        <div className="fancySearchContainer">
          <select className="btn" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="베이스술">술이름</option>
            <option value="재료">재료</option>
            <option value="칵테일명">칵테일이름</option>
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
            
          </button>
        </div>
        {filteredRecipes.length === 0 && (
          <div className="cockp center">
           
            
                <br />
                일치하는 칵테일이 없어!<br />
                <img
                  src="https://cdn.pixabay.com/photo/2017/02/01/10/25/falling-2029463_1280.png"
                  alt="No results"
                  width="200"
                  height="200"
                />
              
            
          </div>
        )}
      </div>


      <div className="center">
        <div className="recipieCards" style={{ width: '100%' }}>
          {loading ? (
            <p>Loading...</p>
          ) : Array.isArray(filteredRecipes) ? (
            filteredRecipes.map((recipe, index) => (
              <div
                className="flip-card"
                key={recipe.id + '-' + index}  // 고유한 키 할당
                onClick={() => setSelectedCocktail(recipe)}
              >
                <div className="flip-card-inner">
                  <div
                    className="flip-card-front combined"
                    style={{ backgroundImage: `url(${recipe.image})` }}
                  >
                    <h2 className="highlight">{recipe.englishCocktailName}</h2>
                    <h3>{recipe.koreanCocktailName}</h3>
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
          ) : (
            <p></p>
          )}
        </div>
      </div>

      {selectedCocktail && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedCocktail.englishCocktailName}</h2>
            {/* <h2>{selectedCocktail.koreanAlcohol}</h2> */}
            <h3>Alcohol</h3>
      
        {Array.isArray(selectedCocktail.englishAlcohol)
          ? selectedCocktail.englishAlcohol.map((alcohol, index) => (
              <p key={index}>{alcohol}</p>
            ))
          : null}
      
            <h3>Method</h3>
            <br />
            <p>{selectedCocktail.method}</p>
            <h3>Garnish</h3>
            <br />
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
