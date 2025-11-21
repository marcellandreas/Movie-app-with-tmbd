import { configureStore } from "@reduxjs/toolkit";
import dataFilmSlice from "../features/dataFilmSlice";

export const store = configureStore({
  reducer: {
    dataFilm: dataFilmSlice,
  },
});
