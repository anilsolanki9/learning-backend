import { useEffect } from "react";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import "../styles/feed.scss";

const Feed = () => {
  const { loading, feed, handleGetFeed } = usePost();

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
      <div className="feed">
        <div className="posts">
          {feed.map((post) => {
            return <Post key={post._id} post={post} user={post.user} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
