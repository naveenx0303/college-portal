// import React, { useState } from 'react';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = e => {
//     e.preventDefault();
//     // TODO: Add login logic
//     alert('Login submitted!');
//   };

//   return (
//     <div className="col-md-4 offset-md-4">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Email</label>
//           <input type="email" className="form-control" value={email}
//             onChange={e => setEmail(e.target.value)} required />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input type="password" className="form-control" value={password}
//             onChange={e => setPassword(e.target.value)} required />
//         </div>
//         <button className="btn btn-primary w-100" type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
import React, { useState , useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await login(email, password);
//       // Redirect to previous page or dashboard
//       const from = location.state?.from?.pathname || '/dashboard';
//       navigate(from, { replace: true });
//     } catch (err) {
//       setError('Invalid credentials');
//     }
// console.log('Local:', localStorage.getItem('token'));
// console.log('Session:', sessionStorage.getItem('token'));
// console.log('Cookies:', document.cookie);
//   };

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    navigate('/dashboard');
  }
}, []);



const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const res = await login(email, password); // Wait for login response

    // ✅ Extract and store token
    const token = res.data.token;
    localStorage.setItem('token', token);

    // ✅ Navigate to dashboard (or previous page if available)
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  } catch (err) {
    console.error('Login failed:', err);
    setError('Invalid credentials');
  }
  console.log('Local:', localStorage.getItem('token'));
console.log('Session:', sessionStorage.getItem('token'));
console.log('Cookies:', document.cookie);
};


  return (
    <div className="col-md-4 offset-md-4">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email}
            onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password}
            onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary w-100" type="submit">Login</button>
     
      </form>
    </div>
  );
}

export default Login;