import './style.scss'
import { useState, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdClose, MdSearch } from 'react-icons/md'
// import Search from '../search/search'
import { Link } from 'react-router-dom'
import type { Movie } from '../../../types'
import { AxiosInstance } from '../../../apis/api'


const Navbar: React.FC = () => {
  const [active, setActive] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [dataQueryMovie, setDataQueryMovie] = useState<Movie[]>([])
  const [query, setQuery] = useState('')

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setActive(true)
    } else {
      setActive(false)
    }
  }

  useEffect(() => {
    const searchAPI = async () => {
      try {
        const response = await AxiosInstance.get(`search/movie?query=${query}&`, {
          params: { api_key: import.meta.env.VITE_TMBD_KEY },
        })
        setDataQueryMovie(response.data.results)
      } catch (error) {
        setDataQueryMovie([])
      }
    }

    if (query) {
      searchAPI()
    } else {
      setDataQueryMovie([])
    }
  }, [query])

  useEffect(() => {
    window.addEventListener('scroll', changeBackground)
    return () => window.removeEventListener('scroll', changeBackground)
  }, [])

  return (
    <nav className={active ? 'navbar__container active' : 'navbar__container'}>
      <div className="logo__navbar">M-Streaming</div>
      <div
        className={mobile ? 'list_menu_mobile' : 'list_menu'}
        onClick={() => setMobile(false)}
      >
        <div className="menu__navbar">
          <Link to="#" className="Link color_nav">Movies</Link>
          <Link to="#" className="Link color_nav">TV Show</Link>
          <Link to="#" className="Link color_nav">Rekomendasi</Link>
        </div>
      </div>
      <div className="search__film">
        <MdSearch className="icon__navbar" />
        <input
          type="text"
          className="input__search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* {dataQueryMovie.length > 0 && <Search data={dataQueryMovie} />} */}
      </div>
      <button className="mobile-menu" onClick={() => setMobile(!mobile)}>
        {mobile ? <MdClose className="icon__navbar" /> : <GiHamburgerMenu className="icon__navbar" />}
      </button>
    </nav>
  )
}

export default Navbar