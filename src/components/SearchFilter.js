import React from 'react';

const SearchFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <label>
        Search:
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
      </label>
    </div>
  );
};

export default SearchFilter;
