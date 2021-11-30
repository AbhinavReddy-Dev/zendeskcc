const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.EXPRESS_PORT,
  userName: process.env.USER_NAME,
  password: process.env.PASSWORD,
  domain: process.env.DOMAIN_NAME,
};
