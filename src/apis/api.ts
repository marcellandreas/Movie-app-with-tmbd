import axios from 'axios'
import { toast } from 'react-toastify';


const BASE_URL = import.meta.env.VITE_BASE_URL

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
})



export const movieService = {
  async getPopularMovies(page?:number) {
    try {
      const resp = await AxiosInstance.get("/movie/popular", {
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
      const res = await AxiosInstance.get("/movie/now_playing", {
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
      const res = await AxiosInstance.get("/movie/upcoming", {
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
      const res = await AxiosInstance.get("/genre/movie/list", {
        params: { api_key: import.meta.env.VITE_TMBD_KEY },
      });
      return res.data.genres;
    } catch (err: any) {
      toast.error("Failed to load Genres");
      throw err;
    }
  },
};

