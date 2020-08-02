const Todo = require("../models/todo");
const todosController = {};

todosController.getAllTodos = async (req, res, next) => {
  const todos = await Todo.find({}).sort({ createdAt: "desc" });
  res.status(200).json(todos);
};

todosController.getTodo = async (req, res, next) => {
  const todoId = req.params.id;
  const todo = await User.findOne(todoId);
  res.status(200).json(todo);
};

todosController.createTodo = async (req, res, next) => {
  const { title, description } = req.body;
  if (title.trim() === "") throw new Error("Title must not be empty");
  if (description.trim() === "")
    throw new Error("Description must not be empty");
  const newTodo = new Todo({ title, description });
  const result = await newTodo.save();
  res.status(200).json(result);
};

todosController.updateTodo = async (req, res) => {
  const { title, description } = req.body;
  await Todo.findOneAndUpdate(req.params.id, { title, description });
  res.status(200).json("Updated successfully");
};

todosController.deleteTodo = async (req, res, next) => {
  await Todo.findOneAndDelete({ _id: req.params.id });
  res.json({ message: "Deleted succesfully" });
};

module.exports = todosController;
