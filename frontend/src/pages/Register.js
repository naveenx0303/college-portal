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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await register(form.name, form.email, form.password);
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="col-md-4 offset-md-4">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input name="name" className="form-control" value={form.name}
            onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input name="email" type="email" className="form-control" value={form.email}
            onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input name="password" type="password" className="form-control" value={form.password}
            onChange={handleChange} required />
        </div>
        <button className="btn btn-primary w-100" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;