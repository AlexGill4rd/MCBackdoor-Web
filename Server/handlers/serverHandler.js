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
    const getServer = function (serverid, callback) {
        let getServerSQL = 'SELECT JsonData FROM servers WHERE id = ?';
        connection.query(getServerSQL, [serverid] ,(error, results) => {
            if (error) throw error;
            callback(JSON.parse(results[0].JsonData))
        });
    };
    const disconnectServer = function (server) { 
        /*
         * Server data:
         * - server.Servername
         */
           
        let jsonDataSQL = 'SELECT JsonData FROM servers WHERE Servername = ?';
        connection.query(jsonDataSQL, [server.Servername] ,(error, jsonResults) => {
            if (error) throw error;
            if(jsonResults.length > 0){ //Check if server exists
                var serverCopy = JSON.parse(jsonResults[0].JsonData);
                serverCopy.State = false;
                let sqlUpdate = 'UPDATE servers SET JsonData = ? WHERE Servername = ?'; //Update server SQL with -> State = false
                connection.query(sqlUpdate, [JSON.stringify(serverCopy), server.Servername] ,(error) => {
                    if (error) throw error;
                    io.emit(`server:active-server`, serverCopy); //Let clients know server is disconnected
                    io.emit(`server:disable-server-${serverCopy.id}`, serverCopy); //Let clients know server is disconnected
                }); 
            }
        }); 
    };
    const getServers = function (callback) {    
        let getServerSQL = 'SELECT * FROM players ORDER BY id ASC';
        connection.query(getServerSQL ,(error, results) => {
            if (error) throw error;
            callback(results)
        });
    };
    const getPlayersFromDatabase = function (callback) {    
        let getServerSQL = 'SELECT * FROM players ORDER BY id DESC';
        connection.query(getServerSQL ,(error, results) => {
            if (error) throw error;
            callback(results)
        });
    };
    const updateServer = function (server) {
        /*
         * Server data:
         * - server.Ip
         * - server.Port
         * - server.Servername
         */
        
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
                

                let sqlFind = 'SELECT * FROM servers WHERE Servername = ?';
                connection.query(sqlFind, [server.Servername],(error, results) => {
                    if (error) throw error;

                    if (results.length > 0){ //Check if server exists in database
                        server.id = results[0].id;
                        let sqlUpdate = 'UPDATE servers SET JsonData = ? WHERE Servername = ?'; //Update sql to update existing server in database
                        connection.query(sqlUpdate, [JSON.stringify(server), server.Servername] ,(error) => {
                            if (error) throw error;
                            io.emit(`server:active-server`, server);
                            io.emit(`server:updated-server-${server.id}`, server);
                        }); 
                    }else{
                        server.id = uuid.v4();
                        let sqlInsert = 'INSERT INTO servers (id, Servername, JsonData, AddedDate) VALUES (?,?,?,CURRENT_TIMESTAMP)';
                        connection.query(sqlInsert, [server.id, server.Servername, JSON.stringify(server)],(error) => {
                            if (error) throw error;
                            io.emit(`server:active-server`, server);
                            io.emit(`server:updated-server-${server.id}`, server);
                        });   
                    }
                });
            }).catch(error => console.log("Fout bij ophalen server UTIL info"));
    };
    const requestActiveServers = function (clientsocketid) {    
        io.emit("servers:active", clientsocketid);
    };
    const requestDeActiveServers = function (callback) {    
        let getServerSQL = 'SELECT * FROM servers';
        connection.query(getServerSQL ,(error, results) => {
            if (error) throw error;
            if (results.length > 0)
                callback(results)
            else
                callback(undefined)
        });
    };
    const getServerWorlds = function (clientsocketid, worlds) {    
        io.to(clientsocketid).emit(`server:get-worlds`, worlds);
    };
    //Player list part
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
            let getServerSQL = 'SELECT id FROM servers WHERE Servername = ?';
            connection.query(getServerSQL, [servername] ,(error, results) => {
                if (error) throw error;
                var serverid = JSON.parse(JSON.stringify(results[0])).id;
                if (clientsocketid === null)
                    io.emit(`server:get-playerlist-${serverid}`, correctData)
                else
                    io.to(clientsocketid).emit(`server:get-playerlist`, correctData); //Send request for playerlist to minecraft server
            });
            
        }); 
    };
    const getConsoleMessages = function (servername, callback) { //Returns a json with all the console messages with a limit of 300
        let sqlGet = 'SELECT * FROM consoles WHERE Servername = ? LIMIT 300';
        connection.query(sqlGet, [servername],(error, results) => {
            if (error) throw error;
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
        disconnectServer,
        getServers,
        getPlayersFromDatabase,
        requestActiveServers,
        requestDeActiveServers,
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