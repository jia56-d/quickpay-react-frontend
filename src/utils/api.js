import axios from "axios";

const api = axios.create({
  baseURL: "https://quickpay-server-1.onrender.com/", 
  headers: { "Content-Type": "application/json" },
});

export default api;
