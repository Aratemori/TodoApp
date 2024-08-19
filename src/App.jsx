import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const maxTodos = 14

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (todos.length >= maxTodos) {
      alert('No more.')
      return;
    }
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const completedTodo = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };
  
  return (
    <>
      <header className="mx-80">
        <div className="bg-gray-800 h-16 content-center rounded-lg">
          <h1 className="text-center text-slate-200 text-4xl font-extrabold font-mono">T O D O</h1>
        </div>
      </header>
      <main>
        <div className="relative bg-gray-700 w-50 h-10 mt-5 mx-80 rounded-xl">
          <form onSubmit={addTodo}>
            <label>
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Input todo" 
                className="relative border-none rounded-md bg-gray-600 w-[75em] h-[28px] mt-[6px] mx-2
                font-serif font-bold text-white text-center" 
              />
              <button
                type="submit"
                className="w-[58px] h-[32px] rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-center">
                Add
              </button>
            </label>
          </form>
        </div>
        <div className="relative bg-gray-700 shadow-xl w-70 h-[48em] mt-4 mx-80 rounded-xl">
          <ul className="flex flex-wrap gap-4 pt-2">
            {todos.map((todo, index) => (
              <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
                <button className="absolute right-20 bg-purple-800 rounded-lg w-20 text-white" onClick={() => completedTodo(index)}>
                  {todo.completed ? 'UNDO' : 'SUCCESS'}
                </button>
                <button onClick={() => deleteTodo(index)} className='absolute right-6 bg-red-800 rounded-lg w-10 text-white'>DEL</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
