function TodoList({ todos, onToggle, onRemove }) {
  if (todos.length === 0) {
    return <p className="empty-state">No tasks to display.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`todo-item${todo.completed ? ' todo-item--done' : ''}`}>
          <label className="todo-item__body">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span>{todo.text}</span>
          </label>
          <button className="button button--icon" onClick={() => onRemove(todo.id)} type="button" aria-label="Remove todo">
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
