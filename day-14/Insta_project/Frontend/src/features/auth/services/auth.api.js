import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true, // allows the frontend to send cookies along with the request
});

export async function register(username, email, password) {
  const response = await api.post("/register", { username, email, password });
  return response;
}

export async function login(username, password) {
  // withCredentials: true allows the frontend to send cookies along with the request
  const response = await api.post("/login", { username, password });
  return response;
}

export async function getMe() {
  const response = await api.get("/get-me");
  return response;
}
