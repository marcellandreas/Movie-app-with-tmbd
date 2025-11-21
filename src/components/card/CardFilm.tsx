import './card.scss'
import dayjs from 'dayjs'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import type { Movie } from '../../types'

interface CardFilmProps {
  data: Movie
}

const CardFilm: React.FC<CardFilmProps> = ({ data }) => {
  return (
    <div className="card__film fw-normal rounded-2 font__color">
      <div className="image__film rounded-2 relavite">
        <div className="rating__film">
          <span>{Math.floor(data.vote_average)}</span>
        </div>
        <LazyLoadImage
          className="image__film2 rounded-2"
          src={`${import.meta.env.VITE_IMG_URL}/${data.poster_path}`}
          alt={data.title}
        />
      </div>
      <div className="body__card rounded-2 d-flex flex-column gap-0">
        <span className="date__film">
          {dayjs(data.release_date).format('MMM D, YYYY')}
        </span>
        <span className="title__film">{data.title || data.name}</span>
      </div>
    </div>
  )
}

export default CardFilm