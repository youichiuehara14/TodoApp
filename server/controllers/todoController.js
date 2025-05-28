import Todo from '../model/todo.js';

//* Add a new todo item/ /
export const addTodo = async (req, res) => {
  try {
    const { taskTitle } = req.body;
    if (!taskTitle) {
      return res.status(400).json({ message: 'taskTitle is required' });
    }

    const newTodo = new Todo({
      taskTitle,
      iscompleted: false,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//* Add a new todo item/ /

//* Get all todo items //
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
//* Get all todo items //

//* Get Todo by Id//
export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (err) {
    console.error('Error Getting Todo by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

//* Toggle the completion status of a todo item //
export const toggleCompleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.iscompleted = !todo.iscompleted;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.error('Error toggling todo completion:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
//* Toggle the completion status of a todo item //

//* Update / Edit A Todo //

export const updateTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskTitle } = req.body;
    if (!taskTitle) {
      return res.status(404).json({ message: "There's nothing to update" });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(id, { taskTitle }, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//* Delete by Id //

export const deleteTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
