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

  const token = localStorage.getItem('token'); // Adjust based on your auth method

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get logged-in user
        const resUser = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(resUser.data);

        // Depending on role, fetch relevant data
        if (resUser.data.role === 'student') {
          const resCourses = await axios.get(`/api/courses/student/${resUser.data._id}`);
          setCourses(resCourses.data);

          const resGrades = await axios.get(`/api/grades/student/${resUser.data._id}`);
          setGrades(resGrades.data);

        } else if (resUser.data.role === 'teacher') {
          const resCourses = await axios.get(`/api/courses/teacher/${resUser.data._id}`);
          setCourses(resCourses.data);

          const resGrades = await axios.get(`/api/grades/teacher/${resUser.data._id}`);
          setGrades(resGrades.data);

          const resAssessments = await axios.get(`/api/assessments/teacher/${resUser.data._id}`);
          setAssessments(resAssessments.data);
        }

        const allCourseIds = courses.map(c => c._id).join(',');
        const resNotes = await axios.get(`/api/notes/courses?ids=${allCourseIds}`);
        const resAnnouncements = await axios.get(`/api/announcements/courses?ids=${allCourseIds}`);
        setNotes(resNotes.data);
        setAnnouncements(resAnnouncements.data);

      } catch (error) {
        console.error('Dashboard load error:', error.message);
      }
    };

    fetchData();
  }, []);

  if (!user) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h2>Welcome, {user.name} ({user.role})</h2>

      <h3>Your Courses</h3>
      <ul>
        {courses.map(course => (
          <li key={course._id}>{course.course_code} - {course.course_name}</li>
        ))}
      </ul>

      <h3>Notes</h3>
      <ul>
        {notes.map(note => (
          <li key={note._id}>{note.title} ({note.file_type})</li>
        ))}
      </ul>

      <h3>Grades</h3>
      <ul>
        {grades.map(grade => (
          <li key={grade._id}>
            {grade.course_id.course_code}: {grade.marks_obtained}/{grade.total_marks} ({grade.grade_letter})
          </li>
        ))}
      </ul>

      {user.role === 'teacher' && (
        <>
          <h3>Assessments</h3>
          <ul>
            {assessments.map(a => (
              <li key={a._id}>{a.title} - {a.assessment_type}</li>
            ))}
          </ul>
        </>
      )}

      <h3>Announcements</h3>
      <ul>
        {announcements.map(a => (
          <li key={a._id}>{a.title} - {a.priority}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
