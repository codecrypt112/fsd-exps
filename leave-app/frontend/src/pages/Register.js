import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    position: ''
  });
  const [error, setError] = useState('');
  
  const { name, email, password, department, position } = formData;
  
  const navigate = useNavigate();
  
  const onChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };
  
  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={department}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={position}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
