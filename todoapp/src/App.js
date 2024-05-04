// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [email1, setEmail1] = useState('');
  const [password1, setPassword1] = ('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/tasks', { headers: { Authorization: token } })
        .then(res => setTasks(res.data))
        .catch(err => console.log(err));
    }
  }, [token]);

  const handleSignup = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', { email, password })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
      setEmail('');
      setPassword('');
  }; 

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', { email1, password1})
      .then(res => {
        setToken(res.data.token);
        setEmail('');
        setPassword('');
      })
      .catch(err => console.log("hi" ,err));
  };

  const handleLogout = () => {
    setToken('');
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/addTask', { title, description }, { headers: { Authorization: token } })
      .then(res => {
        setTasks([...tasks, res.data]);
        setTitle('');
        setDescription('');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      {token ? (
        <div>
          <h1>Logged In</h1>
          <button onClick={handleLogout}>Logout</button>
          <h2>Add Task</h2>
          <form onSubmit={handleAddTask}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Add Task</button>
          </form>
          <h2>Tasks</h2>
          <ul>
            {tasks.map(task => (
              <li key={task._id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1>Signup</h1>
          <form onSubmit={handleSignup}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Signup</button>
          </form>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email1} onChange={(e) => setEmail1(e.target.value)} />
            <input type="password" placeholder="Password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
