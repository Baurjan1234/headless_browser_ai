import axios from "axios";
const baseUrl = "http://localhost:3001/v1/";

const _axios = axios.create({
  baseURL: baseUrl,
});

export { _axios };
