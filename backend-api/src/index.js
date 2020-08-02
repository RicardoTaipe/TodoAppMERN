const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const createError = require("http-errors");
const multer = require("multer");
const cors = require("cors");
const mountRoutes = require("./routes/index.routes");
//Initializations
const app = express();
//mongodb connection
require("./database");

//Settings
app.set("port", 3000 || process.env.PORT);

//Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//setting multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(
  multer({
    storage,
    //destination: path.join(__dirname, "public/uploads"),
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const mimeType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mimeType && extname) {
        return cb(null, true);
      }
      cb(new Error("Error: el archivo debe ser una imagen de tipo jpg o png"));
    },
  }).single("image")
);

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Routes
// app.use("/todos", require("./routes/todos.routes"));
// app.use("/users", require("./routes/users.routes"));
mountRoutes(app);

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
