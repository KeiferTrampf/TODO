// router.js
import { Router } from "express";
import todoController from "./controllers/todoController.js"; // Import the todo controller

export const router = Router();

// To-Do
router.get("/todo", todoController.getTodos); // Route for fetching todos
router.post("/todo", todoController.createTodo); // Route for creating a todo
router.delete("/todo/:id", todoController.deleteTodo); // Route for deleting a todo
router.put("/todo/:id", todoController.updateTodo); // Route for updating a todo
router.get("/todo/search", todoController.searchTodosByTitle); // Route for searching todos by title
