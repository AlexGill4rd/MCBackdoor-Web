module.exports = (io) => {
    const sendPlayerAction = function (clientSocket, servername, feature, action) {
        io.emit(`feature:player-${servername}`, [clientSocket.id, feature, action]); //Send player action to server with a sertain action
    };
    const sendServerAction = function (clientSocket, servername, feature, action) {
        io.emit(`feature:server-${servername}`, [clientSocket.id, feature, action]); //Send server action to server with a sertain action
    };
    return {
        sendPlayerAction,
        sendServerAction
    }
  }