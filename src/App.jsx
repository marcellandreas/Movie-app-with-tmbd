import { useEffect } from "react";
import "./App.css";
import Routing from "./routers/Routings";
import { AxiosIntance } from "./apis/Api";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataPopular,
  getGenres,
  setDataFilmNowPlaying,
  setDataFilmComingSoon,
} from "./features/dataFilmSlice";

const App = () => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.dataFilm.counterPage);

  // Popular Film
  useEffect(() => {
    AxiosIntance.get(`/movie/popular?page=${page}&`, {
      params: { api_key: process.env.REACT_APP_TMBD_KEY },
    }).then((res) => {
      dispatch(setDataPopular(res.data));
    });
  }, [dispatch, page]);

  // Now Playing Movie:
  useEffect(() => {
    AxiosIntance.get(`/movie/now_playing`, {
      params: { api_key: process.env.REACT_APP_TMBD_KEY },
    }).then((res) => {
      dispatch(setDataFilmNowPlaying(res.data.results));
      console.log(res.data.results);
    });
  }, [dispatch, page]);

  // Coming Soon
  useEffect(() => {
    AxiosIntance.get(`/movie/upcoming`, {
      params: { api_key: process.env.REACT_APP_TMBD_KEY },
    }).then((res) => {
      dispatch(setDataFilmComingSoon(res.data.results));
    });
  }, [dispatch]);

  // Get Genres
  useEffect(() => {
    AxiosIntance.get(`/genre/movie/list`, {
      params: { api_key: process.env.REACT_APP_TMBD_KEY },
    }).then((res) => {
      dispatch(getGenres(res.data.genres));
    });
  }, [dispatch]);
  return (
    <>
      <Routing />
    </>
  );
};

export default App;
