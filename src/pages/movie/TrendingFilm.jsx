import { useEffect, useState } from "react";
import { AxiosIntance } from "../../apis/Api";
import { Link } from "react-router-dom";
import SliderFilm from "../../components/slider/SliderFilm";
import CardFilm from "../../components/card/CardFilm";

const TrendingFilm = () => {
  const typeTime = "day";
  const active = " button__handle2 activeTab";
  const menu = "button__handle2 ";

  const [activeTab, setActiveTab] = useState("movie");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(activeTab);
    AxiosIntance.get(`/trending/${activeTab}/${typeTime}`, {
      params: { api_key: process.env.REACT_APP_TMBD_KEY },
    }).then((res) => {
      console.log("Trending", res.data);
      setData(res.data.results);
      setLoading(false);
    });
  }, [activeTab, loading]);

  const switchTab = (setType) => {
    setActiveTab(setType);
    setLoading(true);
  };

  return (
    //  <>
    //    <button onClick={() => switchTab("movie")}>Movie</button>
    //    <button onClick={() => switchTab("tv")}>Tv</button>
    //    {data.map((data) => (
    //      <div>
    //        {data.media_type === "movie" ? (
    //          <p>{data.title}</p>
    //        ) : (
    //          <p>{data.name}</p>
    //        )}
    //      </div>
    //    ))}
    //  </>
    <section className="fs-3 fw-bold my-3">
      <div className="d-flex justify-content-between mb-2">
        <div className="font__color2 mb-3">Trending</div>
        <div className="d-flex gap-3">
          <div
            className={`${activeTab === "movie" ? active : menu}`}
            onClick={() => switchTab("movie")}
          >
            Movie
          </div>
          <div
            className={`${activeTab === "tv" ? active : menu}`}
            onClick={() => switchTab("tv")}
          >
            Tv
          </div>
        </div>
      </div>
      {loading ? (
        <p className="loading">Sedang Memuat Data...</p>
      ) : (
        <div className="cards">
          <SliderFilm>
            {data.map((data, i) => (
              <div key={i}>
                {data.media_type === "movie" ? (
                  <Link to={`detail/${data.id}`} key={i} className="Link">
                    <CardFilm data={data} />
                  </Link>
                ) : (
                  <Link to={`detail-tv/${data.id}`} key={i} className="Link">
                    <CardFilm data={data} />
                  </Link>
                )}
              </div>
            ))}
          </SliderFilm>
        </div>
      )}
    </section>
  );
};

export default TrendingFilm;
