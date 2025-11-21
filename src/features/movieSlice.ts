import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieService } from "../apis/api";



// Get Popular Movies
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async (page: number | undefined, thunkAPI) => {
    try {
      return await movieService.getPopularMovies(page);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Now Playing
export const fetchNowPlaying = createAsyncThunk(
  "movies/fetchNowPlaying",
  async (_, thunkAPI) => {
    try {
      return await movieService.getNowPlaying();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Upcoming
export const fetchUpcoming = createAsyncThunk(
  "movies/fetchUpcoming",
  async (_, thunkAPI) => {
    try {
      return await movieService.getUpcoming();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Genres
export const fetchGenres = createAsyncThunk(
  "movies/fetchGenres",
  async (_, thunkAPI) => {
    try {
      return await movieService.getGenres();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);