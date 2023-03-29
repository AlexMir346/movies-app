import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const API_KEY = 'f59753c2d71820541bb691c8a7759421';
const BASE_API_URL = 'https://api.themoviedb.org/3';
const SEARCH_API = `${BASE_API_URL}/search/movie?&api_key=${API_KEY}&query=`;

export const getMovies = createAsyncThunk('movies/getMovies', async (page) => {
  const result = await axios.get(
    `${BASE_API_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${page}`,
  );
  return result.data.results;
});

export const getSearchMovies = createAsyncThunk('movies/getSearchMovies', async (searchTerm) => {
  const response = await axios.get(`${SEARCH_API}${searchTerm}`);
  return response.data.results;
});

const initialState = {
  movies: [],
  totalPages: 500,
  searchedMovies: [],
  wishList: [],
  isWishListUpdated: false,
  isLoading: true,
  moviesStatus: 'idle',
  searchStatus: 'idle',
  error: null,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToWishLish: (state, action) => {
      const { id } = action.payload;
      const findIndex = state.wishList.findIndex((movie) => movie.id === id);
      const movieToAdd = state.movies.find((movie) => movie.id === id);
      const searchedMovieToAdd = state.searchedMovies.find((movie) => movie.id === id);
      if (findIndex === -1) {
        state.wishList.push({ ...movieToAdd, ...searchedMovieToAdd });
        state.isWishListUpdated = true;
      }
    },
    removeFromWishList: (state, action) => {
      state.wishList = state.wishList.filter((movie) => movie.id !== action.payload);
      state.isWishListUpdated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.moviesStatus = 'pending';
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.moviesStatus = 'idle';
        state.movies = action.payload;
        state.isLoading = false;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.moviesStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(getSearchMovies.pending, (state) => {
        state.searchStatus = 'pending';
        state.searchedMovies = [];
      })
      .addCase(getSearchMovies.fulfilled, (state, action) => {
        state.searchStatus = 'idle';
        state.searchedMovies = action.payload;
        state.isLoading = false;
      })
      .addCase(getSearchMovies.rejected, (state, action) => {
        state.searchStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const { addToWishLish, removeFromWishList } = moviesSlice.actions;

export default moviesSlice.reducer;
