const dotenv = require('dotenv');
dotenv.config();
module.exports = {

  port: process.env.PORT,
  userName: process.env.USER_NAME,
  password: process.env.PASSWORD
};