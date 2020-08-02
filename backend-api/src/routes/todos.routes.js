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
router.post("/", createTodo);
//router.post("/", isAuthenticated, createTodo);

//update a todo in db
router.put("/:id", updateTodo);

//delete a todo in db
router.delete("/:id", deleteTodo);

module.exports = router;
