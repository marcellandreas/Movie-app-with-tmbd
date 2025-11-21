import { useEffect } from 'react'
import './App.css'


import { AxiosInstance } from './apis/api'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { getGenres, setDataFilmComingSoon, setDataFilmNowPlaying, setDataPopular } from './features/dataFilmSlice'
import Routing from './routes'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { page } = useAppSelector((state) => state.dataFilm.counterPage)

  useEffect(() => {
    AxiosInstance.get(`/movie/popular?page=${page}&`, {
      params: { api_key: import.meta.env.VITE_TMBD_KEY },
    }).then((res) => {
      dispatch(setDataPopular(res.data))
    })
  }, [dispatch, page])

  useEffect(() => {
    AxiosInstance.get(`/movie/now_playing`, {
      params: { api_key: import.meta.env.VITE_TMBD_KEY },
    }).then((res) => {
      dispatch(setDataFilmNowPlaying(res.data.results))
    })
  }, [dispatch, page])

  useEffect(() => {
    AxiosInstance.get(`/movie/upcoming`, {
      params: { api_key: import.meta.env.VITE_TMBD_KEY },
    }).then((res) => {
      dispatch(setDataFilmComingSoon(res.data.results))
    })
  }, [dispatch])

  useEffect(() => {
    AxiosInstance.get(`/genre/movie/list`, {
      params: { api_key: import.meta.env.VITE_TMBD_KEY },
    }).then((res) => {
      dispatch(getGenres(res.data.genres))
    })
  }, [dispatch])

  return <Routing />
}

export default App