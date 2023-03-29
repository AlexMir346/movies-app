import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchResults({ moviesItems }) {
  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {moviesItems.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <Link to="/">Back to Movie List</Link>
    </div>
  );
}
