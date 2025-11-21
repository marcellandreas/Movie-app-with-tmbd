import { configureStore } from '@reduxjs/toolkit'
import dataFilmSlice from '../features/dataFilmSlice'

export const store = configureStore({
  reducer: {
    dataFilm: dataFilmSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch