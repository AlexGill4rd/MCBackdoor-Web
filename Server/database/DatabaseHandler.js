require("dotenv").config();
const mysql = require("mysql2");

const credentials = {
  database: "eeb",
  username: "wn3ilthnp6clfa9lr7ib",
  host: "aws.connect.psdb.cloud",
  password: "pscale_pw_DiW7KZF8dikmFCPxrpCzGlAIjPPgUSr2xzVRSFuTlQV",
};

const DATABASE_URL = `mysql://${credentials.username}:${credentials.password}@${credentials.host}/${credentials.database}?ssl={"rejectUnauthorized":true}`;

const conn = mysql.createConnection(DATABASE_URL);

module.exports.connection = conn;
