import { useState, useEffect } from "react"
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface todoProps {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<todoProps[]>(() => {
    const savedTodos = localStorage.getItem("TASKS");
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: "1", text: "Take a rest", completed: true },
      { id: "2", text: "Code", completed: false }
    ];
  });

  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem("TASKS", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return;
    const newTodo: todoProps = {
      id: Date.now().toString(),
      text: input,
      completed: false,
    }
    setTodos([...todos, newTodo])
    setInput('')
  }

  const removeTodo = (id: string) => {
    const removedTodo = todos.filter((todo => todo.id !== id))
    setTodos(removedTodo)
  }

  const toggleCompleted = (id: string) => {
    setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="h-full min-h-md bg-gray-300 rounded-lg shadow-lg overflow-hidden">
        <form onSubmit={addTodo} className="flex border-b-3 border-gray-200">
          <input
            className="flex-grow p-4 outline-none text-lg text-center"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new task..."
          />
          <IconButton type="submit" color="primary" className="m-2">
            <AddIcon fontSize="large" />
          </IconButton>
        </form>

        <ul className="divide-y divide-gray-300">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center p-4 hover:bg-gray-50">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo.id)}
                className="w-5 h-5 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span
                className={`flex-grow text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
              >
                {todo.text}
              </span>
              <IconButton onClick={() => removeTodo(todo.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoList
