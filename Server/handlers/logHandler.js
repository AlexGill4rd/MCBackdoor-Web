module.exports = (io) => {
  const sendPlayerPanelLog = function (clientsocketid, message, type, error) {
      io.to(clientsocketid).emit(message, type, error);
  }
  const sendServerPanelLog = function (clientsocketid, message, type, error) {
      io.to(clientsocketid).emit(message, type, error);
  }
  return {
    sendPlayerPanelLog,
    sendServerPanelLog
  }
}