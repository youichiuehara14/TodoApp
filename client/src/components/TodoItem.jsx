import { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoForm from './TodoForm';
import { Pencil, Trash2 } from 'lucide-react';

export default function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleToggle = async () => {
    const result = await toggleTodo(todo._id);
    if (!result.success) alert(result.message);
  };

  const handleDelete = async () => {
    const result = await deleteTodo(todo._id);
    if (!result.success) alert(result.message);
  };

  return (
    <li className="border border-gray-200 p-4 rounded-md bg-white hover:bg-gray-50 transition-colors duration-200">
      {isEditing ? (
        <TodoForm todoToEdit={todo} clearEdit={handleCancelEdit} />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={todo.iscompleted}
              onChange={handleToggle}
              className="w-5 h-5 accent-gray-800 cursor-pointer"
            />
            <h3
              className={`text-lg font-light ${
                todo.iscompleted ? 'line-through text-gray-400' : 'text-gray-900'
              }`}
            >
              {todo.taskTitle}
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="p-2 rounded-md hover:text-gray-500 transition-all duration-200 cursor-pointer flex items-center"
              aria-label="Edit"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-md hover:text-gray-500 transition-all duration-200 cursor-pointer flex items-center"
              aria-label="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
