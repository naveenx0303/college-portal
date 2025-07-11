// import React from 'react';

// function Dashboard() {
//   return (
//     <div>
//       <h2>Welcome to the College Portal Dashboard</h2>
//       <p>Select a section from the navigation bar to get started.</p>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [grades, setGrades] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // const token = localStorage.getItem('token');
   // Adjust based on your auth method

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Get logged-in user
  //       const resUser = await axios.get('/api/auth/me', {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });
  //       setUser(resUser.data);

  //       // Depending on role, fetch relevant data
  //       if (resUser.data.role === 'student') {
  //         const resCourses = await axios.get(`/api/courses/student/${resUser.data._id}`);
  //         setCourses(resCourses.data);

  //         const resGrades = await axios.get(`/api/grades/student/${resUser.data._id}`);
  //         setGrades(resGrades.data);

  //       } else if (resUser.data.role === 'teacher') {
  //         const resCourses = await axios.get(`/api/courses/teacher/${resUser.data._id}`);
  //         setCourses(resCourses.data);

  //         const resGrades = await axios.get(`/api/grades/teacher/${resUser.data._id}`);
  //         setGrades(resGrades.data);

  //         const resAssessments = await axios.get(`/api/assessments/teacher/${resUser.data._id}`);
  //         setAssessments(resAssessments.data);
  //       }

  //       const allCourseIds = courses.map(c => c._id).join(',');
  //       const resNotes = await axios.get(`/api/notes/courses?ids=${allCourseIds}`);
  //       const resAnnouncements = await axios.get(`/api/announcements/courses?ids=${allCourseIds}`);
  //       setNotes(resNotes.data);
  //       setAnnouncements(resAnnouncements.data);

  //     } catch (error) {
  //       console.error('Dashboard load error:', error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.warn('No token found');
//         return;
//       }

//       // ✅ Get logged-in user
//       const resUser = await axios.get('/api/auth/me', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const userData = resUser.data;
//       setUser(userData);

//       let fetchedCourses = [];
//       let fetchedGrades = [];
//       let fetchedAssessments = [];

//       // ✅ Fetch based on role
//       if (userData.role === 'student') {
//         const resCourses = await axios.get(`/api/courses/student/${userData._id}`);
//         fetchedCourses = resCourses.data;
//         setCourses(fetchedCourses);

//         const resGrades = await axios.get(`/api/grades/student/${userData._id}`);
//         fetchedGrades = resGrades.data;
//         setGrades(fetchedGrades);
//       } else if (userData.role === 'teacher') {
//         const resCourses = await axios.get(`/api/courses/teacher/${userData._id}`);
//         fetchedCourses = resCourses.data;
//         setCourses(fetchedCourses);

//         const resGrades = await axios.get(`/api/grades/teacher/${userData._id}`);
//         fetchedGrades = resGrades.data;
//         setGrades(fetchedGrades);

//         const resAssessments = await axios.get(`/api/assessments/teacher/${userData._id}`);
//         fetchedAssessments = resAssessments.data;
//         setAssessments(fetchedAssessments);
//       }

//       // ✅ Only fetch notes & announcements after courses are fetched
//       const allCourseIds = fetchedCourses.map(c => c._id).join(',');
//       if (allCourseIds) {
//         const resNotes = await axios.get(`/api/notes/courses?ids=${allCourseIds}`);
//         setNotes(resNotes.data);

//         const resAnnouncements = await axios.get(`/api/announcements/courses?ids=${allCourseIds}`);
//         setAnnouncements(resAnnouncements.data);
//       }
//     } catch (error) {
//       console.error('Dashboard load error:', error.message);
//     }
//   };

//   fetchData();
// }, []);


//   //  const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) return;

//       try {
//         const res = await axios.get('http://localhost:5001/api/auth/me', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUser(res.data); // or res.data.user depending on your API
//       } 
//       // catch (err) {
//       //   console.error('Failed to fetch user:', err);
//       // }
//       catch (error) {
//   console.error('Dashboard load error:', error.message);
//   if (error.response) {
//     console.error('Failed URL:', error.response.config.url);
//     console.error('Status:', error.response.status);
//     console.error('Response data:', error.response.data);
//   }
// }
//     };

//     fetchUser();
//   }, []);

//   if (!user) return <p>Loading dashboard...</p>;

//   return (
//     <div>
//       <h2>Welcome, {user.name} ({user.role})</h2>

//       <h3>Your Courses</h3>
//       <ul>
//         {courses.map(course => (
//           <li key={course._id}>{course.course_code} - {course.course_name}</li>
//         ))}
//       </ul>

//       <h3>Notes</h3>
//       <ul>
//         {notes.map(note => (
//           <li key={note._id}>{note.title} ({note.file_type})</li>
//         ))}
//       </ul>

