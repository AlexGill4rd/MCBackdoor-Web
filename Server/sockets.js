const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var mojangAPI = require('mojang-minecraft-api')
const util = require('minecraft-server-util');

const mysql = require('mysql');
const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'VirusAccount',
    password : 'JwSoCEiiNu0crQfV',
    database : 'virusv5'
});
function sendMessage(message, servername){
    let insertLog = 'INSERT INTO serverlogging (Date, Message, Servername) VALUES (CURRENT_TIMESTAMP,?,?)';
    connection.query(insertLog, [message, servername] ,(error, results) => {
        if (error) throw error;
        let getLogs = 'SELECT * FROM serverlogging WHERE Servername = ? ORDER BY Date ASC';
        connection.query(getLogs, [servername] ,(error, results) => {
            if (error) throw error;
            io.emit("server:update-logging", results);
        }); 
    }); 
}
let serverSockets = new Map();
io.on('connection', socket => {
    socket.emit("connection-succes");
    socket.on("minecraft:connect", (address) => {
        serverSockets.set(address, socket.id);
        sendMessage("Server Is Verbonden!", address);
    });
    socket.on("client:get-server-logs", (address) => {
        let getLogs = 'SELECT * FROM serverlogging WHERE Servername = ? ORDER BY Date ASC';
        connection.query(getLogs, [address] ,(error, results) => {
            if (error) throw error;
            io.emit("server:update-logging", results);
        }); 
        
    });
    socket.on(`minecraft:player-list-update`, players => {
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
                    var id = 0;
                    let idSQL = 'SELECT * FROM servers';
                    connection.query(idSQL ,(error, results) => {
                        if (error) throw error;
                        id = results.length;
                    });
                    let sql2 = 'INSERT INTO players (id, Displayname, UUID, Op, Health, IP, XpLevel) VALUES (?,?,?,?,?,?,?)';
                    connection.query(sql2, [id, player.Displayname, player.UUID, player.Op, player.Health, player.Ip, player.XpLevel] ,(error, results) => {
                        if (error) throw error;
                        sendMessage("Nieuwe speler toegevoegd!", serverSockets.get(socket.id));
                    }); 
                }
            });
        });
        io.emit("server:player_update");
    })

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
        util.status(data.Ip, data.Port, options)
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
                connection.query(sqlFind, [data.Address],(error, results) => {
                    if (error) throw error;
                    if (results.length > 0){
                        let sqlUpdate = 'UPDATE servers SET Image=?,MOTD=?,State=?,MaxPlayers=?,Version=? WHERE Name=?';
                        connection.query(sqlUpdate, [JSON.stringify({"Image": data.Image}), data.MOTD, data.State, data.MaxPlayers, data.Version, data.Address] ,(error, results) => {
                            if (error) throw error;
                            io.emit("server:update-servers", data);
                        }); 
                    }else{
                        let sqlInsert = 'INSERT INTO servers (id, Image, Name, MOTD, State, MaxPlayers, Version, InjectedDate, JsonData) VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP,?)';
                        connection.query(sqlInsert, [data.id, JSON.stringify({"Image": data.Image}), data.Address, data.MOTD, data.State, data.MaxPlayers, data.Version, JSON.stringify(data)] ,(error, results) => {
                            if (error) throw error;
                            sendMessage("De server is toegevoegt!", data.Address);
                            io.emit("server:update-servers", data);
                        });   
                    }
                });
            })
        })
        .catch((error) => console.error(error));
    });
    socket.on('minecraft:server-disconnect', (data) => {
        let sqlUpdate = 'UPDATE servers SET State=? WHERE Name = ?';
        connection.query(sqlUpdate, [data.State, data.Address] ,(error) => {
            if (error) throw error;
            sendMessage("De server is gesloten!", data.Address);
            io.emit("server:update-servers", data);
        }); 
    });

    socket.on("client:server-player-list", serverid => {
        let sqlUpdate = 'SELECT * FROM servers WHERE id=?';
        connection.query(sqlUpdate, [serverid] ,(error, results) => {
            if (error) throw error;
            sendMessage("Serverlist opgevraagd!", results[0].Name);
            socket.to(results[0].Name).emit("server:server-player-list");
        }); 
    });
    socket.on(`minecraft:server-player-list`, data => {
        io.emit("server:mcserver-player-list", JSON.stringify(data))
    })

    socket.on(`client:mcserver-get`, serverid => {
        let sqlUpdate = 'SELECT * FROM servers WHERE id=?';
        connection.query(sqlUpdate, [serverid] ,(error, results) => {
            if (error) throw error;
            io.emit("server:mcserver-get", results[0]);
        }); 
    })

    socket.on(`client:features-change`, data => {
        io.emit("server:features-change", data)
    })
    socket.on(`minecraft:features-change-message`, data => {
        io.emit("server:features-change-message", data)
    })

    socket.on(`client:mcserver-getworlds`, data => {
        io.emit("server:mcserver-getworlds", data)
    })
    socket.on(`minecraft:mcserver-getworlds`, data => {
        io.emit("server:mcserver-getworlds-list", data)
    })
});
server.listen(3001, function (){
    console.log("Listening on port: 3001")
});