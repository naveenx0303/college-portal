// import React, { useState } from 'react';

// function Register() {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     // TODO: Add register logic
//     alert('Register submitted!');
//   };

//   return (
//     <div className="col-md-4 offset-md-4">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Name</label>
//           <input name="name" className="form-control" value={form.name}
//             onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Email</label>
//           <input name="email" type="email" className="form-control" value={form.email}
//             onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input name="password" type="password" className="form-control" value={form.password}
//             onChange={handleChange} required />
//         </div>
//         <button className="btn btn-primary w-100" type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { register } from '../services/authService';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import axios from 'axios';

// function Register() {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setError('');
//     try {
//       await register(form.name, form.email, form.password);
//       navigate('/login');
//     } catch (err) {
//       setError('Registration failed');
//     }
//   };

//   return (
//     <div className="col-md-4 offset-md-4">
//       <h2>Register</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Name</label>
//           <input name="name" className="form-control" value={form.name}
//             onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Email</label>
//           <input name="email" type="email" className="form-control" value={form.email}
//             onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input name="password" type="password" className="form-control" value={form.password}
//             onChange={handleChange} required />
//         </div>
//         <button className="btn btn-primary w-100" type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

function Register() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'student',
    student_id: '',
    phone: '',
    department: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/login');
  //   }
  // }, []);


  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>First Name</label>
            <input name="first_name" className="form-control" value={form.first_name} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Last Name</label>
            <input name="last_name" className="form-control" value={form.last_name} onChange={handleChange} required />
          </div>
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input name="password" type="password" className="form-control" value={form.password} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input name="phone" className="form-control" value={form.phone} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Student ID</label>
          <input name="student_id" className="form-control" value={form.student_id} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Department</label>
          {/* <input name="department" className="form-control" value={form.department} onChange={handleChange} required /> */}
          <select name="department" className="form-control" value={form.department} onChange={handleChange}>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
            <option value="EE">EE</option>
            <option value="CE">CE</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select name="role" className="form-control" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            {/* <option value="admin">Admin</option> */}
          </select>
        </div>

        <button className="btn btn-primary w-100" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;