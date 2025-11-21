import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import dayjs from 'dayjs'
import './style.scss'
import CardCasting from '../../components/card/CardCasting'
import SliderFilm from '../../components/slider/SliderFilm'
import SliderVideos from '../../components/slider/SliderVideos'
import CardFilm from '../../components/card/CardFilm'
import Loading from '../Loading'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { MdArrowBack } from 'react-icons/md'
import type { Cast, Video, Movie } from '../../types'
import { AxiosInstance } from '../../apis/api'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setDataFilmById } from '../../features/dataFilmSlice'

const DetailMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const dataFilm = useAppSelector((state) => state.dataFilm.dataFilmById)
  const [dataCredits, setDataCredits] = useState<Cast[]>([])
  const [dataVideos, setDataVideos] = useState<Video[]>([])
  const [dataRecommendations, setDataRecommendations] = useState<Movie[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    AxiosInstance.get(`/movie/${id}`, { params: { api_key: import.meta.env.VITE_TMBD_KEY } })
      .then((res) => { setIsLoading(false); dispatch(setDataFilmById(res.data)) })
  }, [id, dispatch])

  useEffect(() => {
    AxiosInstance.get(`/movie/${id}/credits`, { params: { api_key: import.meta.env.VITE_TMBD_KEY } })
      .then((res) => setDataCredits(res.data.cast))
  }, [id])

  useEffect(() => {
    AxiosInstance.get(`/movie/${id}/recommendations`, { params: { api_key: import.meta.env.VITE_TMBD_KEY } })
      .then((res) => setDataRecommendations(res.data.results))
  }, [id])

  useEffect(() => {
    AxiosInstance.get(`/movie/${id}/videos`, { params: { api_key: import.meta.env.VITE_TMBD_KEY } })
      .then((res) => setDataVideos(res.data.results))
  }, [id])

  if (isLoading || !dataFilm) return <Loading />

  return (
    <>
      <div className="detail__container" style={{ backgroundImage: `url(${import.meta.env.VITE_IMG_URL}/${dataFilm.backdrop_path})` }}>
        <div className="icon__container position-absolute" onClick={() => navigate('/')}><MdArrowBack className="icon" /></div>
        <div className="opacity-layer"></div>
        <div className="container data__detail d-flex gap-3">
          <div className="image__detail">
            <LazyLoadImage src={`${import.meta.env.VITE_IMG_URL}/${dataFilm.poster_path}`} alt="" className="image__detail2" />
          </div>
          <div className="content__detail d-flex flex-wrap gap-2 flex-column">
            <span className="fs-5">{dataFilm.title}</span>
            <span className="fs-6">Release Date: {dayjs(dataFilm.release_date).format('MMM D, YYYY')}</span>
            <div className="fs-6 genres__detail d-flex gap-1">
              {dataFilm.genres?.map((genre, i) => <span key={i} className="font__color1 genre__detail">{genre.name}</span>)}
            </div>
            <div className="overview__detail">{dataFilm.overview}</div>
          </div>
        </div>
      </div>
      <section className="content__detail__container font__color container">
        <section className="my-3">
          <div className="fs-3 fw-bold">Casting</div>
          <div className="cards__casting">
            <SliderFilm>{dataCredits.map((casting, i) => <div key={i}><CardCasting casting={casting} /></div>)}</SliderFilm>
          </div>
        </section>
        {dataVideos.length > 0 && (
          <section className="my-3">
            <div className="fs-3 fw-bold">Trailer</div>
            <div className="cards__video">
              <SliderVideos>
                {dataVideos.map((video, i) => (
                  <div key={i}><iframe className="m-4" src={`https://www.youtube.com/embed/${video.key}`} title="video" width="500px" height="450px"></iframe></div>
                ))}
              </SliderVideos>
            </div>
          </section>
        )}
        <section className="my-3">
          <div className="fs-4 fw-bold mb-4">Rekomendasi</div>
          <div className="cards__recommendation">
            <SliderFilm>
              {dataRecommendations.map((rec, i) => <Link to={`/detail/${rec.id}`} key={i} className="Link"><CardFilm data={rec} /></Link>)}
            </SliderFilm>
          </div>
        </section>
      </section>
    </>
  )
}

export default DetailMovie