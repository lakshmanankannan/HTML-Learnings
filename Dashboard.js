import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authslice';

export default function Dashboard() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Welcome, {user?.name}</h2>
      <nav>
        <Link to="/profile">Profile</Link> |{' '}
        <Link to="/attendance">Attendance</Link> |{' '}
        <Link to="/tasks">Tasks</Link> |{' '}
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
}
