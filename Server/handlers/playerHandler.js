var uuid = require("uuid");
var mojangAPI = require("mojang-minecraft-api");

const { connection } = require("../database/DatabaseHandler");

module.exports = (io) => {
  const registerPlayer = function (player) {
    var ip = player.ip_address === undefined ? "0.0.0.0" : player.ip_address;

    let sql = "SELECT COUNT(id) AS id_count FROM players WHERE uuid = ?";
    connection.query(sql, [player.uuid], (error, results) => {
      if (error) throw error;
      var counter = JSON.parse(JSON.stringify(results))[0].id_count;
      //Check if player already is in database
      if (counter > 0) {
        //Get player head from an API
        mojangAPI
          .getPlayerHeadByName(player.name)
          .then((favicon) => {
            //Update the player in the database
            let sql2 =
              "UPDATE players SET favicon=?, ip_address=? WHERE name = ?";
            connection.query(sql2, [favicon, ip, player.name], (error) => {
              if (error) throw error;
              //Send player data update to all sockets
              io.emit(`server:player-update-${player.UUID}`, results[0]);
            });
          })
          .catch(function () {});
      } else {
        mojangAPI
          .getPlayerHeadByName(player.name)
          .then((favicon) => {
            let sql2 =
              "INSERT INTO players (displayname, name, uuid, favicon, ip_address, add_date) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP)";
            connection.query(
              sql2,
              [player.displayname, player.name, player.uuid, favicon, ip],
              (error) => {
                if (error) throw error;
                console.log("Player added: " + player.displayname + "!");
                //Send player data update to all sockets
                io.emit(`server:player-update-${player.uuid}`, player);
              }
            );
          })
          .catch(function () {});
      }
    });
  };
  const updatePlayer = function (player) {
    /**
     * Player JSON:
     * - player.Displayname
     * - player.Servername
     * - player.Ip
     * - player.UUID
     */
    if (player.Displayname === null) return;
    let idCounterSQL = "SELECT * FROM players WHERE UUID = ?";
    connection.query(idCounterSQL, [player.UUID], (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        let updatePlayerSQL = "UPDATE players SET IP = ? WHERE UUID = ?";
        connection.query(updatePlayerSQL, [player.Ip, player.UUID], (error) => {
          if (error) throw error;
          player.Icon = results[0].Icon;
          io.emit(`server:player-update-${player.UUID}`, player);
        });
      } else {
        player.id = uuid.v4();
        mojangAPI
          .getPlayerHeadByName(player.Displayname)
          .then((playerHead) => {
            let insertPlayerSQL =
              "INSERT INTO players (id, Displayname, UUID, Icon, IP) VALUES (?,?,?,?,?)";
            connection.query(
              insertPlayerSQL,
              [
                player.id,
                player.Displayname,
                player.UUID,
                playerHead,
                player.Ip,
              ],
              (error) => {
                if (error) throw error;
                io.emit(`server:player-update-${player.UUID}`, player);
              }
            );
          })
          .catch(function () {});
      }
    });
  };
  const getPlayerFromDatabase = function (playerUUID, callback) {
    let sql = "SELECT * FROM players WHERE UUID=?";
    connection.query(sql, [playerUUID], (error, results) => {
      if (error) throw error;
      callback(results);
    });
  };
  const getPlayerFromServer = function (clientsocket, playerUUID, servername) {
    io.emit(`player:get-server-${servername}`, clientsocket.id, playerUUID);
  };

  const getPlayerInventory = function (playerUUID, inventory) {
    io.emit(`player:get-inventory-${playerUUID}`, inventory);
  };
  const getPlayerEnderchest = function (playerUUID, enderchest) {
    io.emit(`player:get-enderchest-${playerUUID}`, enderchest);
  };
  const getPlayerExperience = function (
    clientsocketid,
    playerUUID,
    experience
  ) {
    io.to(clientsocketid).emit(
      `player:get-experience-${playerUUID}`,
      experience
    );
  };
  const getPlayerArmor = function (clientsocketid, playerUUID, armordata) {
    io.to(clientsocketid).emit(`player:get-armor-${playerUUID}`, armordata);
  };
  return {
    registerPlayer,
    updatePlayer,
    getPlayerFromDatabase,
    getPlayerFromServer,
    getPlayerInventory,
    getPlayerEnderchest,
    getPlayerExperience,
    getPlayerArmor,
  };
};
