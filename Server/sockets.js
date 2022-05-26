const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var mojangAPI = require('mojang-minecraft-api')
const util = require('minecraft-server-util');

var bodyParser = require("body-parser")
const mysql = require('mysql');
const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'VirusAccount',
    password : 'JwSoCEiiNu0crQfV',
    database : 'virusv5'
  });

io.on('connection', socket => {
    socket.on("client:get-server", function () {
        io.emit("server:get-server");
    });

    socket.on("player_list", (players) => {
        players.forEach(player => {
            let sql = 'SELECT * FROM players WHERE Displayname = ?';
            connection.query(sql, [player.Displayname] ,(error, results) => {
                if (error) throw error;
                if(results.length > 0){
                    let sql2 = 'UPDATE players SET Op=?,Health=?,IP=?,XpLevel=? WHERE Displayname = ?';
                    connection.query(sql2, [player.Op, player.Health, player.Ip, player.XpLevel, player.Displayname] ,(error, results) => {
                        if (error) throw error;
                    });
                }else{
                    mojangAPI.getPlayerHeadByName(player.Displayname).then( playerImage => {
                        var id = 0;
                        let idSQL = 'SELECT COUNT(*) FROM players';
                        connection.query(idSQL ,(error, results) => {
                            if (error) throw error;
                            id = results;
                        });
                        let sql2 = 'INSERT INTO players (id, Displayname, UUID, Image, Op, Health, IP, XpLevel) VALUES (?,?,?,?,?,?,?,?)';
                        connection.query(sql2, [id, player.Displayname, player.UUID, playerImage, player.Op, player.Health, player.Ip, player.XpLevel] ,(error, results) => {
                            if (error) throw error;
                            console.log("Player added: " + player.Displayname);
                        }); 
                    });
                }
            });
        });
        io.emit("server:player_update");
    });
    socket.on("client:active-players", (server) => {
        io.emit("server:active-players", server)
    });
    socket.on("minecraft:active-players", (players) => {
        io.emit("server:active-players", players)
    });

    socket.on('minecraft:active-server', (data) => {
        const options = {
            timeout: 1000 * 5,
            enableSRV: true
        };
        util.status(data.Name, 25565, options)
        .then((result) => {
            data.MOTD = result.motd.clean;
            data.MaxPlayers = result.players.max;
            data.OnlinePlayers = result.players.online;
            data.Image = result.favicon;
            data.Version = result.version.name;
            io.emit("server:active-server", data);
        })
        .catch((error) => console.error(error));
        
    });
});
server.listen(3001, function (){
    console.log("Listening on port: 3001")
});