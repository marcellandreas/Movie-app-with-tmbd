import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MorePopular from "../pages/moreMovie/MorePopular";
import DetailTv from "../pages/movie/DetailTv";
import DetailMovie from "../pages/movie/DetailMovie";

const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<MorePopular />} />
          <Route path="/detail/:id" element={<DetailMovie />} />
          <Route path="/detail-tv/:id" element={<DetailTv />} />
          <Route path="/recommendation/:id" element={<DetailMovie />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
