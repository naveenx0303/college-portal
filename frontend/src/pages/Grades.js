// import React from 'react';

// function Grades() {
//   const grades = [
//     { id: 1, course: 'Mathematics', grade: 'A' },
//     { id: 2, course: 'Physics', grade: 'B+' },
//   ];

//   return (
//     <div>
//       <h2>Grades</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Course</th>
//             <th>Grade</th>
//           </tr>
//         </thead>
//         <tbody>
//           {grades.map(g => (
//             <tr key={g.id}>
//               <td>{g.id}</td>
//               <td>{g.course}</td>
//               <td>{g.grade}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Grades;
import React, { useEffect, useState } from 'react';
import { getGrades } from '../services/gradeService';

function Grades() {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const data = await getGrades();
      setGrades(data);
    } catch (err) {
      setError('Failed to fetch grades');
    }
  };

  return (
    <div>
      <h2>Grades</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades.map(g => (
            <tr key={g._id || g.id}>
              <td>{g._id || g.id}</td>
              <td>{g.course}</td>
              <td>{g.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Grades;