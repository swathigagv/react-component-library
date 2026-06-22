import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [inputValue, setInputValue] = useState('');

  const [todos, setTodos] = useState(() => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : [
    { id: 1, text: 'Learn React state', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false } 
  ];
});
 
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTask = () => {
  
    if (inputValue.trim() === '') {
      console.log('2.Prevented: input is empty!');
      return;
    }

  const newTodo = {
    id: Date.now(),
    text: inputValue,
    completed: false
  }
  
  setTodos([...todos, newTodo])

  setInputValue('')
  }

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleDeleteTask = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  };

  return (
    <>
    <center>
    <div className="todo-container">
        <h1>React Todo</h1>
        <div className="input-section">
            <input
                type="text"
                className="todo-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => (e.key === 'Enter' && handleAddTask())
                }
                placeholder="Add a new todo..."
            />
            <button 
            className="add-btn"
            onClick={handleAddTask}>Add</button>
        </div>
        <ul className="todo-list">
            {todos.map(todo => (
                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <span
                    onClick={() => handleToggleComplete(todo.id)}
                    style={{ cursor: 'pointer' }}
                    >{todo.text}</span>
                    <button
                        className="delete-btn"
                        onClick={() => handleDeleteTask(todo.id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    </div>
    </center>
    </>
  )
}