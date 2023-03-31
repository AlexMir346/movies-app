import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL, API_KEY } from '../../utils/constants';

export const getMovieById = createAsyncThunk('movies/getMovieById', async (id) => {
  const result = await axios.get(`${BASE_API_URL}/movie/${id}?api_key=${API_KEY}`);
  return result.data;
});

const initialState = {
  selectedMovie: {},
  isLoading: true,
  error: null,
  selectedMovieStatus: 'idle',
};

const movieDetailsSlice = createSlice({
  name: 'movie',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMovieById.pending, (state) => {
        state.isLoading = true;
        state.selectedMovieStatus = 'pending';
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
        state.isLoading = false;
        state.selectedMovieStatus = 'idle';
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.selectedMovieStatus = 'error';
      });
  },
});

export default movieDetailsSlice.reducer;
