import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import Notes from "./components/Notes";
import axios from "axios";
import EditNoteForm from "./components/EditNoteForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState(null);
  const [noteDetails, setNoteDetails] = useState({});

  const fetchNotes = async () => {
    const response = await axios.get("http://localhost:3000/api/notes");
    setNotes(response.data.notes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async (title, description) => {
    await axios.post("http://localhost:3000/api/notes", {
      title,
      description,
    });

    await fetchNotes();
  };

  const updateNote = async (title, description) => {
    await axios.patch(`http://localhost:3000/api/notes/${noteId}`, {
      title,
      description,
    });

    await fetchNotes();
    setNoteId(null);
    setNoteDetails({});
  };

  const deleteNote = async (id) => {
    let res = confirm("Do you really wants to delete this note?");
    console.log(res);
    if (res) {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      await fetchNotes();
    } else {
      alert("Note not deleted");
    }
  };

  const cancleUpdateNote = () => {
    setNoteId(null);
    setNoteDetails({});
  };

  useEffect(() => {
    if (noteId) {
      const note = notes.find((elem) => elem._id == noteId);

      setNoteDetails({
        title: note.title,
        description: note.description,
        id: note._id,
      });
    }
  }, [noteId, notes]);

  return (
    <div className="bg-slate-900 min-h-screen text-white w-full">
      <div className="w-8/10 max-w-300 mx-auto py-5 flex flex-col">
        {noteId ? (
          <EditNoteForm
            cancleUpdateNote={cancleUpdateNote}
            noteDetails={noteDetails}
            updateNote={updateNote}
          />
        ) : (
          <Form createNote={createNote} />
        )}

        <Notes
          setNoteId={setNoteId}
          notes={notes}
          deleteNote={deleteNote}
          noteId={noteId}
        />
      </div>
    </div>
  );
};

export default App;
