import Navbar from "../navigations/header/Navbar";
import "./style.scss";


const Hero = () => {
  return (
    <div className="hero__container position-relative" >
      <Navbar />
      <div className="opacity-layer"></div>
      <section className="container"></section>
    </div>
  );
};

export default Hero;
