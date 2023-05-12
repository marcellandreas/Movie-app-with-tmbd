import "./style.scss";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose, MdSearch } from "react-icons/md";
import { AxiosIntance } from "../../apis/Api";
import Search from "../search/search";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [dataQuaryMovie, setDataQuaryMovie] = useState([]);
  const [query, setQuery] = useState("");

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    const searchAPI = async () => {
      try {
        const response = await AxiosIntance.get(
          `search/movie?query=${query}&`,
          {
            params: { api_key: process.env.REACT_APP_TMBD_KEY },
          }
        );
        setDataQuaryMovie(response.data.results);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setDataQuaryMovie([]);
        }
      }
    };

    if (query) {
      searchAPI();
    } else {
      setDataQuaryMovie();
    }
  }, [query]);

  window.addEventListener("scroll", changeBackground);
  return (
    <nav className={active ? "navbar__container active" : "navbar__container"}>
      <div className="logo__navbar">M-Streaming</div>
      <div
        className={mobile ? "list_menu_mobile" : "list_menu"}
        onClick={() => setMobile(false)}
      >
        <div className="menu__navbar">
          <Link to={`#`} className="Link color_nav">
            Movies
          </Link>
          <Link to={`#`} className="Link color_nav">
            TV Show
          </Link>
          <Link to={`#`} className="Link color_nav">
            Rekomendasi
          </Link>
        </div>
        {/* <button className="login__navbar btn btn-primary">Login</button> */}
      </div>
      <div className="search__film">
        <MdSearch className="icon__navbar" />
        <input
          type="text"
          className={"input__search"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {dataQuaryMovie && <Search data={dataQuaryMovie} />}
      </div>
      <button className="mobile-menu" onClick={() => setMobile(!mobile)}>
        {mobile ? (
          <MdClose className="icon__navbar" />
        ) : (
          <GiHamburgerMenu className="icon__navbar" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
