const Todo = require("../models/todo");

const todosController = {};

todosController.createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    console.log(req.body);
    const newTodo = new Todo({ title, description });
    await newTodo.save();
    res.status(200).json(newTodo);
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};
/*
notesController.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Note updated successfully");
  res.redirect("/notes");
};
*/
todosController.deleteTodo = async (req, res, next) => {
  try {
    await Todo.findOneAndDelete(req.params.id);
    res.json({ message: "Todo Deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = todosController;
