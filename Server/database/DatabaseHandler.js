require("dotenv").config();
const mysql = require("mysql2");

const DATABASE_URL =
  'mysql://xooqs1107mlyw88yyscu:pscale_pw_knyKCmEj8UvHEh5Dk8eqb7td2OqDWtGScnExAb5WdO1@aws.connect.psdb.cloud/eeb?ssl={"rejectUnauthorized":true}';

const conn = mysql.createConnection(DATABASE_URL);

module.exports.connection = conn;
