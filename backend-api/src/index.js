const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const createError = require("http-errors");

//Initializations
const app = express();
//mongodb connection
require("./database");

//Settings
app.set("port", 3000 || process.env.PORT);

//Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Routes
//app.use("/users", require("./routes/users.routes"));
app.use("/todos", require("./routes/todos.routes"));

app.use((req, res, next) => {
  next(createError(404));
});

//custom error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});

//Starting Server
app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});
