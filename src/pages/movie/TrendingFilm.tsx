import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SliderFilm from '../../components/slider/SliderFilm'
import CardFilm from '../../components/card/CardFilm'
import type { Movie } from '../../types'
import { AxiosInstance } from '../../apis/api'

const TrendingFilm: React.FC = () => {
  const typeTime = 'day'
  const active = 'button__handle2 activeTab'
  const menu = 'button__handle2'

  const [activeTab, setActiveTab] = useState<'movie' | 'tv'>('movie')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Movie[]>([])

  useEffect(() => {
    AxiosInstance.get(`/trending/${activeTab}/${typeTime}`, {
      params: { api_key: import.meta.env.VITE_TMBD_KEY },
    }).then((res) => {
      setData(res.data.results)
      setLoading(false)
    })
  }, [activeTab])

  const switchTab = (setType: 'movie' | 'tv') => {
    setActiveTab(setType)
    setLoading(true)
  }

  return (
    <section className="fs-3 fw-bold my-3">
      <div className="d-flex justify-content-between mb-2">
        <div className="font__color2 mb-3">Trending</div>
        <div className="d-flex gap-3">
          <div className={activeTab === 'movie' ? active : menu} onClick={() => switchTab('movie')}>Movie</div>
          <div className={activeTab === 'tv' ? active : menu} onClick={() => switchTab('tv')}>Tv</div>
        </div>
      </div>
      {loading ? (
        <p className="loading">Sedang Memuat Data...</p>
      ) : (
        <div className="cards">
          <SliderFilm>
            {data.map((item, i) => (
              <div key={i}>
                {item.media_type === 'movie' ? (
                  <Link to={`detail/${item.id}`} className="Link"><CardFilm data={item} /></Link>
                ) : (
                  <Link to={`detail-tv/${item.id}`} className="Link"><CardFilm data={item} /></Link>
                )}
              </div>
            ))}
          </SliderFilm>
        </div>
      )}
    </section>
  )
}

export default TrendingFilm