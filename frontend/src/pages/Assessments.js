// import React, { useState } from 'react';

// function Assessments() {
//   const [assessments, setAssessments] = useState([
//     { id: 1, name: 'Quiz 1', date: '2024-06-01' },
//     { id: 2, name: 'Midterm', date: '2024-06-10' },
//   ]);
//   const [form, setForm] = useState({ name: '', date: '' });

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     setAssessments([
//       ...assessments,
//       { id: assessments.length + 1, ...form }
//     ]);
//     setForm({ name: '', date: '' });
//   };

//   return (
//     <div>
//       <h2>Assessments</h2>
//       <form className="mb-4" onSubmit={handleSubmit}>
//         <div className="mb-2">
//           <input name="name" className="form-control" placeholder="Assessment Name"
//             value={form.name} onChange={handleChange} required />
//         </div>
//         <div className="mb-2">
//           <input name="date" type="date" className="form-control"
//             value={form.date} onChange={handleChange} required />
//         </div>
//         <button className="btn btn-primary" type="submit">Add Assessment</button>
//       </form>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {assessments.map(a => (
//             <tr key={a.id}>
//               <td>{a.id}</td>
//               <td>{a.name}</td>
//               <td>{a.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Assessments;
import React, { useEffect, useState } from 'react';
import {
  getAssessments,
  createAssessment,
  deleteAssessment
} from '../services/assessmentService';

function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [form, setForm] = useState({ name: '', date: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const data = await getAssessments();
      setAssessments(data);
    } catch (err) {
      setError('Failed to fetch assessments');
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await createAssessment(form);
      setForm({ name: '', date: '' });
      fetchAssessments();
    } catch (err) {
      setError('Failed to add assessment');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAssessment(id);
      fetchAssessments();
    } catch (err) {
      setError('Failed to delete assessment');
    }
  };

  return (
    <div>
      <h2>Assessments</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            name="name"
            className="form-control"
            placeholder="Assessment Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            name="date"
            type="date"
            className="form-control"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add Assessment
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map(a => (
            <tr key={a._id || a.id}>
              <td>{a._id || a.id}</td>
              <td>{a.name}</td>
              <td>{a.date}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(a._id || a.id)}
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

export default Assessments;