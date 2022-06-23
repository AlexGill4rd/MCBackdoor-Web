const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    maxHttpBufferSize: 1e8,
    cors: {
        origin: "https://localhost:3000"
    }
});

const {
    registerPlayer, 
    updatePlayer,
    getPlayerFromDatabase, 
    getPlayerFromServer, 
    getPlayerInventory, 
    getPlayerEnderchest, 
    getPlayerExperience } = require("./handlers/playerHandler")(io);
const { sendPlayerPanelLog, 
    sendServerPanelLog } = require("./handlers/logHandler")(io);
const {
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
    serverFileDownload } = require("./handlers/serverHandler")(io);
const { sendPlayerAction, sendServerAction } = require("./handlers/featureHandler")(io);
const { newSavedItem, savedItemList, savedItemAction } = require("./handlers/savedItemHandler")(io);


const onConnection = (socket) => {
    socket.on("player:register", registerPlayer);
    socket.on("player:get-database", getPlayerFromDatabase);
    socket.on("player:get-server", getPlayerFromServer);
    socket.on("player:update", updatePlayer);

    //Inventory part
    socket.on("player:response-inventory", getPlayerInventory);
    socket.on("player:response-enderchest", getPlayerEnderchest);
    socket.on("player:response-experience", getPlayerExperience);


    //Server action like getting world etc...
    socket.on("server:disconnect", disconnectServer);
    socket.on("server:get", getServer);
    socket.on("server:get-console", getConsoleMessages);
    socket.on("server:response-worlds", getServerWorlds);
    socket.on("server:response-playerlist", getServerPlayerlist);
    socket.on("server:response-console", addConsoleMessage);
    socket.on("server:response-whitelist", getServerWhitlist);
    socket.on("server:response-banlist", getServerBanlist);
    socket.on("server:response-chat", listenChatMessage);
    socket.on("server:response-file-list", getServerFilelist);
    socket.on("server:response-file-download", serverFileDownload);
    
    //Servers actions
    socket.on("servers:get", getServers);
    socket.on("servers:request-active", requestActiveServers);
    socket.on("servers:request-deactive", requestDeActiveServers);
    socket.on("servers:update-server", updateServer);

    //Action of the features on the site
    socket.on("feature:player", sendPlayerAction); //Connected to all the player responses above
    socket.on("feature:player-log", sendPlayerPanelLog);
    socket.on("feature:server", sendServerAction); //Connected to all the server responses above
    socket.on("feature:server-log", sendServerPanelLog);

    //Everything with save item system in database
    socket.on("saveditem:new", newSavedItem);
    socket.on("saveditem:request-list", savedItemList);
    socket.on("saveditem:action", savedItemAction);
}

io.on('connection', onConnection);

httpServer.listen(3001, function (){
    console.log("Listening on port: 3001")
});