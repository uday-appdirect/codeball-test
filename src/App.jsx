import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import { fetchHelper } from './utils';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState([])
  const API_KEY = 'RHWM6PKOP4TFG4XM9MQHH6I6XJN7SE913UFDKZE613MDRRPSDVUHTFAQ2FRHNOXJX0B9TUSK79U1EE72'

  const getSearchResults = async (searchQuery) => {
    const url = `https://app.scrapingbee.com/api/v1/store/google?search=${searchQuery}&api_key=${API_KEY}&nb_results=10`
    return fetchHelper(url);
  }

  const getText = async (url) => {
    const url2 = `https://app.scrapingbee.com/api/v1/?url=${url}&render_js=false&extract_rules={"text":"body"}&api_key=${API_KEY}`
    return fetchHelper(url2);
  }

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await getSearchResults(searchQuery);
      setSearchResults(response.data);
  
      const textPromises = [];
      for (let i = 0; i < 5; i++) {
        textPromises.push(getText(response.data.organic_results[i].url));
      }
  
      const textResponses = await Promise.all(textPromises);
      const textArr = textResponses.map(res => res.data.text);
      setText(textArr);
  
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
    setIsLoading(false);
  };
  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search query"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          {isLoading ? 'Searching' : 'Search'}
        </button>
      </div>

      <div className="search-results">
        {text.length > 0 ? (
          text.map((result, index) => (
            <div key={index} className="result-item">
              <h3>{searchResults.organic_results[index].title}</h3>
              <a href={searchResults.organic_results[index].url}>{searchResults.organic_results[index].url}</a>
              <p>{result}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
