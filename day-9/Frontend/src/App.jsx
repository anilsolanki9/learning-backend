import { useEffect, useState } from "react";
// axios install kr lo,
// React me api call krne ke liye axios use krte hai....
// Server(Backend) me CORS enabled hona chahiye, it is must todo
// $npm i axios
import axios from "axios";

function App() {
  /**
   * notesis an array of object
   * each object format => {title, description}
   */
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  /**
   * Sare notes ko laane ke liye function
   * Bina server me CORS enable kiye agar, client side se request bhejoge toh cors error ayega.
   * To solve the error, in backend, install cors package, require it in app.js, use as middleware
   * app.use(cors());
   */
  function fetchNotes() {
    axios.get("https://learning-backend-lvt0.onrender.com/api/notes").then((res) => {
      // data aa jane pe, notes me set ho jaega.
      setNotes(res.data.notes);
    });
  }

  // By default ek bar fetchNotes call ho jaega, jab page load hoga tab
  useEffect(() => {
    fetchNotes();
  }, []);

  // Form submit hone pe kya hoga
  const submitHandller = (e) => {
    // prevent page reload
    e.preventDefault();

    const { title, description } = e.target.elements;

    if (!editMode) {
      // Form submit pe ye POST api request call hogi, and ek new note save ho jaega.
      axios
        .post("https://learning-backend-lvt0.onrender.com/api/notes", {
          title: title.value,
          description: description.value,
        })
        .then(() => {
          // form submit hone pe data post ho jane ke bad, fetch chalaenge taki latest all notes ka data fetch ho jaye.
          fetchNotes();
          e.target.reset();
        });
    } else {
      axios
        .patch(`https://learning-backend-lvt0.onrender.com/api/notes/${currentId}`, {
          title: title.value,
          description: description.value,
        })
        .then((res) => {
          console.log(res.data);
          fetchNotes();
          e.target.reset();
          setEditMode(false);
          setCurrentId(null);
        });
    }
  };

  // Note pe delete btn click krne pe
  function deleteHandler(id) {
    axios
      .delete(`https://learning-backend-lvt0.onrender.com/api/notes/${id}`)
      .then((res) => {
        console.log(res.data.message);
        fetchNotes();
      });
  }

  // Homework Patch (modify note) vala code likho

  return (
    <main>
      <form onSubmit={submitHandller}>
        <div className="fields-container">
          <div className="formField">
            <label htmlFor="title">Title</label>
            <input required="true" name="title" placeholder="Enter title" type="text" />
          </div>
          <div className="formField">
            <label htmlFor="title">Description</label>
            <input
              required="true"
              name="description"
              placeholder="Enter Description"
              type="text"
            />
          </div>
        </div>
        <button type="submit">{editMode ? "Update Note" : "Create Note"}</button>
      </form>
      <div className="notes">
        {/* notes database se aa jaenge tb tb ye reload hota rhega, and notes display ho jaenge */}
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h2 className="title">{note.title}</h2>
              <p className="description">{note.description}</p>
              <div className="btns">
                <button
                  onClick={() => {
                    setEditMode(true);
                    setCurrentId(note._id);
                  }}
                  className="btn edit">
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteHandler(note._id);
                  }}
                  className="btn delete">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
