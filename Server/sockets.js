const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    maxHttpBufferSize: 1e8
});

var siofu = require("socketio-file-upload");

var mojangAPI = require('mojang-minecraft-api')
const util = require('minecraft-server-util');
var fs = require('fs');

const mysql = require('mysql');
const { symlinkSync } = require('fs');
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
    //REGISTER ALL SERVERS SOCKETS IN A VARIABLE
    socket.emit("connection-success");
    socket.on("minecraft:connect", (Servername) => {
        if (!serverSockets.get(Servername) || Servername != null){
            serverSockets.set(Servername, socket.id);
            sendMessage("Server Is Verbonden!", Servername);
        }else console.log("Probleem bij server connection")
    });
    //GET SERVER LOGS OF A SERVER
    socket.on("client:get-server-logs", (Servername) => {
        let getLogs = 'SELECT * FROM serverlogging WHERE Servername = ? ORDER BY Date ASC';
        connection.query(getLogs, [Servername] ,(error, results) => {
            if (error) throw error;
            io.emit("server:update-logging", results);
        }); 
        
    });
    //GET A LIST WITH ALL ACTIVE AND NON ACTIVE SERVERS
    socket.on("client:get-servers", function () {
        let getServerSQL = 'SELECT JsonData FROM servers ORDER BY id DESC';
        connection.query(getServerSQL ,(error, results) => {
            if (error) throw error;
            io.emit("server:server-list", results);
        });
        io.emit("server:get-server");
    });
    socket.on('minecraft:active-server', (data) => {
        const options = {
            timeout: 1000 * 5,
            enableSRV: true
        };
        if (data.Ip === "" ||data.Port === "")return;
        util.status(data.Ip, data.Port, options)
            .then((result) => {
                data.MOTD = result.motd.clean;
                data.Image = result.favicon;
                data.Version = result.version.name;

                let idSQL = 'SELECT * FROM servers';
                connection.query(idSQL ,(error, counter) => {
                    if (error) throw error;
                    var idLength = counter.length;  
                    data.id = idLength;
                    let sqlFind = 'SELECT * FROM servers WHERE Servername = ?';
                    connection.query(sqlFind, [data.Servername],(error, results) => {
                        if (error) throw error;
                        if (results.length > 0){
                            data.id = results[0].id;
                            let sqlUpdate = 'UPDATE servers SET JsonData=? WHERE Servername = ?';
                            connection.query(sqlUpdate, [JSON.stringify(data), data.Servername] ,(error, results) => {
                                if (error) throw error;
                                io.emit("server:update-server", data);
                                io.emit(`server:update-server-${data.id}`, data);
                            }); 
                        }else{
                            let sqlInsert = 'INSERT INTO servers (id, Servername, JsonData, AddedDate) VALUES (?,?,?,CURRENT_TIMESTAMP)';
                            connection.query(sqlInsert, [data.id, data.Servername, JSON.stringify(data)],(error, results) => {
                                if (error) throw error;
                                sendMessage("De server is toegevoegt!", data.Servername);
                                io.emit("server:update-server", data);
                                io.emit(`server:update-server-${data.id}`, data);
                            });   
                        }
                    });
                })
        })
        .catch((error) => console.log("Data van server niet kunnen ophalen!"));
    });
    //MINECRAFT SERVER CALL TO UPDATE THE PLAYERLIST
    var uuid = require('uuid');
    socket.on(`minecraft:player-update`, player => {
        if (player.Displayname === null)return;
        if (serverSockets.get(player.Servername) === undefined)return;
        let sql = 'SELECT COUNT(id) AS id_count FROM players WHERE Displayname = ?';
        connection.query(sql, [player.Displayname] ,(error, results) => {
            if (error) throw error;
            var counter = JSON.parse(JSON.stringify(results))[0].id_count;
            if(counter > 0){
                mojangAPI.getPlayerHeadByName(player.Displayname).then( playerHead => {
                    let sql2 = 'UPDATE players SET Icon=?,IP=?,Op=? WHERE Displayname = ?';
                    connection.query(sql2, [playerHead, player.Ip, player.Operator, player.Displayname] ,(error) => {
                        if (error) throw error;
                        io.emit(`server:player-update-${results[0].UUID}`, results[0])
                    });
                }).catch(function() {});
            }else{
                player.id = uuid.v4();
                mojangAPI.getPlayerHeadByName(player.Displayname).then( playerHead => {
                    let sql2 = 'INSERT INTO players (id, Displayname, UUID, Icon, IP, Op) VALUES (?,?,?,?,?,?)';
                    connection.query(sql2, [player.id, player.Displayname, player.UUID, playerHead, player.Ip, player.Operator] ,(error) => {
                        if (error) throw error;
                        console.log("Player added: " + player.Displayname + "! Met id: " + player.id);
                        io.emit(`server:player-update-${player.UUID}`, player)
                    })
                }).catch(function() {});    
            }
        });
    })
    //SOCKET WHEN SERVER GETS DISCONNECTED
    socket.on('minecraft:server-disconnect', (data) => {
        let jsonDataSQL = 'SELECT JsonData FROM servers WHERE Servername = ?';
        connection.query(jsonDataSQL, [data.Servername] ,(error, jsonResults) => {
            if (error) throw error;
            if(jsonResults.length > 0){
                var dataCopy = JSON.parse(jsonResults[0].JsonData);
                dataCopy.State = false;
                let sqlUpdate = 'UPDATE servers SET JsonData=? WHERE Servername = ?';
                connection.query(sqlUpdate, [JSON.stringify(dataCopy), data.Servername] ,(error) => {
                    if (error) throw error;
                    sendMessage("De server is gesloten!", dataCopy.Servername);
                    serverSockets.delete(dataCopy.Servername);
                    io.emit("server:update-server", dataCopy);
                    io.emit(`server:disable-server-${dataCopy.id}`, dataCopy);
                }); 
            }
        }); 
    });
    //SOCKET REQUEST BY CLIENT TO GET PLAYERLIST
    socket.on("client:server-player-list", servername => {
        sendMessage("Serverlist opgevraagd! SocketID: " + servername, servername);
        io.to(serverSockets.get(servername)).emit("server:server-player-list");
    });
    //MINECRAFT SERVER PLAYERLIST RETURN
    socket.on(`minecraft:server-player-list`, data => {
        let sqlUpdate = 'SELECT * FROM players WHERE ';
        data.Players.forEach(player => {
            sqlUpdate += `UUID='${player.UUID}' OR `;
        });
        sqlUpdate = sqlUpdate.substring(0, sqlUpdate.length - 4);
        connection.query(sqlUpdate ,(error, results) => {
            if (error) throw error;
            var correctData = [];
            for (var i = 0; i < data.Players.length; i++){
                var target = [];
                data.Players.forEach(player => {
                    if(player.UUID === results[i].UUID)
                        target = player;  
                })
                var copyData = target;
                if (results[i].Icon !== undefined)
                    copyData.Icon = results[i].Icon;
                copyData.id = results[i].id;
                correctData.push(copyData)
            }
            io.emit(`server:mcserver-player-list-${data.Server.Servername}`, correctData)
        }); 
    })
    //WEB CLIENT SERVER DATA REQUEST
    socket.on(`client:mcserver-get`, serverid => {
        let sqlUpdate = 'SELECT JsonData FROM servers WHERE id=?';
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
    //SOCKET TO SEND PLAYER EXPERIENCE TO CLIENT
    socket.on("minecraft:player-experience", data => {
        io.emit(`server:player-experience-${data.UUID}`, data);
    });

    //CONSOLE SOCKETS
    socket.on(`client:server-console-messages`, data => {
        let sqlGet = 'SELECT * FROM consoles WHERE Servername = ? ORDER BY Date DESC LIMIT 200';
        connection.query(sqlGet, [data.Servername],(error, results) => {
            if (error) throw error;
            results.reverse();
            socket.emit(`server:server-console-messages-${data.Servername}`, results);
        }); 
    });
    socket.on(`minecraft:server-console-message-add`, data => {
        data.Date = new Date(data.Date);
        let sqlGet = 'INSERT INTO consoles (Date, Servername, Message, Type) VALUES (?,?,?,?)';
        connection.query(sqlGet, [data.Date, data.Servername, data.Message, data.Type],(error, results) => {
            if (error) throw error;
            io.emit(`server:console-message-${data.Servername}`, data);
        }); 
    });
    //OPTIONS SOCKETS
    socket.on("client:server-option", data => {
        io.to(serverSockets.get(data.Server.Servername)).emit(`server:server-option`, data);
    });
    //CLIENT VERSION UPLOAD
    socket.on("client:version-update", data => {
        io.to(serverSockets.get(data.Server.Servername)).emit("server:version-update", data);
    });
    //MINECRAFT CHAT MESSAGE
    socket.on("minecraft:server-chat", data => {
        io.emit(`server:server-chat-${data.Servername}`, data);
    });
    //CLIENT ICON UPLOAD
    socket.on("client:icoon-update", data => {
        io.to(serverSockets.get(data.Server.Servername)).emit("server:icoon-update", data);
    });
    //SERVER FUNCTIONS
    socket.on("client:server-features", data => {
        io.to(serverSockets.get(data.Servername)).emit("server:server-features", data);
    });
    socket.on("minecraft:server-features-log", data => {
        io.emit(`server:server-features-log-${data.Servername}`, data)
    });
    //MC SERVER WHITELISTED PLAYERS
    socket.on("minecraft:server-whitelist-players", data => {
        io.emit(`server:server-whitelisted-${data.Servername}`, data.Players);
    });
    //MC SERVER BANNED PLAYERS
    socket.on("minecraft:server-banned-players", data => {
        io.emit(`server:server-banned-${data.Servername}`, data.Players);
    });
    //Reqeust the server for its files
    socket.on("client:server-files", servername => {
        io.to(serverSockets.get(servername)).emit("server:server-files", servername);
    });
    //When the files are coming in, send to sockets who wants them
    socket.on("minecraft:server-files", data => {
        io.emit(`server:server-files-${data.Servername}`, data);
    });
    //Folder actions in de server
    socket.on("client:server-files-action", data => {
        io.to(serverSockets.get(data.Servername)).emit(`server:server-files-action`, data);
    });
    //Add new player to database
    socket.on("client:new-player", player => {
        if (player.Displayname === null)return;
        if (serverSockets.get(player.Servername) === undefined)return;
        let sql = 'SELECT COUNT(id) AS id_count FROM players WHERE Displayname = ?';
        connection.query(sql, [player.Displayname] ,(error, results) => {
            if (error) throw error;
            var counter = JSON.parse(JSON.stringify(results))[0].id_count;
            if(counter > 0){
                mojangAPI.getPlayerHeadByName(player.Displayname).then( playerHead => {
                    let sql2 = 'UPDATE players SET Icon=?,IP=?,Op=? WHERE Displayname = ?';
                    connection.query(sql2, [playerHead, "0.0.0.0", 0, player.Displayname] ,(error) => {
                        if (error) throw error;
                        io.emit(`server:player-update-${results[0].UUID}`, results[0])
                    });
                }).catch(function() {});
            }else{
                player.id = uuid.v4();
                mojangAPI.getPlayerHeadByName(player.Displayname).then( playerHead => {
                    let sql2 = 'INSERT INTO players (id, Displayname, UUID, Icon, IP, Op) VALUES (?,?,?,?,?,?)';
                    connection.query(sql2, [player.id, player.Displayname, player.UUID, playerHead, "0.0.0.0", 0] ,(error) => {
                        if (error) throw error;
                        console.log("Player added: " + player.Displayname + "! Met id: " + player.id);
                        io.emit(`server:player-update-${player.UUID}`, player)
                    })
                }).catch(function() {});    
            }
        });
    });
    //Read file
    socket.on("minecraft:server-file-download", (data) => {
        console.log(data);
        io.emit(`server:server-file-download-${data.Servername}`, data)

/*      fs.writeFile(data.Name, data.File,  "binary",function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
      });*/
    });
});

server.listen(3001, function (){
    console.log("Listening on port: 3001")
});