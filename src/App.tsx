import { useEffect } from 'react'
import './App.css'


import { AxiosInstance, movieService } from './apis/api'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { getGenres, setDataFilmComingSoon, setDataFilmNowPlaying, setDataPopular } from './features/dataFilmSlice'
import Routing from './routes'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { page } = useAppSelector((state) => state.dataFilm.counterPage)

  useEffect(() => {
    AxiosInstance.get(`/movie/popular?page=${page}`).then((res) => {
      dispatch(setDataPopular(res.data))
    })
  }, [dispatch, page])

  useEffect(() => {
    AxiosInstance.get(`/movie/now_playing`).then((res) => {
      dispatch(setDataFilmNowPlaying(res.data.results))
    })
  }, [dispatch, page])

  useEffect(() => {
    AxiosInstance.get(`/movie/upcoming`).then((res) => {
      dispatch(setDataFilmComingSoon(res.data.results))
    })
  }, [dispatch])

  useEffect(() => {
    AxiosInstance.get(`/genre/movie/list`).then((res) => {
      dispatch(getGenres(res.data.genres))
    })
  }, [dispatch])

  


  return (
     <>
      <ToastContainer />
    <Routing />
    </>
  )
 
}

export default App