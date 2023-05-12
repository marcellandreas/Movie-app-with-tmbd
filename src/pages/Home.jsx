import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import ComingSoon from "./movie/ComingSoon";
import NowPlaying from "./movie/NowPlaying";
import Popular from "./movie/Popular";
import TrendingFilm from "./movie/TrendingFilm";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="home__container container my-5">
        <TrendingFilm />
        <Popular />
        <NowPlaying />
        <ComingSoon />
      </div>
      <Footer />
    </>
  );
};

export default Home;
