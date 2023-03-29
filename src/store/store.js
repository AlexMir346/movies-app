import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from '../components/movieList/movieSlice';

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});
