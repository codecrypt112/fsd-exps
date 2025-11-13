import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Home } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="header">
      <h1>
        🚀 MicroBlog
      </h1>
      <div className="header-actions">
        <button className="btn-secondary" onClick={() => navigate('/')}>
          <Home size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Home
        </button>
        <button className="btn-secondary" onClick={() => navigate(`/profile/${user?.username}`)}>
          <User size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Profile
        </button>
        <button className="btn-secondary" onClick={handleLogout}>
          <LogOut size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
