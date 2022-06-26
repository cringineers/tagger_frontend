import axios from "axios";

const axiosRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default axiosRequest;
