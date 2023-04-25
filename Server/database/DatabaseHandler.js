require("dotenv").config();
const mysql = require("mysql2");

const credentials = {
  database: "eeb",
  username: "dk71yz0qktzdt3tt4u25",
  host: "aws.connect.psdb.cloud",
  password: "pscale_pw_3wLI78buOTSPGGHO0DVLdsUKCSaHtyr0QUDAqTOboOU",
};

const DATABASE_URL = `mysql://${credentials.username}:${credentials.password}@${credentials.host}/${credentials.database}?ssl={"rejectUnauthorized":true}`;

const conn = mysql.createConnection(DATABASE_URL);

module.exports.connection = conn;
