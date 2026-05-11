import { useEffect } from "react";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import "../styles/feed.scss";
import Nav from "../../shared/components/Nav";

const Feed = () => {
  const { loading, feed, handleGetFeed, handleLikePost, handleDislikePost } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h3>Feed is Loading...</h3>
      </main>
    );
  }

  return (
    <main className="feed-page">
      <Nav />

      <div className="feed">
        <div className="posts">
          {feed.map((post) => {
            return <Post key={post._id} post={post} user={post.user} loading={loading} handleLikePost={handleLikePost} handleDislikePost={handleDislikePost} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
