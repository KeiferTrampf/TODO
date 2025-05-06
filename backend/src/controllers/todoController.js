import todoHandler from "../handlers/todo.js";

const getTodos = async (req, res) => {
  try {
    const todos = await todoHandler.getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const result = await todoHandler.deleteTodo(todoId);
    if (!result.deletedCount) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the todo" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const newTodo = await todoHandler.createTodo({
      title,
      description,
      dueDate,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the todo" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { completed } = req.body;
    const updatedTodo = await todoHandler.updateTodo({
      id: todoId,
      completed,
    });
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the todo" });
  }
};

// New function: Search todos by title
const searchTodosByTitle = async (req, res) => {
  try {
    const { keyword } = req.query; // Extract the search keyword from query parameters
    if (!keyword) {
      return res.status(400).json({ error: "Title is required for searching" });
    }
    const todos = await todoHandler.searchTodosByTitle(keyword);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to search todos" });
  }
};

export default {
  getTodos,
  deleteTodo,
  createTodo,
  updateTodo,
  searchTodosByTitle, // Export the new search function
};
