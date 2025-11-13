import { useState } from 'react';
import {
  authenticateUser,
  registerUser,
} from '../utils/storage.js';

const initialForm = {
  username: '',
  password: '',
};

function Auth({ onAuthSuccess }) {
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!form.username.trim() || !form.password.trim()) {
      setError('Please enter a username and password.');
      return;
    }

    if (mode === 'signup') {
      const result = registerUser(form);
      if (!result.ok) {
        setError(result.error);
        return;
      }

      onAuthSuccess(form.username);
      setForm(initialForm);
      return;
    }

    const result = authenticateUser(form);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    onAuthSuccess(result.username ?? form.username);
    setForm(initialForm);
  };

  const switchMode = () => {
    setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'));
    setForm(initialForm);
    setError('');
  };

  return (
    <div className="panel">
      <h1 className="panel__title">Todo App</h1>
      <p className="panel__subtitle">
        {mode === 'signin'
          ? 'Sign in to manage your tasks.'
          : 'Create an account to get started.'}
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label className="form__field">
          <span>Username</span>
          <input
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, username: event.target.value }))
            }
          />
        </label>

        <label className="form__field">
          <span>Password</span>
          <input
            type="password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            value={form.password}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, password: event.target.value }))
            }
          />
        </label>

        {error && <p className="form__error">{error}</p>}

        <button className="button button--primary" type="submit">
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <button className="button button--link" onClick={switchMode} type="button">
        {mode === 'signin'
          ? "Don't have an account? Sign up"
          : 'Already have an account? Sign in'}
      </button>
    </div>
  );
}

export default Auth;
