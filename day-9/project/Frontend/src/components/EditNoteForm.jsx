import React, { useEffect, useState } from "react";

const EditNoteForm = ({ updateNote, noteDetails, cancleUpdateNote }) => {
  const [title, setTitle] = useState(noteDetails?.title || "");
  const [description, setDescription] = useState(noteDetails?.description || "");

  useEffect(() => {
    if (noteDetails?.id) {
      setTitle(noteDetails.title || "");
      setDescription(noteDetails.description || "");
    }
  }, [noteDetails]);

  return (
    <div className="pb-8">
      <h2 className="text-3xl mb-2">Update Note</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          updateNote(title, description);
        }}
        className="flex flex-col md:flex-row gap-4"
      >
        <input
          className="px-5 py-2 border-none backdrop-blur-2xl bg-black/30 text-white font-bold tracking-wider transition-all duration-200 outline-1 outline-transparent focus:outline-white/50 hover:outline-white/30 rounded-2xl flex-1 max-w-100"
          type="text"
          name="title"
          id="title"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          className="px-5 py-2 border-none backdrop-blur-2xl bg-black/30 text-white font-bold tracking-wider transition-all duration-200 outline-1 outline-transparent focus:outline-white/50 hover:outline-white/30 rounded-2xl flex-1 max-w-100"
          type="text"
          name="description"
          id="description"
          placeholder="Enter note description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <button
          className="w-fit px-5 py-2 border-none backdrop-blur-2xl bg-white/70 text-black font-bold tracking-wider transition-all duration-200 rounded-2xl active:scale-95 cursor-pointer hover:bg-white text-nowrap"
          type="submit"
        >
          Save
        </button>

        <button
          className="w-fit px-5 py-2 border-none backdrop-blur-2xl bg-white/70 text-black font-bold tracking-wider transition-all duration-200 rounded-2xl active:scale-95 cursor-pointer hover:bg-white text-nowrap"
          type="button"
          onClick={cancleUpdateNote}
        >
          Cancle
        </button>
      </form>
    </div>
  );
};

export default EditNoteForm;
