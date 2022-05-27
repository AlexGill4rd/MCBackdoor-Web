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

    socket.on("client:get-servers", function () {
        io.emit("server:get-server");
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

            var id = 0;
            let idSQL = 'SELECT * FROM servers';
            connection.query(idSQL ,(error, counter) => {
                if (error) throw error;
                id = counter.length;
                data.id = id;

                let sqlFind = 'SELECT * FROM servers WHERE Name = ?';
                connection.query(sqlFind, [data.Name],(error, results) => {
                    if (error) throw error;
                    if (results.length > 0){
                        let sqlUpdate = 'UPDATE servers SET Image=?,State=?,MaxPlayers=? WHERE Name=?';
                        connection.query(sqlUpdate, [JSON.stringify("Image", data.Image), data.State, data.MaxPlayers, data.Name] ,(error, results) => {
                            if (error) throw error;
                            console.log("Server Updated: " + data.Name);
                            io.emit("server:active-server", data);
                        }); 
                    }else{
                        let sqlInsert = 'INSERT INTO servers (id, Image, Name, State, MaxPlayers, InjectedDate) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP)';
                        connection.query(sqlInsert, [data.id, JSON.stringify("Image", data.Image), data.Name, data.State, data.MaxPlayers] ,(error, results) => {
                            if (error) throw error;
                            console.log("Server toegevoegd: " + data.Name);
                            io.emit("server:active-server", data);
                        });   
                    }
                });
            })
        })
        .catch((error) => console.error(error));
    });
    socket.on('minecraft:server-disconnect', (data) => {
        let sqlUpdate = 'UPDATE servers SET State=? WHERE Name = ?';
        connection.query(sqlUpdate, [data.State, data.Name] ,(error) => {
            if (error) throw error;
            console.log("Server closed: " + data.Name);
            io.emit("server:server-disconnect", data);
        }); 
    });
});
server.listen(3001, function (){
    console.log("Listening on port: 3001")
});