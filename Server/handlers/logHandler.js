module.exports = (io) => {
  const sendPlayerPanelLog = function (clientsocketid, message, type, error) {
      io.to(clientsocketid).emit("feature:playerpanel-log", message, type, error);
  }
  const sendServerPanelLog = function (clientsocketid, message, type, error) {
      io.to(clientsocketid).emit("feature:serverpanel-log", message, type, error);
  }
  return {
    sendPlayerPanelLog,
    sendServerPanelLog
  }
}