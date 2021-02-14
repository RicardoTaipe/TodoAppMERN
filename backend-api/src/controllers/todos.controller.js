const Todo = require("../models/todo");

const getAllTodos = async (req, res, next) => {
  const { userId } = req.userData;
  const todos = await Todo.find({ user: userId }).sort({ createdAt: "desc" });
  res.status(200).json(todos);
};

const getTodo = async (req, res, next) => {
  const todoId = req.params.id;
  const todo = await User.findOne(todoId);
  res.status(200).json(todo);
};

const createTodo = async (req, res, next) => {
  const { title, description } = req.body;
  if (title.trim() === "") throw new Error("Title must not be empty");
  if (description.trim() === "")
    throw new Error("Description must not be empty");
  const newTodo = new Todo({ title, description, user: req.userData.userId });
  const result = await newTodo.save();
  res.status(200).json(result);
};

const updateTodo = async (req, res) => {
  const { title, description } = req.body;
  await Todo.findOneAndUpdate(req.params.id, { title, description });
  res.status(200).json("Updated successfully");
};

const deleteTodo = async (req, res, next) => {
  await Todo.findOneAndDelete({ _id: req.params.id });
  res.json({ message: "Deleted succesfully" });
};

module.exports = { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo };
