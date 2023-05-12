import { LazyLoadImage } from "react-lazy-load-image-component";
import "./style.scss";
import { Link } from "react-router-dom";

const Search = ({ data }) => {
  console.log("search", data);
  return (
    <div className="search__comp">
      {data.slice(0, 5).map((data, i) => {
        return (
          <Link to={`detail/${data.id}`} key={i} className="Link">
            <div className="card__search">
              <div className="image">
                <LazyLoadImage
                  className="image_search"
                  src={`${process.env.REACT_APP_IMG_URL}/${data.poster_path}`}
                  alt={data.title}
                />
              </div>
              <div className="title">{data.title}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Search;
