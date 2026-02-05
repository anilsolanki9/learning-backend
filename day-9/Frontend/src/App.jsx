import { useEffect, useState } from 'react';
// axios install kr lo,
// React me api call krne ke liye axios use krte hai....
// Server(Backend) me CORS enabled hona chahiye, it is must todo
// $npm i axios
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // console.log('Hello'); // debugg purpose

  function fetchNotes() {
    // Sare notes ko laane ke liye
    // Ye request krenge tab CORS error ayega, isko mitigate krne ke liye-> backend me cors package install krke, app.js me cors require krke, is middelware ko use kr lo, app.use(cors()); jis se server CORS requests accept and respond kr paega
    axios.get('http://localhost:3000/api/notes').then((res) => {
      // console.log(res.data.notes);
      // database se notes ka data aa jane pe notes statevariable me value de di jaegi
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

    // Form submit pe ye POST api request call hogi, and ek note save ho jaega.
    axios
      .post('http://localhost:3000/api/notes', {
        title,
        description,
      })
      .then((res) => {
        console.log(res.data.note); // for debug purpose only
        // form submit hone pe data post ho jane ke bad, fetch chalaenge taki latest all notes ka data fetch ho jaye. and then useState ki vajah se react use hr jagah change kr dega
        fetchNotes();
      });

    // clear the fields
    setTitle('');
    setDescription('');
  };

  return (
    <main className="p-5">
      <form
        className="bg-zinc-500 w-fit px-5 py-2 mb-5 rounded-lg flex gap-4 items-end"
        onSubmit={submitHandller}
      >
        <div>
          <div className="formField flex flex-col">
            <label htmlFor="title" className="text-sm">
              Title
            </label>
            <input
              name="title"
              placeholder="Enter title"
              type="text"
              id="title"
              className="bg-zinc-600 border-white/50 border rounded-md outline-none px-3 py-1 focus:border-blue-400 transition-all duration-200 focus:scale-105 focus:shadow-md mt-1"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="formField flex flex-col mt-2">
            <label htmlFor="title" className="text-sm">
              Description
            </label>
            <input
              name="description"
              placeholder="Enter Description"
              type="text"
              id="title"
              className="bg-zinc-600 border-white/50 border rounded-md outline-none px-3 py-1 focus:border-blue-400 transition-all duration-200 focus:scale-105 focus:shadow-md mt-1"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <button
          className="flex justify-center bg-white/50 font-bold text-zinc-600 px-5 py-1 rounded-lg active:scale-95 transition-all duration-200 cursor-pointer hover:scale-105"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="notes flex gap-3 flex-wrap">
        {/* notes database se aa jaenge tb tb ye reload hota rhega, and notes display ho jaenge */}
        {notes.map((note, idx) => {
          return (
            <div
              key={idx}
              className="note bg-zinc-500 w-100 px-5 py-3 rounded-md shadow-lg shadow-black/60"
            >
              <h2 className="title text-2xl font-bold">{note.title}</h2>
              <p className="description bg-blue-100 text-black/80 px-3 py-1 mt-2 rounded-md font-semibold">
                {note.description}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
