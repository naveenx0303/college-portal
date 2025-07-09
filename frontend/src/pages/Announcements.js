// import React, { useState } from 'react';

// function Announcements() {
//   const [announcements, setAnnouncements] = useState([
//     { id: 1, title: 'Holiday Notice', content: 'No classes on Friday.' },
//     { id: 2, title: 'Exam Schedule', content: 'Exams start next Monday.' },
//   ]);
//   const [form, setForm] = useState({ title: '', content: '' });

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     setAnnouncements([
//       ...announcements,
//       { id: announcements.length + 1, ...form }
//     ]);
//     setForm({ title: '', content: '' });
//   };

//   return (
//     <div>
//       <h2>Announcements</h2>
//       <form className="mb-4" onSubmit={handleSubmit}>
//         <div className="mb-2">
//           <input name="title" className="form-control" placeholder="Title"
//             value={form.title} onChange={handleChange} required />
//         </div>
//         <div className="mb-2">
//           <input name="content" className="form-control" placeholder="Content"
//             value={form.content} onChange={handleChange} required />
//         </div>
//         <button className="btn btn-primary" type="submit">Add Announcement</button>
//       </form>
//       <ul className="list-group">
//         {announcements.map(a => (
//           <li key={a.id} className="list-group-item">
//             <strong>{a.title}:</strong> {a.content}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Announcements;
import React, { useEffect, useState } from 'react';
import { getAnnouncements, createAnnouncement, deleteAnnouncement } from '../services/announcementService';

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      setError('Failed to fetch announcements');
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await createAnnouncement(form);
      setForm({ title: '', content: '' });
      fetchAnnouncements();
    } catch (err) {
      setError('Failed to add announcement');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      fetchAnnouncements();
    } catch (err) {
      setError('Failed to delete announcement');
    }
  };

  return (
    <div>
      <h2>Announcements</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-2">
          <input name="title" className="form-control" placeholder="Title"
            value={form.title} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <input name="content" className="form-control" placeholder="Content"
            value={form.content} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit">Add Announcement</button>
      </form>
      <ul className="list-group">
        {announcements.map(a => (
          <li key={a._id || a.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <strong>{a.title}:</strong> {a.content}
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a._id || a.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Announcements;