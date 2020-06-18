const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app.js');
// require("dotenv/config");
// console.log(process.env);
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected successfully!');
  });

const PORT = 9000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on Port ${PORT}...`);
});
