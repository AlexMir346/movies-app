import { configureStore } from '@reduxjs/toolkit';
import movieDetailsSlice from '../components/movieDetails/movieDetailsSlice';
import moviesSlice from '../components/movieList/movieSlice';

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    movie: movieDetailsSlice,
  },
});
