import { useSelector } from "react-redux";
import SliderFilm from "../../components/slider/SliderFilm";
import CardFilm from "../../components/card/CardFilm";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  const dataFilm = useSelector((state) => state.dataFilm.dataFilmComingSoon);

  return (
    <section className="fs-3 fw-bold my-3">
      <div className="font__color2 mb-3">Coming Soon</div>
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

export default ComingSoon;
