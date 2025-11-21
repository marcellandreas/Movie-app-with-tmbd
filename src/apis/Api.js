import axios from "axios";

// API TMBD
export const AxiosIntance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});
