// import React from 'react';

// function Courses() {
//   const courses = [
//     { id: 1, name: 'Mathematics', instructor: 'Dr. Smith' },
//     { id: 2, name: 'Physics', instructor: 'Dr. Johnson' },
//   ];

//   return (
//     <div>
//       <h2>Courses</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Instructor</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.map(course => (
//             <tr key={course.id}>
//               <td>{course.id}</td>
//               <td>{course.name}</td>
//               <td>{course.instructor}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Courses;
import React, { useEffect, useState } from 'react';
import { getCourses, createCourse, deleteCourse } from '../services/courseService';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ name: '', instructor: '' });
  const [error, setError] = useState('');

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      setError('Failed to fetch courses');
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await createCourse(form);
      setForm({ name: '', instructor: '' });
      fetchCourses();
    } catch (err) {
      setError('Failed to add course');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (err) {
      setError('Failed to delete course');
    }
  };

  return (
    <div>
      <h2>Courses</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-2">
          <input name="name" className="form-control" placeholder="Course Name"
            value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <input name="instructor" className="form-control" placeholder="Instructor"
            value={form.instructor} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit">Add Course</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Instructor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id || course.id}>
              <td>{course._id || course.id}</td>
              <td>{course.name}</td>
              <td>{course.instructor}</td>
              <td>
                <button className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(course._id || course.id)}>
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

export default Courses;