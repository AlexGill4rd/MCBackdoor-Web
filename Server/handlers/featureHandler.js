module.exports = (io) => {
    const sendPlayerAction = function (clientsocketid, servername, playerUUID, feature, action) {
        console.log(action)
        io.emit(`feature:player-${servername}`, clientsocketid, playerUUID, feature, action); //Send player action to server with a sertain action
    };
    const sendServerAction = function (clientsocketid, servername, feature, action) {
        io.emit(`feature:server-${servername}`, clientsocketid, feature, action); //Send server action to server with a sertain action
    };
    return {
        sendPlayerAction,
        sendServerAction
    }
  }