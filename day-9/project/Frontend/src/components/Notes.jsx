import React from "react";
import Note from "./Note";

const Notes = ({ notes, setNoteId, deleteNote, noteId }) => {
  return (
    <div>
      <h2 className="text-3xl pb-3">Notes</h2>
      <div className="notes grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {notes.map((note) => {
          return (
            <Note
              noteId={noteId}
              uid={note._id}
              key={note._id}
              note={note}
              setNoteId={setNoteId}
              deleteNote={deleteNote}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
