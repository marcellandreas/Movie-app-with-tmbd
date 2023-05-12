import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { changePagesNext, changePagesPrev } from "../../features/dataFilmSlice";
import { MdArrowBack } from "react-icons/md";

const MorePopular = () => {
  const { page } = useSelector((state) => state.dataFilm.counterPage);
  const { film } = useSelector((state) => state.dataFilm.dataPopular);
  const { total_pages } = useSelector((state) => state.dataFilm.counterPage);
  const dispatch = useDispatch();
  const currentPage = page;
  const navigate = useNavigate();

  const handleNext = (currentPage) => {
    dispatch(changePagesNext(currentPage));
    navigate(`/popular?page=${currentPage + 1}`);
  };

  const handlePrev = (currentPage) => {
    dispatch(changePagesPrev(currentPage));
    navigate(`?page=${currentPage === 1 ? currentPage : currentPage - 1}`);
  };

  return (
    <section className="container my-5">
      <div className="d-flex justify-content-center gap-4 my-5">
        <div
          className="icon__container position-absolute"
          onClick={() => {
            navigate(`/`);
          }}
        >
          <MdArrowBack className="icon" />
        </div>
        <h2 className="title fs-3 fw-bold font__color2">Popular Movie</h2>
      </div>
      <div className="cards d-flex flex-wrap gap-3 justify-content-center align-items-center">
        {film.map((data, i) => {
          return (
            <Link to={`/detail/${data.id}`} key={i} className="Link">
              <div className="card__film fw-normal rounded-2 font__color">
                <div className="image__film rounded-2 relavite">
                  <div className="rating__film">
                    <span>{data.vote_average}</span>
                  </div>
                  <LazyLoadImage
                    className="image__film2 rounded-2"
                    src={`${process.env.REACT_APP_IMG_URL}/${data.poster_path}`}
                    alt={data.title}
                    delayTime={200}
                  />
                </div>
                <div className="body__card rounded-2 d-flex flex-column gap-0">
                  <span className="date__film">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                  </span>
                  <span className="title__film">{data.title.slice(0, 25)}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="d-flex justify-content-center gap-2 my-3">
        {currentPage === 1 ? (
          <button style={{ display: "none" }}> Prev</button>
        ) : (
          <button
            className="button__handle danger__button"
            onClick={() => handlePrev(currentPage)}
          >
            Prev
          </button>
        )}
        {currentPage === total_pages ? (
          <button style={{ display: "none" }}>Next</button>
        ) : (
          <button
            className="button__handle primary__button"
            onClick={() => handleNext(currentPage)}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default MorePopular;
