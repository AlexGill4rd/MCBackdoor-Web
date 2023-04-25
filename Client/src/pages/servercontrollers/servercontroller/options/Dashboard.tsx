import "./DashboardStyle.scss";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import EditIcon from "@mui/icons-material/Edit";
import ReplayIcon from "@mui/icons-material/Replay";

import {
  Button,
  Select,
  Tooltip,
  SelectChangeEvent,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

import { useEffect, useState } from "react";
import { socket } from "../../../../socket/socket";
import VersionModal from "./dashboard/VersionModal";
import Chat from "./dashboard/Chat";
import IconModal from "./dashboard/IconModal";
import { FaCopy } from "react-icons/fa";
import IServer from "../../../../interfaces/IServer";

function Dashboard(props: { server: IServer }) {
  const [players, setPlayers] = useState<any>([]);
  const [server, setServer] = useState<IServer>(props.server);

  const [messages, setMessages] = useState<any[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  useEffect(() => {
    function loadPlayers() {
      socket.emit("feature:server", socket.id, server.id, "playerlist", {});
    }
    function updatePlayers() {
      socket.on(`server:get-playerlist-${server.id}`, (data) => {
        setPlayers(data);
      });
    }
    function updateServerData() {
      socket.on(`server:updated-server-${server.id}`, (data) => {
        setServer(data);
        socket.emit(
          "feature:server",
          socket.id,
          server.id,
          "chat-listener",
          {}
        );
      });
    }
    function serverDisconnects() {
      socket.on(`server:disable-server-${server.id}`, (data) => {
        setServer(data);
      });
    }
    function serverEnabled() {
      socket.on(`server:enabled-${server.id}`, (data) => {
        setServer(data);
      });
    }
    function handleChat() {
      socket.emit("feature:server", socket.id, server.id, "chat-listener", {});
      return () => {
        socket.emit(
          "feature:server",
          socket.id,
          server.id,
          "chat-stoplistening",
          {}
        );
      };
    }
    function listenMessages() {
      socket.on(`server:get-chat-${server.id}`, (player, message) => {
        var data = {
          Player: player,
          Message: message,
          Date: new Date().toLocaleTimeString(),
        };
        setMessages((messages: any) => [...messages, data]);
      });
    }
    loadPlayers();
    updatePlayers();
    updateServerData();
    serverDisconnects();
    serverEnabled();
    handleChat();
    listenMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handleVersionEdit() {
    setModalIsOpen(true);
  }
  function handleVersionEditCancel() {
    setModalIsOpen(false);
  }
  function handleVersionConfirm(url: any) {
    setModalIsOpen(false);
    var data = {
      URL: url,
    };
    socket.emit("feature:server", socket.id, server.id, "version-update", data);
  }
  const [messageFind, setMessageFind] = useState<string>("");
  const [messagesFound, setMessagesFound] = useState<string[]>([]);
  //EVENT WHEN SEARCH IS EDITED
  function handleMessageSearch(e: any) {
    setMessageFind(e.target.value);
  }
  const [filters, setFilters] = useState<string[]>(["ALLES"]);
  useEffect(
    function updateMessagesFound() {
      var found: string[] = [];
      messages.forEach((data: any) => {
        if (
          data.Message.toString()
            .toLowerCase()
            .startsWith(messageFind.toLowerCase()) ||
          messageFind === ""
        ) {
          if (
            filters.includes(data.Player.Displayname) ||
            filters.includes("ALLES")
          )
            found.push(data);
        }
      });
      setMessagesFound(found);
    },
    [messages, messageFind, filters]
  );
  //COMBO BOX HANDLERS
  const [playernames, setPlayernames] = useState<string[]>([]);

  useEffect(
    function loadPlayernames() {
      setPlayernames([]);
      setPlayernames((playernames: any) => [...playernames, "ALLES"]);
      players.forEach((player: any) => {
        setPlayernames((playernames: any) => [
          ...playernames,
          player.Displayname,
        ]);
      });
    },
    [players]
  );

  const handleFilterChange = (event: SelectChangeEvent<typeof filters>) => {
    const {
      target: { value },
    } = event;
    setFilters(typeof value === "string" ? value.split(",") : value);
  };
  //SERVER ICON CHANGE
  const [icoonModalIsOpen, setIcoonModalIsOpen] = useState<boolean>(false);
  function openIcoonModal() {
    if (server.state) setIcoonModalIsOpen(true);
    else
      socket.emit(
        "feature:server-log",
        socket.id,
        "Je kan geen icoon aanpassen wanneer de server uit staat!",
        "error",
        "Server disabled"
      );
  }
  function sluitIcoonModal() {
    setIcoonModalIsOpen(false);
  }
  function handleIcoonChange(image: any) {
    sluitIcoonModal();
    if (server.state) {
      var data = {
        Image: image,
      };
      socket.emit("feature:server", socket.id, server.id, "icon-update", data);
    } else
      socket.emit(
        "feature:server-log",
        socket.id,
        "Je kan geen icoon aanpassen wanneer de server uit staat!",
        "error",
        "Server disabled"
      );
  }
  //SERVER FUNCTIONS
  function handleServerOff() {
    if (server.state)
      socket.emit("feature:server", socket.id, server.id, "disable", {});
    else
      socket.emit(
        "feature:server-log",
        socket.id,
        "De server staat niet aan!",
        "error",
        "Server disabled"
      );
  }
  function handleServerReload() {
    if (server.state)
      socket.emit("feature:server", socket.id, server.id, "reload", {});
    else
      socket.emit(
        "feature:server-log",
        socket.id,
        "De server staat niet aan!",
        "error",
        "Server disabled"
      );
  }
  //Broadcasting
  const [bc, setBC] = useState<string>("");
  function handlebroadcast(e: any) {
    e.preventDefault();
    if (server.state) {
      var data = {
        Message: bc,
      };
      socket.emit("feature:server", socket.id, server.id, "broadcast", data);
      setBC("");
    } else
      socket.emit(
        "feature:server-log",
        socket.id,
        "Je kan geen broadcast doen wanneer de server uit staat!",
        "error",
        "Server disabled"
      );
  }
  function handleBCChange(e: any) {
    setBC(e.target.value);
  }
  function copyToClipboard() {
    setTimeout(
      async () => await window.navigator.clipboard.writeText(server.ip_address),
      10
    );
    socket.emit(
      "feature:server-log",
      socket.id,
      "Ip address gekopieerd!",
      "success"
    );
  }
  return (
    <div className="dashboard">
      <div className="dashboard-data">
        <div className="dashboard-data-info">
          <div className="dashboard-data-info-left">
            <div className="dashboard-data-info-address">
              <label>Servername:</label>
              <div className="dashboard-data-info-address-container">
                <input readOnly type="text" value={server.id} />
                <Button
                  onClick={copyToClipboard}
                  variant="contained"
                  startIcon={<FaCopy />}
                  sx={{
                    height: 30,
                    width: "20%",
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
            <div className="dashboard-data-info-motd">
              <label>Server MOTD:</label>
              <input readOnly type="text" value={server.motd} />
            </div>
            <div className="dashboard-data-info-broadcast">
              <label>Broadcast naar de server:</label>
              <form onSubmit={handlebroadcast}>
                <input
                  onChange={handleBCChange}
                  type="text"
                  value={bc}
                  placeholder="Geef een bericht..."
                />
              </form>
            </div>
            <div className="dashboard-data-info-version">
              <div className="dashboard-data-info-version-icon">
                <img
                  src="https://static.spigotmc.org/img/spigot-og.png"
                  alt="version icon"
                />
              </div>
              <div className="dashboard-data-info-version-info">
                <label>{server.software_version}</label>
              </div>
              {server.state && (
                <Button
                  onClick={handleVersionEdit}
                  variant="contained"
                  startIcon={<EditIcon />}
                >
                  Aanpassen
                </Button>
              )}
            </div>
            <div className="dashboard-data-info-state">
              <Tooltip
                title="Schakel de server uit"
                disableInteractive
                placement="top"
              >
                <div
                  onClick={handleServerOff}
                  className="dashboard-data-info-state-off"
                  style={server.state ? {} : { backgroundColor: "red" }}
                >
                  <PowerSettingsNewIcon />
                </div>
              </Tooltip>
              <Tooltip
                title="Reload de server"
                disableInteractive
                placement="top"
              >
                <div
                  onClick={handleServerReload}
                  className="dashboard-data-info-state-reload"
                  style={server.state ? {} : { backgroundColor: "red" }}
                >
                  <ReplayIcon />
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="dashboard-data-info-right">
            <div className="dashboard-data-info-icon" onClick={openIcoonModal}>
              <img src={server.favicon} alt="server icon" />
            </div>
            <div className="dashboard-data-info-container">
              <div className="dashboard-data-info-line">
                <p>Player count:</p>
                <span>
                  {server.players_online + " / " + server.players_max}
                </span>
              </div>
              <div className="dashboard-data-info-line">
                <p>Memory:</p>
                <span>
                  {server.memory_usage + " MB / " + server.max_memory + " MB"}
                </span>
              </div>
              <div className="dashboard-data-info-line">
                <p>Ticks Per Second:</p>
                <span>{server.tps + " / 20"}</span>
              </div>
              <div className="dashboard-data-info-line">
                <p>Ticks Per Second:</p>
                <span>{server.host_environment}</span>
              </div>
              <div className="dashboard-data-info-line">
                <p>Core Count:</p>
                <span>{server.cores}</span>
              </div>
              <div className="dashboard-data-info-line">
                <p>Software Version:</p>
                <span>{server.software_version}</span>
              </div>
              <div className="dashboard-data-info-line">
                <p>Software Used:</p>
                <span>{server.server_software}</span>
              </div>
              <div className="dashboard-data-info-line">
                <p>Java Version:</p>
                <span>{server.java_version}</span>
              </div>
              <div className="dashboard-data-info-line">
                <p>Operating System:</p>
                <span>{server.os_name}</span>
              </div>
              <div className="dashboard-data-info-line">
                <p>Operating Arch:</p>
                <span>{server.os_arch}</span>
              </div>
              <div className="dashboard-data-info-line">
                <p>Operating Version:</p>
                <span>{server.os_version}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-data-chat">
          <div className="dashboard-data-chat-sort">
            <input
              autoComplete="off"
              type="text"
              onChange={handleMessageSearch}
              value={messageFind}
              id="message"
              name="message"
              placeholder="Zoek een bericht..."
            />
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={filters}
              onChange={handleFilterChange}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              sx={{
                width: "200px",
                height: 35,
                marginLeft: "10px",
              }}
            >
              {playernames.map((name: string) => {
                return (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={filters.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <Chat Server={server} Messages={messagesFound} />
        </div>
      </div>
      {modalIsOpen && (
        <VersionModal
          onAccept={handleVersionConfirm}
          onCancel={handleVersionEditCancel}
        />
      )}
      {icoonModalIsOpen && (
        <IconModal onAccept={handleIcoonChange} onCancel={sluitIcoonModal} />
      )}
    </div>
  );
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "auto",
    },
  },
};
export default Dashboard;
