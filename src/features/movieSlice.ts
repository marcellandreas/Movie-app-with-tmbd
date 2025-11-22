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

interface MovieState {
  popular: any[];
  nowPlaying: any[];
  upcoming: any[];
  genres: any[];
  loading: boolean;
}

const initialState: MovieState = {
  popular: [],
  nowPlaying: [],
  upcoming: [],
  genres: [],
  loading: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Popular
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload.results;
      })
      .addCase(fetchPopularMovies.rejected, (state) => {
        state.loading = false;
      })

      // Now Playing
      .addCase(fetchNowPlaying.fulfilled, (state, action) => {
        state.nowPlaying = action.payload;
      })

      // Upcoming
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.upcoming = action.payload;
      })

      // Genres
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

export default movieSlice.reducer;