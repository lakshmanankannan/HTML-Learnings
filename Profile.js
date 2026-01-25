import { useSelector } from 'react-redux';

export default function Profile() {
  const user = useSelector(state => state.auth.user);

  return (
    <div className="container">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
}
