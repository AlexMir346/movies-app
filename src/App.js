import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import MovieList from './components/movieList/MovieList';
import WishList from './components/wishMovieList/WishMovieList';
import SearchList from './components/searchList/SearchList';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<MovieList />} />

        <Route path="/search" element={<SearchList />} />

        <Route path="/wishList" element={<WishList />} />
      </Routes>
    </>
  );
}

export default App;
