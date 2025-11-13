import { useEffect, useMemo, useState } from 'react';
import Auth from './components/Auth.jsx';
import TodoApp from './components/TodoApp.jsx';
import { clearSession, getSession, saveSession } from './utils/storage.js';

function App() {
  const [sessionUser, setSessionUser] = useState(() => getSession());

  useEffect(() => {
    if (sessionUser) {
      saveSession(sessionUser);
    } else {
      clearSession();
    }
  }, [sessionUser]);

  const content = useMemo(() => {
    if (!sessionUser) {
      return <Auth onAuthSuccess={setSessionUser} />;
    }

    return (
      <TodoApp
        username={sessionUser}
        onSignOut={() => setSessionUser(null)}
      />
    );
  }, [sessionUser]);

  return <div className="app-shell">{content}</div>;
}

export default App;
