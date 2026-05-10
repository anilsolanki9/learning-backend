import axios from "axios";

const api = axios.create({
  baseUrl: "http://localhost:3000",
  withCredentials: true,
});

export const getFeed = () => {
  const response = api.get("/api/posts/feed");
  return response.data;
};
