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
              player.favicon = results[0].favicon;
              io.emit(`server:player-update-${player.UUID}`, player);
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
  const updatePlayerData = (player) => {
    if (player.displayname === null) return;
    let idCounterSQL = "SELECT * FROM players WHERE uuid = ?";
    connection.query(idCounterSQL, [player.uuid], (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        let updatePlayerSQL =
          "UPDATE players SET displayname= ?, name = ?, ip_address = ? WHERE uuid = ?";
        connection.query(
          updatePlayerSQL,
          [player.displayname, player.name, player.ip_address, player.uuid],
          (error) => {
            if (error) throw error;
            player.favicon = results[0].favicon;
            io.emit(`server:player-update-${player.UUID}`, player);
          }
        );
      } else {
        getPlayerHead(player.uuid, (playerHead) => {
          player.favicon = playerHead;
          let insertPlayerSQL =
            "INSERT INTO players (displayname, name, uuid, favicon, ip_address, add_date) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP)";
          connection.query(
            insertPlayerSQL,
            [
              player.displayname,
              player.name,
              player.uuid,
              player.favicon,
              player.ip_address,
            ],
            (error) => {
              if (error) throw error;
              io.emit(`server:player-update-${player.uuid}`, player);
            }
          );
        });
      }
    });
  };
  const updatePlayerInfo = function (player) {
    if (player.displayname === null) return;
    let idCounterSQL = "SELECT * FROM players WHERE uuid = ?";
    connection.query(idCounterSQL, [player.uuid], (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        player.favicon = results[0].favicon;
        io.emit(`server:player-update-${player.uuid}`, player);
      }
    });
  };
  const getPlayerHead = (uuid, callback) => {
    mojangAPI
      .getPlayerHead(uuid)
      .then((playerHead) => {
        callback(playerHead);
      })
      .catch(function () {
        callback(null);
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
    updatePlayerData,
    updatePlayerInfo,
    getPlayerFromDatabase,
    getPlayerFromServer,
    getPlayerInventory,
    getPlayerEnderchest,
    getPlayerExperience,
    getPlayerArmor,
  };
};
