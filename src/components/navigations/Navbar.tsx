import './style.scss'
import { useState, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdClose, MdSearch } from 'react-icons/md'
import Search from '../search/search'
import { Link } from 'react-router-dom'
import type { Movie } from '../../types'
import { AxiosInstance } from '../../apis/api'

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
  <nav
    className={`
      fixed w-full h-[65px]  flex items-center justify-around z-30
      px-8 text-white transition duration-300
      backdrop-blur-md saturate-180
      ${active ? "bg-[rgba(10,10,10,0.35)] shadow-lg" : "bg-[rgba(10,10,10,0.15)]"}
    `}
  >
    {/* Logo */}
    <div className="text-[20px] font-bold tracking-wide drop-shadow-lg">
      M-Streaming
    </div>

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center">
      <div className="flex gap-[18px] text-[15px] transition">
        <Link to={'/movies'} className="text-white px-2.5 py-1.5 rounded-md hover:bg-white/10">Movies</Link>
        <Link to={'/'} className="text-white px-2.5 py-1.5 rounded-md hover:bg-white/10">TV Show</Link>
        <Link to={'/'} className="text-white px-2.5 py-1.5 rounded-md hover:bg-white/10">Rekomendasi</Link>
      </div>
    </div>

    {/* Search */}
    <div
      className="
        flex items-center gap-2 w-[260px] h-[34px] px-2.5 py-1.5 rounded-xl
        border border-[#b6ff7c] bg-white/10 backdrop-blur-sm
        transition focus-within:border-[#d1ffa1] focus-within:bg-white/20
      "
    >
      <MdSearch className="w-6 h-6 text-[#b6ff7c] opacity-90" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent outline-none text-white text-[13px]"
      />
      {dataQueryMovie.length > 0 && <Search data={dataQueryMovie} />}
    </div>

    {/* Mobile Button */}
    <button
      className="md:hidden bg-transparent border-none"
      onClick={() => setMobile(!mobile)}
    >
      {mobile ? (
        <MdClose className="w-[26px] h-[26px] text-white" />
      ) : (
        <GiHamburgerMenu className="w-[26px] h-[26px] text-white" />
      )}
    </button>

    {/* Mobile Menu */}
    {mobile && (
      <div
        className="
          absolute top-[65px] left-0 w-full flex flex-col py-4
          backdrop-blur-xl saturate-180 bg-[rgba(10,10,10,0.45)]
          border-t border-white/10 shadow-xl md:hidden
        "
        onClick={() => setMobile(false)}
      >
        <div className="flex flex-col gap-4 text-center w-full">
          <Link to={'/'} className="py-3 w-full hover:bg-white/10">Movies</Link>
          <Link to={'/'} className="py-3 w-full hover:bg-white/10">TV Show</Link>
          <Link to={'/'} className="py-3 w-full hover:bg-white/10">Rekomendasi</Link>
        </div>
      </div>
    )}
  </nav>
);
}

export default Navbar