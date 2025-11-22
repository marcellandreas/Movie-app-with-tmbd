import Hero from "../../components/hero/Hero"
import Footer from "../../components/navigations/footer/Footer"
import MainLayout from "../../layout/MainLayout"
import ComingSoon from "../movie/ComingSoon"
import NowPlaying from "../movie/NowPlaying"
import Popular from "../movie/Popular"
import TrendingFilm from "../movie/TrendingFilm"

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Hero />
      <div className="home__container container my-5">
        <TrendingFilm />
        <Popular />
        <NowPlaying />
        <ComingSoon />
      </div>
      <Footer />
    </MainLayout>
  )
}

export default Home