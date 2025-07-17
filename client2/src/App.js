import { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch(`${API}/todos`)
      .then(res => res.json())
      .then(setTodos);
  }, []);

  const addTodo = () => {
    fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then(res => res.json())
      .then(newTodo => {
        setTodos(prev => [...prev, newTodo]);
        setText('');
      });
  };

  const deleteTodo = (id) => {
    fetch(`${API}/todos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTodos(prev => prev.filter(todo => todo._id !== id));
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h1>📝 To-Do App</h1>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Napiš úkol"
      />
      <button onClick={addTodo}>Přidat</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text} <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
