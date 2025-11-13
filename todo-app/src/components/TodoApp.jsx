import { useEffect, useMemo, useState } from 'react';
import TodoComposer from './TodoComposer.jsx';
import TodoList from './TodoList.jsx';
import { loadTodos, persistTodos } from '../utils/storage.js';

const filters = {
  all: () => true,
  active: (todo) => !todo.completed,
  completed: (todo) => todo.completed,
};

const filterLabels = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

function TodoApp({ username, onSignOut }) {
  const [todos, setTodos] = useState(() => loadTodos(username));
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    persistTodos(username, todos);
  }, [todos, username]);

  const filteredTodos = useMemo(
    () => todos.filter(filters[filter] ?? filters.all),
    [todos, filter]
  );

  const pendingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );

  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const changeFilter = (nextFilter) => {
    setFilter(nextFilter);
  };

  return (
    <div className="panel">
      <header className="panel__header">
        <div>
          <h1 className="panel__title">Welcome, {username}!</h1>
          <p className="panel__subtitle">
            {pendingCount
              ? `You have ${pendingCount} pending task${
                  pendingCount === 1 ? '' : 's'
                }.`
              : 'All tasks completed. Great job!'}
          </p>
        </div>
        <button className="button" onClick={onSignOut} type="button">
          Sign Out
        </button>
      </header>

      <TodoComposer onAddTodo={addTodo} />

      <div className="toolbar">
        <div className="toolbar__filters">
          {Object.entries(filterLabels).map(([value, label]) => (
            <button
              key={value}
              className={`chip${filter === value ? ' chip--active' : ''}`}
              type="button"
              onClick={() => changeFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <button className="button button--subtle" onClick={clearCompleted} type="button">
          Clear completed
        </button>
      </div>

      <TodoList todos={filteredTodos} onToggle={toggleTodo} onRemove={removeTodo} />
    </div>
  );
}

export default TodoApp;
