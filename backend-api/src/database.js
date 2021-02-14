const mongoose = require("mongoose");
const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } = process.env;
const MONGO_URI = `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.ju3ou.mongodb.net/notesystem?retryWrites=true&w=majority`;

const connectionSpec = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose
  .connect(MONGO_URI, connectionSpec)
  .then((db) => {
    console.log("DB is connected to MONGO ATLAS");
  })
  .catch((err) => {
    console.error(err);
  });
