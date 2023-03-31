import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, BASE_API_URL, SEARCH_API } from '../../utils/constants';

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
        state.isLoading = true;
        state.moviesStatus = 'pending';
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.isLoading = false;
        state.moviesStatus = 'idle';
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.moviesStatus = 'error';
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getSearchMovies.pending, (state) => {
        state.isLoading = true;
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
        state.isLoading = false;
      });
  },
});

export const { addToWishLish, removeFromWishList } = moviesSlice.actions;

export default moviesSlice.reducer;
