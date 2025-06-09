import axios from "axios";

// There is no localhost in PROD prpduction so it should be dynamic
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";
//import.meta.env は Vite 独自の仕組み
const api = axios.create({ baseURL: BASE_URL });

export default api;
