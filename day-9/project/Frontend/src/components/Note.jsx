import React from "react";

const Note = ({ note, uid, setNoteId, deleteNote, noteId }) => {
  const { title, description } = note;

  return (
    <div className={`note w-full bg-black/60 px-4 py-3 rounded-2xl relative ${noteId == uid ? "ring-1 ring-emerald-400" : ""}`}>
      <h2 className="text-2xl font-bold tracking-wider capitalize">{title}</h2>
      <p className="opacity-60">{description}</p>
      <div className="btns absolute top-1/2 -translate-y-1/2 right-5 flex flex-col gap-1 text-xs">
        <button
          className="bg-white/40 px-4 py-1 rounded-2xl font-bold cursor-pointer active:scale-95 select-none"
          onClick={() => {
            setNoteId((prev) => {
              if (prev === uid) return null;
              else return prev;
            });

            deleteNote(uid);
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            setNoteId(uid);
          }}
          className="bg-white/40 px-4 py-1 rounded-2xl font-bold cursor-pointer active:scale-95 select-none"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Note;