//       <h3>Grades</h3>
//       <ul>
//         {grades.map(grade => (
//           <li key={grade._id}>
//             {grade.course_id.course_code}: {grade.marks_obtained}/{grade.total_marks} ({grade.grade_letter})
//           </li>
//         ))}
//       </ul>

//       {user.role === 'teacher' && (
//         <>
//           <h3>Assessments</h3>
//           <ul>
//             {assessments.map(a => (
//               <li key={a._id}>{a.title} - {a.assessment_type}</li>
//             ))}
//           </ul>
//         </>
//       )}

//       <h3>Announcements</h3>
//       <ul>
//         {announcements.map(a => (
//           <li key={a._id}>{a.title} - {a.priority}</li>
//         ))}
//       </ul>
//     </div>
//   );












// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [courses, setCourses] = useState([]);
//   const [notes, setNotes] = useState([]);
//   const [grades, setGrades] = useState([]);
//   const [assessments, setAssessments] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const token = localStorage.getItem('token');
      // if (!token) {
      //   console.warn('No token found');
      //   return;
      // }


      const token = localStorage.getItem('token');
console.log('Token:', token);
if (!token) {
  console.warn('No token found in localStorage');
  return;
}



      try {
        // ✅ Fetch user
        const resUser = await axios.get('http://localhost:5001/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userData = resUser.data.data;
        setUser(userData);

        let fetchedCourses = [];
        let fetchedGrades = [];
        let fetchedAssessments = [];

        // ✅ Fetch courses and grades based on role
        if (userData.role === 'student') {
          const resCourses = await axios.get(`http://localhost:5001/api/courses/student/${userData._id}`);
          fetchedCourses = resCourses.data;
          setCourses(fetchedCourses);

          const resGrades = await axios.get(`http://localhost:5001/api/grades/student/${userData._id}`);
          fetchedGrades = resGrades.data;
          setGrades(fetchedGrades);
        } else if (userData.role === 'teacher') {
          const resCourses = await axios.get(`http://localhost:5001/api/courses/teacher/${userData._id}`);
          fetchedCourses = resCourses.data;
          setCourses(fetchedCourses);

          const resGrades = await axios.get(`http://localhost:5001/api/grades/teacher/${userData._id}`);
          fetchedGrades = resGrades.data;
          setGrades(fetchedGrades);

          const resAssessments = await axios.get(`http://localhost:5001/api/assessments/teacher/${userData._id}`);
          fetchedAssessments = resAssessments.data;
          setAssessments(fetchedAssessments);
        }

        // ✅ Fetch notes and announcements only after courses are ready
        const allCourseIds = fetchedCourses.map(c => c._id).join(',');
        if (allCourseIds) {
          const resNotes = await axios.get(`http://localhost:5001/api/notes/courses?ids=${allCourseIds}`);
          setNotes(resNotes.data);

          const resAnnouncements = await axios.get(`http://localhost:5001/api/announcements/courses?ids=${allCourseIds}`);
          setAnnouncements(resAnnouncements.data);
        }

      } catch (error) {
        console.error('Dashboard load error:', error.message);
        if (error.response) {
          console.error('Failed URL:', error.response.config.url);
          console.error('Status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      }

         ////////////////////////////////////////////////

        console.log('User:', user);
    };

    fetchData();
  }, []);

  // Loading check
  if (!user) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h2>Welcome, {user.first_name} ({user.role})</h2>

      <h3>Your Courses</h3>
      <ul>
        {courses.length ? courses.map(course => (
          <li key={course._id}>{course.course_code} - {course.course_name}</li>
        )) : <li>No courses found.</li>}
      </ul>

      <h3>Notes</h3>
      <ul>
        {notes.length ? notes.map(note => (
          <li key={note._id}>{note.title} ({note.file_type})</li>
        )) : <li>No notes available.</li>}
      </ul>

      <h3>Grades</h3>
      <ul>
        {grades.length ? grades.map(grade => (
          <li key={grade._id}>
            {grade.course_id?.course_code}: {grade.marks_obtained}/{grade.total_marks} ({grade.grade_letter})
          </li>
        )) : <li>No grades available.</li>}
      </ul>

      {user.role === 'teacher' && (
        <>
          <h3>Assessments</h3>
          <ul>
            {assessments.length ? assessments.map(a => (
              <li key={a._id}>{a.title} - {a.assessment_type}</li>
            )) : <li>No assessments created.</li>}
          </ul>
        </>
      )}

      <h3>Announcements</h3>
      <ul>
        {announcements.length ? announcements.map(a => (
          <li key={a._id}>{a.title} - {a.priority}</li>
        )) : <li>No announcements yet.</li>}
      </ul>
    </div>
  );
}





export default Dashboard;
