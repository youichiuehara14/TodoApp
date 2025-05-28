import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true,
  },
  iscompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
