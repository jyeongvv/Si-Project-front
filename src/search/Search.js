import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedText = searchText.trim();
    if (trimmedText !== '') {
      console.log("검색어: ", trimmedText);
      navigate("/login", { state: { searchText: trimmedText } });
    }
  };

  return (
    <div className="search-cover">
      <form className="search-form" method="get" action="" onSubmit={handleSearchSubmit}>
        <div className="search-input-container">
          <div className="search-td">
            <input
              type="text"
              placeholder="검색"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              list="autoSuggestions" // 여기에 datalist의 id를 추가합니다
              required
              onInvalid={(e) => e.preventDefault()}
              style={{ outline: "none", border: "none" }}
            />
            {/* datalist를 생성합니다. id는 "autoSuggestions"로 지정합니다. */}
            <datalist id="autoSuggestions">
              <option value="제안 1" />
              <option value="제안 2" />
              {/* 원하는 만큼 더 많은 제안 옵션을 추가할 수 있습니다 */}
            </datalist>
          </div>
          <div className="search-td search-s-cover">
            <button className="search-button" type="submit">
              <div className="search-s-circle"></div>
              <span></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
