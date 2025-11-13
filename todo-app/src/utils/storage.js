const USERS_KEY = 'todoapp_users';
const SESSION_KEY = 'todoapp_session';

const readJson = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Failed to read ${key}`, error);
    return fallback;
  }
};

const writeJson = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to write ${key}`, error);
  }
};

export const getUsers = () => readJson(USERS_KEY, []);

export const saveUsers = (users) => writeJson(USERS_KEY, users);

export const registerUser = ({ username, password }) => {
  const users = getUsers();
  const usernameLower = username.toLowerCase();

  if (users.some((user) => user.usernameLower === usernameLower)) {
    return { ok: false, error: 'Username already exists.' };
  }

  const nextUsers = [
    ...users,
    {
      username,
      usernameLower,
      password,
      createdAt: Date.now(),
    },
  ];

  saveUsers(nextUsers);
  saveSession(username);

  return { ok: true };
};

export const authenticateUser = ({ username, password }) => {
  const users = getUsers();
  const usernameLower = username.toLowerCase();
  const matchedUser = users.find((user) => user.usernameLower === usernameLower);

  if (!matchedUser || matchedUser.password !== password) {
    return { ok: false, error: 'Invalid credentials.' };
  }

  saveSession(matchedUser.username);

  return { ok: true, username: matchedUser.username };
};

export const getSession = () => {
  const stored = readJson(SESSION_KEY, null);
  return stored?.username ?? null;
};

export const saveSession = (username) => writeJson(SESSION_KEY, { username });

export const clearSession = () => {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear session', error);
  }
};

const todosKey = (username) => `todoapp_todos_${username.toLowerCase()}`;

export const loadTodos = (username) => readJson(todosKey(username), []);

export const persistTodos = (username, todos) => writeJson(todosKey(username), todos);
