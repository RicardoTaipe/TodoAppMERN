const todos = require("./todos.routes");
const users = require("./users.routes");

module.exports = (app) => {
  app.use("/users", users);
  app.use("/todos", todos);
};
