// import React from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container">
//         <Link className="navbar-brand" to="/">College Portal</Link>
//         <div>
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item"><Link className="nav-link" to="/courses">Courses</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/announcements">Announcements</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/assessments">Assessments</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/notes">Notes</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/grades">Grades</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">College Portal</Link>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* ...other links... */}
            {!isLoggedIn && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
            {!isLoggedIn && <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>}
            {isLoggedIn && <li className="nav-item"><button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button></li>}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;