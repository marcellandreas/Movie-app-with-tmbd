
import './style.scss'
import { useState, useEffect } from 'react'
import { useDebounce } from '../../../hooks/useDebounce'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdClose, MdSearch } from 'react-icons/md'
import { Link } from 'react-router-dom'
import type { Movie } from '../../../types'
import { AxiosInstance } from '../../../apis/api'
import Search from '../../search/search'

const Navbar: React.FC = () => {
  const [active, setActive] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [dataQueryMovie, setDataQueryMovie] = useState<Movie[]>([])
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)
  const [isSearching, setIsSearching] = useState(false)

  const changeBackground = () => {
    setActive(window.scrollY >= 80)
  }

  useEffect(() => {
    window.addEventListener('scroll', changeBackground)
    return () => window.removeEventListener('scroll', changeBackground)
  }, [])

  useEffect(() => {
    const searchAPI = async () => {
      setIsSearching(true)
      try {
        const response = await AxiosInstance.get(
          `search/movie?query=${debouncedQuery}&`,
          { params: { api_key: import.meta.env.VITE_TMBD_KEY } }
        )
        setDataQueryMovie(response.data.results)
      } catch {
        setDataQueryMovie([])
      } finally {
        setIsSearching(false)
      }
    }

    if (debouncedQuery) searchAPI()
    else {
      setDataQueryMovie([])
      setIsSearching(false)
    }
  }, [debouncedQuery])

  return (
    <nav className={active ? 'navbar__container active' : 'navbar__container'}>
      <div className="logo__navbar">M‑Streaming</div>

      {/* Desktop Menu */}
      <div className={mobile ? 'list_menu_mobile' : 'list_menu'} onClick={() => setMobile(false)}>
        <div className="menu__navbar">
          <Link to="#" className="Link color_nav">Movies</Link>
          <Link to="#" className="Link color_nav">TV Show</Link>
          <Link to="#" className="Link color_nav">Rekomendasi</Link>
        </div>
      </div>

      {/* Search */}
      <div className="search__film">
        <MdSearch className="icon__navbar" />
        <input
          type="text"
          className="input__search"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {isSearching && (
          <span className="search-loading" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 50 50">
              <path fill="currentColor" d="M43.935,25.145c0-10.318-8.364-18.681-18.68-18.681..."></path>
            </svg>
          </span>
        )}

        {dataQueryMovie.length > 0 && <Search data={dataQueryMovie} />}
      </div>

      {/* Mobile Menu */}
      <button className="mobile-menu" onClick={() => setMobile(!mobile)}>
        {mobile ? <MdClose className="icon__navbar" /> : <GiHamburgerMenu className="icon__navbar" />}
      </button>
    </nav>
  )
}

export default Navbar

