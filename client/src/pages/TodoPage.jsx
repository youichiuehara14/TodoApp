import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

export default function TodoPage() {
  const { todos, loading, error } = useContext(TodoContext);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-neumorphism-inset">
        <h1 className="text-3xl font-light text-gray-900 mb-8 text-center">Todo App</h1>
        <TodoForm />
        {loading && <p className="text-gray-600 text-center mt-4">Loading...</p>}
        {error && (
          <p className="text-gray-800 text-center font-medium bg-gray-100 p-3 rounded-md mt-4">
            {error}
          </p>
        )}
        {todos.length > 0 ? (
          <ul className="space-y-2 mt-6">
            {todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </ul>
        ) : (
          !loading && <p className="text-gray-500 text-center mt-6">No todos available.</p>
        )}
      </div>
    </div>
  );
}
