import { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { Plus, Check, X } from 'lucide-react';

export default function TodoForm({ todoToEdit, clearEdit }) {
  const { addTodo, updateTodo } = useContext(TodoContext);
  const [taskTitle, setTaskTitle] = useState(todoToEdit ? todoToEdit.taskTitle : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskTitle) {
      alert('Task title is required');
      return;
    }

    try {
      const result = todoToEdit
        ? await updateTodo(todoToEdit._id, taskTitle)
        : await addTodo(taskTitle);
      if (result.success) {
        if (todoToEdit) clearEdit();
        setTaskTitle('');
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert('An error occurred');
      console.error('Error submitting form:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-8 items-center">
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
        required
      />

      {!todoToEdit ? (
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200 cursor-pointer flex items-center gap-2"
        >
          <Plus size={18} />
        </button>
      ) : (
        <>
          <button
            type="submit"
            className="p-2 rounded-md hover:text-gray-500 transition-all duration-200 cursor-pointer flex items-center"
          >
            <Check size={20} />
          </button>
          <button
            type="button"
            onClick={clearEdit}
            className="p-2 rounded-md hover:text-gray-500 transition-all duration-200 cursor-pointer flex items-center"
          >
            <X size={20} />
          </button>
        </>
      )}
    </form>
  );
}
