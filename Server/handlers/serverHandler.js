var uuid = require('uuid');
var mojangAPI = require('mojang-minecraft-api')
const util = require('minecraft-server-util');
const mysql = require('mysql');

const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'VirusAccount',
    password : 'JwSoCEiiNu0crQfV',
    database : 'virusv5'
});

module.exports = (io) => {
    //SERVER DATA GETTERS
    const getServer = function (serverid, callback) {
        let getServerSQL = 'SELECT JsonData FROM activeservers WHERE id = ?';
        connection.query(getServerSQL, [serverid] ,(error, results) => {
            if (error) throw error;
            callback(JSON.parse(results[0].JsonData))
        });
    };
    const getServers = function (callback) {    
        let getServersSQL = 'SELECT * FROM activeservers ORDER BY AddedDate DESC';
        connection.query(getServersSQL ,(error, results) => {
            if (error) throw error;
            results.forEach(server => {
                server.JsonData = JSON.parse(server.JsonData);     
            })
            callback(results)
        });
    };
    /*
        Function to get the unique id af a certain server from the database or a new one.
    */
    const getServerUUID = function (servername, callback) { 
        let getServerSQL = 'SELECT id FROM activeservers WHERE Servername = ? LIMIT 1';
        connection.query(getServerSQL, [servername] ,(error, results) => {
            if (error) throw error;
            if (results.length > 0){
                let id = JSON.parse(JSON.stringify(results[0])).id;
                callback(id);
            }else {
                let getServerSQL = 'SELECT id FROM disabledservers WHERE Servername = ? LIMIT 1';
                connection.query(getServerSQL, [servername] ,(error, results) => {
                    if (error) throw error;
                    if (results.length > 0){
                        let id = JSON.parse(JSON.stringify(results[0])).id;
                        callback(id);
                    }
                    else{
                        const newId = uuid.v4();
                        callback(newId)
                    }
                });
            } 
        });
    };
    /*
        - First parameter is server variabel
        - Callback is function that will be called after value is retured 
    */
    const getServerVariable = function (server, callback) {
        if (server.Ip === "" || server.Port === "" || server.Servername === "")//Check if serverdata is empty
           return;
        const options = {
           timeout: 1000 * 5,
           enableSRV: true
        };
        util.status(server.Ip, server.Port, options)
            .then((result) => {
                server.MOTD = result.motd.clean;
                server.Image = result.favicon;
                server.Version = result.version.name;
                getServerUUID(server.Servername, response => {
                    server.id = response;
                    callback(server);
                })
            }).catch(error => console.log("Fout bij ophalen server UTIL info"));
    }
    const updateServer = function (server) {
        getServerVariable(server, serverJSON => {
            let sqlFind = 'SELECT * FROM activeservers WHERE id = ?';
            connection.query(sqlFind, [serverJSON.id],(error, results) => {
                if (error) throw error;
                if (results.length > 0){ //Check if server exists in database
                    let sqlUpdate = 'UPDATE activeservers SET JsonData = ? WHERE Servername = ?'; //Update sql to update existing server in database
                    connection.query(sqlUpdate, [JSON.stringify(serverJSON), serverJSON.Servername] ,(error) => {
                        if (error) throw error;
                        io.emit(`server:updated-server-${serverJSON.id}`, serverJSON);
                    }); 
                }else{ //Insert new server into the database
                    let sqlInsert = 'INSERT INTO activeservers (id, Servername, JsonData, AddedDate) VALUES (?,?,?,CURRENT_TIMESTAMP)';
                    connection.query(sqlInsert, [serverJSON.id, serverJSON.Servername, JSON.stringify(serverJSON)],(error) => {
                        if (error) throw error;
                        io.emit(`server:updated-server-${serverJSON.id}`, serverJSON);
                    });   
                }
            });
        });
    };
    const getServerWorlds = function (clientsocketid, worlds) {    
        io.to(clientsocketid).emit(`server:get-worlds`, worlds);
    };



    //CONNECTION FUNCTIONS
    const connectServer = function (data) {
        getServerVariable(data, server => {
            let sqlDelete = 'DELETE FROM disabledservers WHERE id = ?';
            connection.query(sqlDelete, [server.id],(error, results) => {
                if (error) throw error;
                io.emit(`server:activated`, server);
            });
            let setActiveServer = 'INSERT INTO activeservers (id, Servername, JsonData, AddedDate) VALUES (?,?,?,CURRENT_TIMESTAMP)';
            connection.query(setActiveServer, [server.id, server.Servername, JSON.stringify(server)], (error, results) => {
                if (error) throw error;
            });
        });
    };
    const disconnectServer = function (data) { 
         getServerVariable(data, server => {
            let sqlDelete = 'DELETE FROM activeservers WHERE id = ?';
            connection.query(sqlDelete, [server.id],(error, results) => {
                if (error) throw error;
                io.emit(`server:disable-server-${server.id}`, server); //Let clients know server is disconnected 
            });
            let addDisabledServer = 'INSERT INTO disabledservers (id, Servername, JsonData, AddedDate) VALUES (?,?,?,CURRENT_TIMESTAMP)';
            connection.query(addDisabledServer, [server.id, server.Servername, JSON.stringify(server)], (error, results) => {
                if (error) throw error;
                io.emit(`server:disable-server-${server.id}`, server);
            });
        });
    };




    //SERVER PLAYER FUNCTIONS
    const getPlayersFromDatabase = function (callback) {    
        let getServerSQL = 'SELECT * FROM players ORDER BY id DESC';
        connection.query(getServerSQL ,(error, results) => {
            if (error) throw error;
            callback(results)
        });
    };
    const getServerPlayerlist = function (clientsocketid, servername, playerlist) {
        if (playerlist === undefined)return;
        let sqlUpdate = 'SELECT * FROM players WHERE ';
        playerlist.forEach(player => {
            sqlUpdate += `UUID='${player.UUID}' OR `;
        });
        sqlUpdate = sqlUpdate.substring(0, sqlUpdate.length - 4);
        connection.query(sqlUpdate ,(error, results) => {
            if (error) throw error;
            var correctData = [];
            for (var i = 0; i < playerlist.length; i++){
                var target = [];
                playerlist.forEach(player => {
                    if(player.UUID === results[i].UUID)
                        target = player;  
                })
                var copyData = target;
                if (results[i].Icon !== undefined)
                    copyData.Icon = results[i].Icon;
                copyData.id = results[i].id;
                correctData.push(copyData)
            }
            getServerVariable(server, serverJSON => {
                io.to(clientsocketid).emit(`server:get-playerlist-${serverJSON.id}`, correctData) //Send request for playerlist to minecraft server
            });
        }); 
    };




    //MISC DATA
    const getConsoleMessages = function (servername, callback) { //Returns a json with all the console messages with a limit of 300
        let sqlGet = 'SELECT * FROM consoles WHERE Servername = ? ORDER BY Date DESC LIMIT 300';
        connection.query(sqlGet, [servername],(error, results) => {
            if (error) throw error;
            results.reverse();
            callback(results)
        }); 
    };
    const addConsoleMessage = function (data) {
        data.Date = new Date(data.Date);
        let sqlInsert = 'INSERT INTO consoles (Date, Servername, Message, Type) VALUES (?,?,?,?)'; //Adds a message to the console message database
        connection.query(sqlInsert, [data.Date, data.Servername, data.Message, data.Type],(error) => {
            if (error) throw error;
            io.emit(`server:updated-console-${data.Servername}`, data);
        }); 
    };
    const getServerWhitlist = function (clientsocketid, servername, players) {
        if (clientsocketid === null)
            io.emit(`server:get-whitelisted-${servername}`, players);
        else
            io.to(clientsocketid).emit(`server:get-whitelisted-${servername}`, players);
    };
    const getServerBanlist = function (clientsocketid, servername, players) {
        if(players.length > 0){
            let sql = 'SELECT * FROM players WHERE';
            players.forEach((player) => {
                sql += ` UUID = '${player.UUID}' OR `;
            })
            connection.query(sql.substring(0, sql.length - 3), (error, results) => {
                if (error) throw error;
                if (results.length > 0){
                    if (clientsocketid === null)
                        io.emit(`server:get-banlist-${servername}`, results);
                    else
                        io.to(clientsocketid).emit(`server:get-banlist-${servername}`, results);   
                }else{ //Normally not in use, but in case the players is not in de the database
                    var newPlayerlist = [];
                    players.forEach(player => {
                        var validDisplaynameChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
                        var valid = true;
                        for (var j = 0; j < player.Displayname.length; j++){
                            if (!validDisplaynameChars.includes(player.Displayname[j]))
                                valid = false;
                        }
                        if (valid){
                            mojangAPI.getPlayerHead(player.UUID).then((icon) => {
                                var clonePlayer = {
                                    Displayname: player.Displayname,
                                    UUID: player.UUID,
                                    Icon: icon
                                }
                                newPlayerlist.push(clonePlayer);
                                if (newPlayerlist.length >= players.length){
                                    if (clientsocketid === null)
                                        io.emit(`server:get-banlist-${servername}`, newPlayerlist);
                                    else
                                        io.to(clientsocketid).emit(`server:get-banlist-${servername}`, newPlayerlist);   
                                }
                            }).catch(function() {});
                        }
                    })
                }
            });
        }else{
            if (clientsocketid === null)
                io.emit(`server:get-banlist-${servername}`, players);
            else
                io.to(clientsocketid).emit(`server:get-banlist-${servername}`, players);
        }
    };


    //LISTENERS
    const listenChatMessage = function (clientsocketid, servername, player, message) {
        io.to(clientsocketid).emit(`server:get-chat-${servername}`, player, message);
    };
    const getServerFilelist = function (clientsocketid, files, mainpath, path) {
        io.to(clientsocketid).emit(`server:get-file-list`, files, mainpath, path);
    };
    const serverFileDownload = function (clientsocketid, servername, file, name, extension) {
        io.to(clientsocketid).emit(`server:download-file-${servername}`, file, name, extension);
    };
    const getFileText = function (clientsocketid, servername, file, name, extension) {
        io.to(clientsocketid).emit(`server:file-text-${servername}`, file, name, extension);
    };
    return {
        getServer,
        connectServer,
        disconnectServer,
        getServers,
        getServerUUID,
        getPlayersFromDatabase,
        updateServer,
        getServerWorlds,
        getServerPlayerlist,
        getConsoleMessages,
        addConsoleMessage,
        getServerWhitlist,
        getServerBanlist,
        listenChatMessage,
        getServerFilelist,
        serverFileDownload,
        getFileText
    }
  }