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
app.use(bodyParser.json());

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'VirusAccount',
  password : 'JwSoCEiiNu0crQfV',
  database : 'virusv5'
});

app.use(bodyParser.urlencoded({
  extended: true
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
    let sql = 'SELECT * FROM servers WHERE id = ?';
      connection.query(sql, [serverid],(error, results) => {
        if (error) throw error;
        res.send(JSON.stringify(results[0]));
        res.end();
      });
  }
});
app.post('/servers/:serverid/players', function (req, res) {
  let serverid = req.body.serverID;
  res.send(JSON.stringify([{playerName: "KoningDerKoekjes", ipAddress:"81.83.111.201", op:"neen"}]));
  res.end();
});
app.post('/minecraft/player', function (req, res) {
  let playerName = req.body.playerName;
  let playerUUID = mojangAPI.getUUID(playerName);
  let playerImage = mojangAPI.getPlayerHeadByName(playerName);

  let sql = 'SELECT * FROM players WHERE Displayname = ?';
  connection.query(sql, [playerName],(error, results) => {
    if (error) throw error;
    if (results.length > 0){
      res.send(JSON.stringify(results[0]));
      res.end();
    }else{
      mojangAPI.getPlayerHeadByName(playerName).then( response => {
        playerImage = response;

        res.send(JSON.stringify(player));
        res.end();
      });
    }
  });
});
app.listen(PORT, () => {
    console.log(`Listening on *:${PORT}`);
});