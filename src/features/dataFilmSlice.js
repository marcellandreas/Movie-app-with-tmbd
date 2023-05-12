import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataFilmNowPlaying: [],
  dataFilmComingSoon: [],
  dataFilmById: [],
  genres: [],
  dataPopular: {
    film: [],
  },
  counterPage: {
    total_pages: "",
    page: "",
  },
};

export const dataFilmSlice = createSlice({
  name: "dataFilm",
  initialState,
  reducers: {
    setDataFilmNowPlaying: (state, action) => {
      state.dataFilmNowPlaying = action.payload;
    },
    setDataPopular: (state, action) => {
      state.dataPopular.film = action.payload.results;
      state.counterPage.total_pages = action.payload.total_pages;
      state.counterPage.page = action.payload.page;
    },
    changePagesNext: (state) => {
      state.counterPage.page += 1;
    },
    changePagesPrev: (state) => {
      state.counterPage.page =
        state.counterPage.page === 1
          ? state.counterPage.page === 1
          : (state.counterPage.page -= 1);
    },
    setDataFilmComingSoon: (state, action) => {
      state.dataFilmComingSoon = action.payload;
    },
    setDataFilmById: (state, action) => {
      state.dataFilmById = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDataFilmNowPlaying,
  setDataFilmComingSoon,
  setDataFilmById,
  getGenres,
  setDataPopular,
  changePagesNext,
  changePagesPrev,
  counterPage,
} = dataFilmSlice.actions;

export default dataFilmSlice.reducer;
