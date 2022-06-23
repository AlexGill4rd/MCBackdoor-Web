var uuid = require('uuid');
var mojangAPI = require('mojang-minecraft-api')
const mysql = require('mysql');

const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'VirusAccount',
    password : 'JwSoCEiiNu0crQfV',
    database : 'virusv5'
});

module.exports = (io) => {
  const registerPlayer = function (player, callback) {
    var ip = player.Ip === undefined ? "0.0.0.0" : player.Ip;

    let sql = 'SELECT COUNT(id) AS id_count FROM players WHERE UUID = ?';
    connection.query(sql, [player.UUID] ,(error, results) => {
        if (error) throw error;
        var counter = JSON.parse(JSON.stringify(results))[0].id_count;
        //Check if player already is in database
        if(counter > 0){
            //Get player head from an API
            mojangAPI.getPlayerHeadByName(player.Displayname).then( playerHead => {
                //Update the player in the database
                let sql2 = 'UPDATE players SET Icon=?,IP=? WHERE Displayname = ?';
                connection.query(sql2, [playerHead, ip, player.Displayname] ,(error) => {
                    if (error) throw error;
                    //Send player data update to all sockets
                    io.emit(`server:player-update-${player.UUID}`, results[0])
                    callback("Player is geupdate");
                });
            }).catch(function() {});
        }else{
            //Get a unique id for the player
            player.id = uuid.v4();
            mojangAPI.getPlayerHeadByName(player.Displayname).then( playerHead => {
                let sql2 = 'INSERT INTO players (id, Displayname, UUID, Icon, IP) VALUES (?,?,?,?,?)';
                connection.query(sql2, [player.id, player.Displayname, player.UUID, playerHead, ip] ,(error) => {
                    if (error) throw error;
                    console.log("Player added: " + player.Displayname + "!");
                    //Send player data update to all sockets
                    io.emit(`server:player-update-${player.UUID}`, player)
                    callback("Nieuwe player toegevoegd aan de database");
                })
            }).catch(function() {});    
        }
    });
  }
  const updatePlayer = function (player) {
    /**
     * Player JSON:
     * - player.Displayname
     * - player.Servername
     * - player.Ip
     * - player.UUID
     */
    if (player.Displayname === null)return;
    let idCounterSQL = 'SELECT * FROM players WHERE UUID = ?';
    connection.query(idCounterSQL, [player.UUID] ,(error, results) => {
        if (error) throw error;
        if(results.length > 0){
            let updatePlayerSQL = 'UPDATE players SET IP = ? WHERE UUID = ?';
            connection.query(updatePlayerSQL, [player.Ip, player.UUID] ,(error) => {
                if (error) throw error;
                player.Icon = results[0].Icon
                io.emit(`server:player-update-${player.UUID}`, player)
            });
        }else{
            player.id = uuid.v4();
            mojangAPI.getPlayerHeadByName(player.Displayname).then(playerHead => {
                let insertPlayerSQL = 'INSERT INTO players (id, Displayname, UUID, Icon, IP) VALUES (?,?,?,?,?)';
                connection.query(insertPlayerSQL, [player.id, player.Displayname, player.UUID, playerHead, player.Ip] ,(error) => {
                    if (error) throw error;
                    io.emit(`server:player-update-${player.UUID}`, player)
                })
            }).catch(function() {});    
        }
    });
  };
  const getPlayerFromDatabase = function (playerUUID, callback) {
    let sql = 'SELECT * FROM players WHERE UUID=?';
    connection.query(sql,[playerUUID],(error, results) => {
      if (error) throw error;
      callback(results);
    });
  }
  const getPlayerFromServer = function (clientsocket, playerUUID, servername) {
    io.emit(`player:get-server-${servername}`, clientsocket.id, playerUUID);
  }

  const getPlayerInventory = function (playerUUID, inventory) {
    io.emit(`player:get-inventory-${playerUUID}`, inventory);
  }
  const getPlayerEnderchest = function (playerUUID, enderchest) {
    io.emit(`player:get-enderchest-${playerUUID}`, enderchest);
  }
  const getPlayerExperience = function (clientsocketid, playerUUID, experience) {
    io.to(clientsocketid).emit(`player:get-experience-${playerUUID}`, experience);
  }
  return {
    registerPlayer,
    updatePlayer,
    getPlayerFromDatabase,
    getPlayerFromServer,
    getPlayerInventory,
    getPlayerEnderchest,
    getPlayerExperience
  }
}