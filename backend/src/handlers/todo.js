import Todo from "../models/Todo.js";

// Get all todos
const getAllTodos = async () => {
  return await Todo.find().lean();
};

// Get one todo by id
const getTodoById = async (id) => {
  return await Todo.findOne({ _id: id }).lean();
};

// Create one todo
const createTodo = async ({ title, description, dueDate }) => {
  return await Todo.create({
    title,
    description,
    dueDate: new Date(dueDate), // Ensure the dueDate is a valid Date object
    completed: false,
  });
};

// Delete one todo by id
const deleteTodo = async (id) => {
  return await Todo.deleteOne({ _id: id });
};

// Update one todo by id
const updateTodo = async ({ id, title, description, dueDate, completed }) => {
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (dueDate !== undefined) updates.dueDate = new Date(dueDate); // Ensure the dueDate is a valid Date object
  if (completed !== undefined) updates.completed = completed;

  return await Todo.findOneAndUpdate({ _id: id }, updates, {
    new: true,
    lean: true,
  });
};

// New function: Search todos by title
const searchTodosByTitle = async (keyword) => {
  const regex = new RegExp(keyword, "i"); // Create a case-insensitive regex for the keyword
  return await Todo.find({ title: { $regex: regex } }).lean();
};

export default {
  getAllTodos,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
  searchTodosByTitle, // Export the new search function
};
