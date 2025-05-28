import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

const API_URL = '/api/v1/todo';

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch todos');
        console.error('Error fetching todos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (taskTitle) => {
    try {
      const response = await axios.post(API_URL, { taskTitle });
      setTodos([...todos, response.data]);
      setError(null);
      return { success: true, message: 'Todo added successfully' };
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
      return { success: false, message: 'Failed to add todo' };
    }
  };

  const updateTodo = async (id, taskTitle) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { taskTitle });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setError(null);
      return { success: true, message: 'Todo updated successfully' };
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
      return { success: false, message: 'Failed to update todo' };
    }
  };

  const toggleTodo = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`);
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setError(null);
      return { success: true, message: 'Todo toggled successfully' };
    } catch (err) {
      setError('Failed to toggle todo');
      console.error('Error toggling todo:', err);
      return { success: false, message: 'Failed to toggle todo' };
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      setError(null);
      return { success: true, message: 'Todo deleted successfully' };
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
      return { success: false, message: 'Failed to delete todo' };
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, loading, error, addTodo, updateTodo, toggleTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
