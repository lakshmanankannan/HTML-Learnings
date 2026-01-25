import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    fetch(`http://localhost:5000/tasks?employeeId=${user?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, [token, user]);

  return (
    <div className="container">
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.task}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
