import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Movie, Genre, DataFilmState, ApiResponse } from '../types'

const initialState: DataFilmState = {
  dataFilmNowPlaying: [],
  dataFilmComingSoon: [],
  dataFilmById: null,
  genres: [],
  dataPopular: {
    film: [],
  },
  counterPage: {
    total_pages: 0,
    page: 1,
  },
}

export const dataFilmSlice = createSlice({
  name: 'dataFilm',
  initialState,
  reducers: {
    setDataFilmNowPlaying: (state, action: PayloadAction<Movie[]>) => {
      state.dataFilmNowPlaying = action.payload
    },
    setDataPopular: (state, action: PayloadAction<ApiResponse<Movie>>) => {
      state.dataPopular.film = action.payload.results
      state.counterPage.total_pages = action.payload.total_pages
      state.counterPage.page = action.payload.page
    },
    changePagesNext: (state) => {
      state.counterPage.page += 1
    },
    changePagesPrev: (state) => {
      state.counterPage.page = state.counterPage.page === 1 ? 1 : state.counterPage.page - 1
    },
    setDataFilmComingSoon: (state, action: PayloadAction<Movie[]>) => {
      state.dataFilmComingSoon = action.payload
    },
    setDataFilmById: (state, action: PayloadAction<Movie>) => {
      state.dataFilmById = action.payload
    },
    getGenres: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload
    },
  },
})

export const {
  setDataFilmNowPlaying,
  setDataFilmComingSoon,
  setDataFilmById,
  getGenres,
  setDataPopular,
  changePagesNext,
  changePagesPrev,
} = dataFilmSlice.actions

export default dataFilmSlice.reducer