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
        let getLogs = 'SELECT * FROM serverlogging WHERE Servername = ? ORDER BY Date ASC LIMIT 50';
        connection.query(getLogs, [servername] ,(error, results) => {
            if (error) throw error;
            io.emit("server:update-logging", results);
        }); 
    }); 
}
let serverSockets = new Map();
io.on('connection', socket => {
    socket.emit("connection-success");
    socket.on("minecraft:connect", (address) => {
        if (!serverSockets.get(address) || address != null){
            serverSockets.set(address, socket.id);
            sendMessage("Server Is Verbonden!", address);
        }else console.log("Probleem bij server connection")
    });
    socket.on("client:get-server-logs", (address) => {
        let getLogs = 'SELECT * FROM serverlogging WHERE Servername = ? ORDER BY Date ASC';
        connection.query(getLogs, [address] ,(error, results) => {
            if (error) throw error;
            io.emit("server:update-logging", results);
        }); 
        
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
        .catch((error) => console.log("Data van server niet kunnen ophalen!"));
    });
    socket.on(`minecraft:player-list-update`, players => {
        players.forEach(player => {
            let sql = 'SELECT * FROM players WHERE Displayname = ?';
            connection.query(sql, [player.Displayname] ,(error, results) => {
                if (error) throw error;
                if(results.length > 0){
                    let sql2 = 'UPDATE players SET IP=?,Op=? WHERE Displayname = ?';
                    connection.query(sql2, [player.Ip, player.Op, player.Displayname] ,(error, results) => {
                        if (error) throw error;
                        io.emit("server:player-update", player)
                    });
                }else{
                    var id = 0;
                    let idSQL = 'SELECT * FROM servers';
                    connection.query(idSQL ,(error, results) => {
                        if (error) throw error;
                        id = results.length;
                    });
                    mojangAPI.getPlayerHeadByName(player.Displayname).then( response => {
                        let sql2 = 'INSERT INTO players (id, Displayname, UUID, Icon, IP, Op) VALUES (?,?,?,?,?,?)';
                        player.Icon = response;
                        connection.query(sql2, [id, player.Displayname, player.UUID, player.Icon, player.Ip, player.Op] ,(error, results) => {
                            if (error) throw error;
                            console.log("Player added: " + player.Displayname);
                            io.emit("server:player-update", player)
                        }); 
                    });

                }
            });
        });
    })
    socket.on('minecraft:server-disconnect', (data) => {
        let sqlUpdate = 'UPDATE servers SET State=? WHERE Name = ?';
        connection.query(sqlUpdate, [data.State, data.Address] ,(error) => {
            if (error) throw error;
            sendMessage("De server is gesloten!", data.Address);
            serverSockets.delete(data.Address);
            io.emit("server:update-servers", data);
            io.emit("server:disable-server", data);
        }); 
    });

    socket.on("client:server-player-list", servername => {
        sendMessage("Serverlist opgevraagd! SocketID: " + servername, servername);
        io.to(serverSockets.get(servername)).emit("server:server-player-list");
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

    //PLAYER DATA
    socket.on("client:player-data", data => {
        io.to(serverSockets.get(data.Servername)).emit("server:features-change", data);
    });
    socket.on("minecraft:player-data", data => {
        io.emit(`server:player-data-${data.UUID}`, data);
    });

    //SOCKET TO SEND PLAYER INVENTORY DATA TO CLIENT
    socket.on("minecraft:player-inventory", data => {
        io.emit("server:player-inventory-update", data);
    });
    //SOCKET TO SEND PLAYER ENDERCHEST DATA TO CLIENT
    socket.on("minecraft:player-enderchest", data => {
        io.emit("server:player-enderchest-update", data);
    });
    
    //SAVED ITEM SECTION
    socket.on("client:saved-items", servername => {
        let sqlGet = 'SELECT * FROM saveditems ORDER BY Datum ASC';
        connection.query(sqlGet ,(error, results) => {
            if (error) throw error;
            socket.emit("server:saved-items", results);
        });      
    });
    socket.on("client:save-item", saveitem => {
        let slqGetLength = 'SELECT * FROM saveditems';
        let id = 0;
        connection.query(slqGetLength ,(error, results) => {
            if (error) throw error;
            id = results.length;
            let sqlInsert = 'INSERT INTO saveditems (id, Servername, Itemstack, Player, Datum) VALUES (?,?,?,?,CURRENT_TIMESTAMP)';
            connection.query(sqlInsert, [id, saveitem.Servername, JSON.stringify(saveitem.Itemstack), JSON.stringify(saveitem.Player)],(error, results) => {
                if (error) throw error;
                let sqlGet = 'SELECT * FROM saveditems ORDER BY Datum ASC';
        connection.query(sqlGet ,(error, results) => {
            if (error) throw error;
            socket.emit("server:saved-items", results);
        });   
            }); 
        }); 
    });
    socket.on("client:saved-item-action", data => {
        if (data.Type === "saved-remove"){
            let sqlInsert = 'DELETE FROM saveditems WHERE id = ?';
            connection.query(sqlInsert, [data.id],(error, results) => {
                if (error) throw error;
                let sqlGet = 'SELECT * FROM saveditems ORDER BY Datum ASC';
                connection.query(sqlGet ,(error, results) => {
                    if (error) throw error;
                    socket.emit("server:saved-items", results);
                });   
            }); 
        }else if (data.Type === "saved-edit"){
            let sqlInsert = 'UPDATE saveditems SET Itemstack=? WHERE id=?';
            connection.query(sqlInsert, [JSON.stringify(data.Itemstack), data.id] ,(error, results) => {
            }); 
        }else if (data.Type === "saved-give"){
            io.to(serverSockets.get(data.Servername)).emit("server:features-change", data);
        }  
    });
});
server.listen(3001, function (){
    console.log("Listening on port: 3001")
});