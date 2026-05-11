import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getFeed = async () => {
  const response = await api.get("/api/posts/feed");
  return response.data;
};

export async function createPost(imageFile, caption) {
  // To send formdata with file, we have to do this.
  const formData = new FormData();
  formData.append("imgUrl", imageFile);
  formData.append("caption", caption);

  const response = await api.post("/api/posts", formData);
  return response.data;
}

// Like post
export async function likePost(postId) {
  const response = await api.post(`/api/posts/${postId}/like`);
  return response.data;
}

// Unlike post
export async function dislikePost(postId) {
  const response = await api.delete(`/api/posts/${postId}/like`);
  return response.data;
}
