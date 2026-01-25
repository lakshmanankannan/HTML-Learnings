import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    fetch(`http://localhost:5000/attendance?employeeId=${user?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setAttendance(data))
      .catch(err => console.error(err));
  }, [token, user]);

  return (
    <div className="container">
      <h2>Attendance</h2>
      {attendance.length === 0 ? (
        <p>No records found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map(item => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
