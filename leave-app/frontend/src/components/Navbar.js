import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
  const { employee } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const onLogout = () => {
    dispatch(logout());
  };
  
  return (
    <nav>
      <div className="nav-container">
        <Link to="/">Leave Management</Link>
        
        {employee ? (
          <div className="nav-links">
            <span>Welcome, {employee.name}</span>
            {employee.isAdmin && <Link to="/leaves">Manage Leaves</Link>}
            <Link to="/" onClick={onLogout}>Logout</Link>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
