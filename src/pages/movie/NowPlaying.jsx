import { useSelector } from "react-redux";
import SliderFilm from "../../components/slider/SliderFilm";
import { Link } from "react-router-dom";
import CardFilm from "../../components/card/CardFilm";

const NowPlaying = () => {
  const dataFilm = useSelector((state) => state.dataFilm.dataFilmNowPlaying);

  return (
    <section className="fs-3 fw-bold my-3">
      <div className="d-flex justify-content-between mb-2">
        <div className="font__color2 mb-3">Now Playing</div>
      </div>
      <div className="cards">
        <SliderFilm>
          {dataFilm.map((data, i) => (
            <Link to={`detail/${data.id}`} key={i} className="Link">
              <CardFilm data={data} />
            </Link>
          ))}
        </SliderFilm>
      </div>
    </section>
  );
};

export default NowPlaying;
