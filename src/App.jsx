import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for fetching search results
      const response = await axios.get(`https://app.scrapingbee.com/api/v1/store/google?search=${searchQuery}&api_key=DDELHPFOWPDU6NGH6W4Q6ZZ8ALAUIN0D5D0FPZSMRY5OOIR65B0YSMERYYRRG6RHZ8K2JFFMEDM6RLFE`);
      setSearchResults(response.data);

      
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter your search query"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div key={index}>
              <h3><a href={result.url}>{result.heading}</a></h3>
              <p>{result.text}</p>
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
