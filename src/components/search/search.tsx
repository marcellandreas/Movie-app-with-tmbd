import { LazyLoadImage } from 'react-lazy-load-image-component'
import './style.scss'
import { Link } from 'react-router-dom'
import type { Movie } from '../../types'

interface SearchProps {
  data: Movie[]
}

const Search: React.FC<SearchProps> = ({ data }) => {
  return (
    <div className="search__comp">
      {data.slice(0, 5).map((item, i) => (
        <Link to={`detail/${item.id}`} key={i} className="Link">
          <div className="card__search">
            <div className="image">
              <LazyLoadImage
                className="image_search"
                src={`${import.meta.env.VITE_IMG_URL}/${item.poster_path}`}
                alt={item.title}
              />
            </div>
            <div className="title">{item.title}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Search