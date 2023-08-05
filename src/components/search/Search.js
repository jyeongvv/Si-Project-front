import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchSuggestion from './SearchSuggestion';
import './Search.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const popupRef = useRef(null);

  useEffect(() => {
    // 다른 곳을 클릭했을 때 팝업창을 닫는 함수
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    // 전체 문서에 클릭 이벤트를 추가합니다.
    document.addEventListener('click', handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedText = searchText.trim();
    if (trimmedText !== '') {
      console.log("검색어: ", trimmedText);
      navigate("/login", { state: { searchText: trimmedText } });
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    // 입력값이 비어있을 때는 팝업창을 닫습니다.
    if (value === '') {
      setSuggestions([]);
    } else {
      // 여기서는 간단한 예시를 위해 미리 정해진 연관검색어를 사용하겠습니다.
      // 실제 개발에서는 백엔드와의 통신 등을 통해 동적으로 연관검색어를 가져와야 할 수도 있습니다.
      const relatedKeywords = ['보드카','위스키'];

      // 입력된 텍스트와 일치하는 연관검색어를 필터링합니다.
      const filteredSuggestions = relatedKeywords.filter(keyword =>
        keyword.includes(value)
      );

      // 연관검색어를 상태에 업데이트합니다.
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (value) => {
    setSearchText(value);
    setSuggestions([]);
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
              onChange={handleSearchChange}
              required
              onInvalid={(e) => e.preventDefault()}
              style={{ outline: "none", border: "none" }}
              ref={popupRef} // 팝업창의 ref를 설정합니다.
              onClick={() => {
                if (suggestions.length > 0) {
                  setSuggestions([]); // 이미 팝업창이 열려있는 경우에는 다시 클릭했을 때 닫습니다.
                }
              }}
            />
          </div>
          <div className="search-td search-s-cover">
            <button className="search-button" type="submit">
              <div className="search-s-circle"></div>
              <span></span>
            </button>
          </div>
        </div>
      </form>

      {/* 연관검색어를 보여주는 컴포넌트를 추가합니다 */}
      {suggestions.length > 0 && (
        <SearchSuggestion
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
};

export default SearchBar;
