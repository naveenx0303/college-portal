// import React, { useState } from 'react';

// function Notes() {
//   const [notes, setNotes] = useState([
//     { id: 1, title: 'Lecture 1', file: 'lecture1.pdf' },
//     { id: 2, title: 'Lecture 2', file: 'lecture2.pdf' },
//   ]);
//   const [form, setForm] = useState({ title: '', file: '' });

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     setNotes([
//       ...notes,
//       { id: notes.length + 1, ...form }
//     ]);
//     setForm({ title: '', file: '' });
//   };

//   return (
//     <div>
//       <h2>Notes</h2>
//       <form className="mb-4" onSubmit={handleSubmit}>
//         <div className="mb-2">
//           <input name="title" className="form-control" placeholder="Title"
//             value={form.title} onChange={handleChange} required />
//         </div>
//         <div className="mb-2">
//           <input name="file" className="form-control" placeholder="File Name"
//             value={form.file} onChange={handleChange} required />
//         </div>
//         <button className="btn btn-primary" type="submit">Add Note</button>
//       </form>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>File</th>
//           </tr>
//         </thead>
//         <tbody>
//           {notes.map(note => (
//             <tr key={note.id}>
//               <td>{note.id}</td>
//               <td>{note.title}</td>
//               <td>{note.file}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Notes;
import React, { useEffect, useState } from 'react';
import {
  getNotes,
  createNote,
  deleteNote
} from '../services/noteService';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', file: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError('Failed to fetch notes');
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await createNote(form);
      setForm({ title: '', file: '' });
      fetchNotes();
    } catch (err) {
      setError('Failed to add note');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            name="title"
            className="form-control"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            name="file"
            className="form-control"
            placeholder="File Name"
            value={form.file}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add Note
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr key={note._id || note.id}>
              <td>{note._id || note.id}</td>
              <td>{note.title}</td>
              <td>{note.file}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(note._id || note.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Notes;