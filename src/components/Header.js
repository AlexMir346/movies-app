import React, { useState } from 'react';

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

export default function Header(getMovies) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);

      setSearchTerm('');
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header>
      <form>
        <button className="button" action="/">
          Home page
        </button>
      </form>

      <form onSubmit={handleOnSubmit}>
        <input
          className="search"
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleOnChange}
        />
      </form>
    </header>
  );
}
