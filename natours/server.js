const dotenv = require('dotenv');
const app = require('./app.js');
// require("dotenv/config");
// console.log(process.env);
dotenv.config({ path: './config.env' });

const PORT = 9000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on Port ${PORT}...`);
});
