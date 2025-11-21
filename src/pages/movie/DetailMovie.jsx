import { Link, useNavigate, useParams } from "react-router-dom";
import { AxiosIntance } from "../../apis/Api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataFilmById } from "../../features/dataFilmSlice";
import dayjs from "dayjs";
import "./style.scss";
import CardCasting from "../../components/card/CardCasting";
import SliderFilm from "../../components/slider/SliderFilm";
import SliderVideos from "../../components/slider/SliderVideos";
import CardFilm from "../../components/card/CardFilm";
import Loading from "../Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdArrowBack } from "react-icons/md";

const DetailMovie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const dataFilm = useSelector((state) => state.dataFilm.dataFilmById);
  const [dataCredits, setDataCreadits] = useState([]);
  const [dataVideos, setDataVideos] = useState([]);
  const [dataRecommendations, setDataRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AxiosIntance.get(`/movie/${id}`, {
      params: { api_key: process.env.REACT_APP_TMBD_KEY },
    }).then((res) => {
      setIsLoading(false);
      dispatch(setDataFilmById(res.data));
    });
  }, [isLoading, id, dispatch]);

  useEffect(() => {
    AxiosIntance.get(`/movie/${id}/credits`, {
      params: { api_key: process.env.REACT_APP_TMBD_KEY },
    }).then((res) => {
      setIsLoading(false);
      setDataCreadits(res.data.cast);
    });
  }, [isLoading, id]);

  useEffect(() => {
    AxiosIntance.get(`/movie/${id}/recommendations`, {
      params: { api_key: process.env.REACT_APP_TMBD_KEY },
    }).then((res) => {
      setIsLoading(false);
      setDataRecommendations(res.data.results);
    });
  }, [isLoading, id]);

  useEffect(() => {
    AxiosIntance.get(`/movie/${id}/videos`, {
      params: { api_key: process.env.REACT_APP_TMBD_KEY },
    }).then((res) => {
      setIsLoading(false);
      setDataVideos(res.data.results);
    });
  }, [isLoading, id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className="detail__container"
            style={{
              backgroundImage: `url(${process.env.REACT_APP_IMG_URL}/${dataFilm.backdrop_path})`,
            }}
          >
            <div
              className="icon__container position-absolute"
              onClick={() => {
                navigate(`/`);
              }}
            >
              <MdArrowBack className="icon" />
            </div>
            <div className="opacity-layer"></div>
            {/* Detail Data */}
            <div className="container data__detail d-flex gap-3">
              <div className="image__detail">
                <LazyLoadImage
                  src={`${process.env.REACT_APP_IMG_URL}/${dataFilm.poster_path}`}
                  alt=""
                  className="image__detail2"
                  delayTime={3000}
                />
              </div>
              <div className="content__detail d-flex flex-wrap gap-2 flex-column">
                <span className="fs-5">{dataFilm.title}</span>
                <span className="fs-6">
                  Release Date:{" "}
                  {dayjs(dataFilm.release_date).format("MMM D, YYYY")}
                </span>
                <div className=" fs-6 genres__detail d-flex gap-1 ">
                  {dataFilm.genres?.map((genre, i) => (
                    <span key={i} className="font__color1 genre__detail">
                      {genre.name}
                    </span>
                  ))}
                </div>
                <div className="overview__detail">{dataFilm.overview}</div>
              </div>
            </div>
            {/* Detail More Informations */}
          </div>
          <section className="content__detail__container font__color container">
            {/* Casting */}
            <section className="my-3">
              <div className="fs-3 fw-bold">Casting</div>
              <div className="cards__casting ">
                <SliderFilm>
                  {dataCredits.map((casting, i) => (
                    <div key={i}>
                      <CardCasting casting={casting} />
                    </div>
                  ))}
                </SliderFilm>
              </div>
            </section>
            {/* Trailer */}
            {dataVideos.length === 0 ? (
              <></>
            ) : (
              <section className="my-3">
                <div className="fs-3 fw-bold">Trailer</div>

                <div className="cards__video ">
                  <SliderVideos>
                    {dataVideos.map((video, i) => (
                      <div key={i}>
                        <iframe
                          className="m-4"
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title="video"
                          width="500px"
                          height="450px"
                        ></iframe>
                      </div>
                    ))}
                  </SliderVideos>
                </div>
              </section>
            )}

            {/* Rekomendasi */}
            <section className="my-3">
              <div className="fs-4 fw-bold mb-4">Rekomendasi</div>
              <div className="cards__recommendation ">
                <SliderFilm>
                  {dataRecommendations.map((recommendation, i) => (
                    <Link
                      to={`/detail/${recommendation.id}`}
                      key={i}
                      className="Link"
                    >
                      <CardFilm data={recommendation} />
                    </Link>
                  ))}
                </SliderFilm>
              </div>
            </section>
          </section>
        </>
      )}
    </>
  );
};

export default DetailMovie;
