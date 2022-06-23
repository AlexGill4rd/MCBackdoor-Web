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
        let getServerSQL = 'SELECT JsonData FROM servers ORDER BY id DESC';
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
            }).catch((error) => console.log("Data van server niet kunnen ophalen!"));
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
    const getServerID = function (servername, callback) {    
        let getServerSQL = 'SELECT id FROM servers WHERE Servername = ?';
        connection.query(getServerSQL, [servername] ,(error, results) => {
            if (error) throw error;
            if (results.length > 0)
                callback(results[0])
            else
                callback(undefined)
        });
    };
    const getServerWorlds = function (clientsocketid, worlds) {    
        io.to(clientsocketid).emit(`server:get-worlds`, worlds);
    };
    //Player list part
    const getServerPlayerlist = function (clientsocketid, playerlist) {
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
            if (clientsocketid === null)
                io.emit(`server:get-playerlist`, correctData)
            else
                io.to(clientsocketid).emit(`server:get-playerlist`, correctData); //Send request for playerlist to minecraft server
        }); 
    };
    const getConsoleMessages = function (servername, callback) { //Returns a json with all the console messages with a limit of 200
        let sqlGet = 'SELECT * FROM consoles WHERE Servername = ? ORDER BY Date DESC LIMIT 200';
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
            io.emit(`server:updated-console`, data);
        }); 
    };
    const getServerWhitlist = function ([clientsocketid, players]) {
        io.to(clientsocketid).emit(`server:get-whitelisted`, players);
    };
    const getServerBanlist = function ([clientsocketid, players]) {
        io.to(clientsocketid).emit(`server:get-banlist`, players);
    };
    const listenChatMessage = function ([clientsocketid, player, message]) {
        io.to(clientsocketid).emit(`server:get-chat`, player, message);
    };
    const getServerFilelist = function ([clientsocketid, files, mainpath, path]) {
        io.to(clientsocketid).emit(`server:get-file-list`, files, mainpath, path);
    };
    const serverFileDownload = function ([clientsocketid, file, name, extension]) {
        io.to(clientsocketid).emit(`server:download-file`, file, name, extension);
    };
    return {
        getServer,
        disconnectServer,
        getServers,
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
        serverFileDownload
    }
  }