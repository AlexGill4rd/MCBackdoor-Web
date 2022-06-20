var express = require('express');
var cors = require('cors');

var mojangAPI = require('mojang-minecraft-api')

const app = express();
var bodyParser = require("body-parser")
const mysql = require('mysql');

const PORT = 8080;
const token = 6969;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '100mb', extended: true}))

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'VirusAccount',
  password : 'JwSoCEiiNu0crQfV',
  database : 'virusv5'
});

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.post('/servers/get', function (req, res) {
    let token = req.body.token;
    if (token === token){
        let sql = 'SELECT * FROM servers ORDER BY id';
        connection.query(sql ,(error, results) => {
            if (error) throw error;
            res.send(results);
            res.end();
        });
    }
});
app.post('/server/get', function (req, res) {
  let token = req.body.token;
  let serverid = req.body.serverid;
  if (token === token){
    let sql = 'SELECT JsonData FROM servers WHERE id = ?';
      connection.query(sql, [serverid],(error, results) => {
        if (error) throw error;
        res.send(JSON.parse(results[0].JsonData));
        res.end();
      });
  }
});
app.post('/players/get', function (req, res) {
  let token = req.body.token;
  if (token === token){
    let sql = 'SELECT * FROM players';
      connection.query(sql,(error, results) => {
        if (error) throw error;
        res.send(results);
        res.end();
      });
  }
});
app.post('/minecraft/player/icon', function (req, res) {
  let sql = 'SELECT * FROM players WHERE Displayname = ?';
  connection.query(sql, [req.body.Displayname],(error, results) => {
    if (error) throw error;
    if (results[0].Icon !== undefined){
      res.send(results[0].Icon);
    }
    res.end();
    
  });
});
var file = "";
app.post('/server/versionupdate', function (req, res) {
  file = req.body.fileBase;
  res.send("Succesvol ontvangen");
  res.end();
});
app.post('/server/getversion', function (req, res) {
  res.send(file);
  res.end();
});
app.listen(PORT, () => {
    console.log(`Listening on *:${PORT}`);
});