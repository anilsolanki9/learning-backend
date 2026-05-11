import { useContext, useEffect } from "react";
import { getFeed, createPost, likePost, dislikePost } from "../services/post.api";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  const handleCreatePost = async (imageFile, caption) => {
    setLoading(true);
    const data = await createPost(imageFile, caption);
    setFeed((prev) => [data.post, ...prev]);
    setLoading(false);
  };

  const handleLikePost = async (postId) => {
    const data = await likePost(postId);
    handleGetFeed();
  };

  const handleDislikePost = async (postId) => {
    const data = await dislikePost(postId);
    handleGetFeed();
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  return { loading, feed, post, handleGetFeed, handleCreatePost, handleLikePost, handleDislikePost };
};
