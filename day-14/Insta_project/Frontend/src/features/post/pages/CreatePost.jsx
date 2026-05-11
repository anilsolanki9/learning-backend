import { useRef, useState } from "react";
import "../styles/createPost.scss";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef(null);

  const { loading, handleCreatePost } = usePost();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const file = postImageInputFieldRef.current.files[0];

    await handleCreatePost(file, caption);
    navigate("/");
  }

  if (loading) {
    return (
      <main>
        <h3>creating post...</h3>
      </main>
    );
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label className="post-image-label" htmlFor="postImage">
            Select Image
          </label>
          <input ref={postImageInputFieldRef} hidden type="file" name="imgUrl" id="postImage" required />
          <input
            onInput={(e) => {
              setCaption(e.target.value);
            }}
            value={caption}
            type="text"
            name="caption"
            id="caption"
            minLength="1"
            maxLength="50"
            placeholder="Enter Caption"
          />
          <button className="button primary-button">Create Post</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
