const router = require("express-promise-router")();
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos.controller");

//middleware
const isAuthenticated = require("../middlewares/auth");
//show all todos
router.get("/", isAuthenticated, getAllTodos);

//create a new todo
router.post("/", isAuthenticated, createTodo);

//update a todo in db
router.put("/:id", isAuthenticated, updateTodo);

//delete a todo in db
router.delete("/:id", isAuthenticated, deleteTodo);

module.exports = router;
