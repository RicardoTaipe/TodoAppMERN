const { Router } = require("express");
const router = Router();
const {
  //getAllTodos,
  createTodo,
  //updateTodo,
  deleteTodo,
} = require("../controllers/todos.controller");

//middleware
//const { isAuthenticated } = require("../middlewares/auth");

//show all todos
//router.get("/", isAuthenticated, getAllTodos);

//create a new todo
router.post("/", createTodo);
//router.post("/", isAuthenticated, createTodo);

//update a todo in db
//router.put("/:id", isAuthenticated, updateTodo);

//delete a todo in db
router.delete("/:id", deleteTodo);

module.exports = router;
