import React, { useState } from 'react';

export default function SearchForm({ onSubmit }) {
  const [searchText, setSearchText] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchText);
    setSearchText('');
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        className="search"
        type="search"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
}
