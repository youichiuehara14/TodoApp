import express from 'express';
import {
  addTodo,
  deleteTodoById,
  getAllTodos,
  getTodoById,
  toggleCompleteTodo,
  updateTodoById,
} from '../controllers/todoController.js';

const router = express.Router();

router.post('/', addTodo);

router.get('/:id', getTodoById);

router.get('/', getAllTodos);

router.put('/:id', updateTodoById);

router.patch('/:id', toggleCompleteTodo);

router.delete('/:id', deleteTodoById);

export default router;
