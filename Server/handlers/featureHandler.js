module.exports = (io) => {
  const sendPlayerAction = function (
    clientsocketid,
    serverid,
    playerUUID,
    feature,
    action
  ) {
    io.emit(
      `feature:player-${serverid}`,
      clientsocketid,
      playerUUID,
      feature,
      action
    ); //Send player action to server with a sertain action
  };
  const sendServerAction = function (
    clientsocketid,
    serverid,
    feature,
    action
  ) {
    io.emit(`feature:server-${serverid}`, clientsocketid, feature, action); //Send server action to server with a sertain action
  };
  return {
    sendPlayerAction,
    sendServerAction,
  };
};
