import axios from 'axios'
import { toast } from 'react-toastify';


const BASE_URL = import.meta.env.VITE_BASE_URL
const BASE_URL_V4 = import.meta.env.VITE_BASE_URL_V4 || "https://api.themoviedb.org/4"

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
})
export const AxiosInstanceV4 = axios.create({
  baseURL: BASE_URL_V4,
  timeout: 5000,
})


export const movieService = {
  async getPopularMovies(page?:number) {
    try {
      const resp = await AxiosInstanceV4.get("/movie/popular", {
        params: {
          page,
          api_key: import.meta.env.VITE_TMBD_KEY,
        },
      });
      return resp.data;
    } catch (err: any) {
      toast.error(
        "Failed to load popular movies",
      );
      throw err;
    }
  },
  async getNowPlaying() {
    try {
      const res = await AxiosInstanceV4.get("/movie/now_playing", {
        params: { api_key: import.meta.env.VITE_TMBD_KEY },
      });
      return res.data.results;
    } catch (err: any) {
      toast.error("Failed to load Now Playing");
      throw err;
    }
  },

  async getUpcoming() {
    try {
      const res = await AxiosInstanceV4.get("/movie/upcoming", {
        params: { api_key: import.meta.env.VITE_TMBD_KEY },
      });
      return res.data.results;
    } catch (err: any) {
      toast.error("Failed to load Upcoming Movies");
      throw err;
    }
  },

  async getGenres() {
    try {
      const res = await AxiosInstanceV4.get("/genre/movie/list", {
        params: { api_key: import.meta.env.VITE_TMBD_KEY },
      });
      return res.data.genres;
    } catch (err: any) {
      toast.error("Failed to load Genres");
      throw err;
    }
  },
};

