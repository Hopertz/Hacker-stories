import React from 'react' 

const LastSearches = ({ lastSearches, onLastSearch }) => (
    <div>
      {lastSearches.map((searchTerm, index) => (
      <button
      key={searchTerm + index}
      type="button"
      onClick={() => onLastSearch(searchTerm)}
      >
      {searchTerm}
      </button>
      ))}
    </div>
);

export default LastSearches;
    