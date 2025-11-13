import { useState } from 'react';

function TodoComposer({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    onAddTodo(trimmed);
    setText('');
  };

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <input
        className="composer__input"
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button className="button button--primary" type="submit">
        Add
      </button>
    </form>
  );
}

export default TodoComposer;
