
import SliderFilm from '../../components/slider/SliderFilm'
import { Link } from 'react-router-dom'
import CardFilm from '../../components/card/CardFilm'
import { useAppSelector } from '../../store/hooks'

const Popular: React.FC = () => {
  const { film } = useAppSelector((state) => state.dataFilm.dataPopular)

  return (
    <section className="fs-3 fw-bold my-3">
      <div className="d-flex justify-content-between mb-2">
        <div className="font__color2 mb-3">Popular</div>
        <Link to="/popular" className="Link view__more">Views More</Link>
      </div>
      <div className="cards">
        <SliderFilm>
          {film.map((data, i) => (
            <Link to={`detail/${data.id}`} key={i} className="Link">
              <CardFilm data={data} />
            </Link>
          ))}
        </SliderFilm>
      </div>
    </section>
  )
}

export default Popular