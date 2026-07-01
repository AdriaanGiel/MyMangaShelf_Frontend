import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api`,
  timeout: 10000,
  headers: { "Accept": "application/json"},
});

 