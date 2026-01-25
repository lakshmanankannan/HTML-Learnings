import { useDispatch } from 'react-redux';
import { logout } from '../store/authslice';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
