import { Button, CircularProgress, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SimplePopup from "../../../globaltsx/SimplePopup";
import IpAddress from "../../../IpAddress";
import { socket } from "../../../socket/socket";
import OptionButton from "./components/OptionButton";
import BannedPlayers from "./options/BannedPlayers";
import Console from "./options/Console";
import Dashboard from "./options/Dashboard";
import Files from "./options/Files";
import Whitelist from "./options/Whitelist";
import "./ServerControllerPageStyling.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Worlds from "./options/Worlds";
import MobSpawner from "./options/MobSpawner";
import IServer from "../../../interfaces/IServer";
import Background from "../../../globalscss/background/Background";
import IPopup from "../../../interfaces/IPopup";

function ServerControllerPage() {
  const { serverid } = useParams();

  const [server, setServer] = useState<IServer | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  useEffect(() => {
    function loadServer() {
      socket.emit("server:get", serverid, (response: IServer) => {
        if (response === null) return;
        setServer(response);
      });
    }
    function serverDisconnects() {
      socket.on(`server:disable-server-${serverid}`, (data) => {
        setServer(data);
      });
    }
    function serverEnabled() {
      socket.on(`server:enabled-${serverid}`, (data) => {
        setServer(data);
      });
    }
    function listenPopups() {
      socket.on(`feature:serverpanel-log`, (popup: IPopup) => {
        handlePopup(popup);
      });
    }
    loadServer();
    serverDisconnects();
    serverEnabled();
    listenPopups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (server !== undefined) handleOptionClick(<Dashboard server={server} />);
  }, [server]);
  function handleOptionClick(selection: any) {
    setSelectedOption(selection);
  }
  //POPUP SYSTEM
  const [popups, setPopUps] = useState<IPopup[]>([]);
  const handlePopup = (popup: IPopup) => {
    var formatMessage: any;
    if (popup.error !== null)
      formatMessage = [
        <div key={popup.error}>
          <div>{popup.message}</div>
          <Tooltip title={popup.error || "no error given..."}>
            <span style={{ cursor: "pointer", color: "gray", width: "auto" }}>
              Bekijk error
            </span>
          </Tooltip>
        </div>,
      ];
    else {
      formatMessage = [<div key={popup.message}>{popup.message}</div>];
    }
    popup.title = "Player Controller";
    setPopUps((popups: any) => [...popups, popup]);
  };
  return (
    <div className="servercontroller">
      <Background />
      <div className="servercontroller-options">
        <div className="servercontroller-options-list">
          {server !== undefined && server !== null ? (
            <>
              <OptionButton
                Title="Dashboard"
                Description="Het dashboard van de server met interessante functies en informatie"
                onClick={() => handleOptionClick(<Dashboard server={server} />)}
              />
              <OptionButton
                Title="Console"
                Description="De console van de server waar al de logs binnen komen"
                onClick={() => handleOptionClick(<Console Server={server} />)}
              />
              <OptionButton
                Title="Files"
                Description="De files van de server die zich bevinden in de root folder van de server"
                onClick={() => handleOptionClick(<Files Server={server} />)}
              />
              <OptionButton
                Title="Banned Players"
                Description="Een lijst met de spelers die eerder verbannen zijn van de server"
                onClick={() =>
                  handleOptionClick(<BannedPlayers Server={server} />)
                }
              />
              <OptionButton
                Title="Whitelisted Players"
                Description="Een lijst met de spelers dat gewhitelist zijn op de server"
                onClick={() => handleOptionClick(<Whitelist Server={server} />)}
              />
              <OptionButton
                Title="Worlds"
                Description="De werelden waaruit de server bestaadt en hun informatie"
                onClick={() => handleOptionClick(<Worlds Server={server} />)}
              />
              <OptionButton
                Title="Mob Spawner"
                Description="Spawn zelf samengestelde entities in een wereld"
                onClick={() =>
                  handleOptionClick(<MobSpawner Server={server} />)
                }
              />
            </>
          ) : (
            <CircularProgress />
          )}
        </div>
        <Link
          to={"/controller/servers/" + serverid}
          style={{ width: "100%", textDecoration: "none" }}
        >
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            sx={{
              marginTop: "10px",
              width: "100%",
              backgroundColor: "#13335C",
            }}
          >
            Ga terug
          </Button>
        </Link>
      </div>
      <div className="servercontroller-panel">
        {selectedOption === null ? (
          <>Geen Optie geselecteerd!</>
        ) : (
          selectedOption
        )}
      </div>
      {popups.map((popup, i) => {
        return <SimplePopup key={i} popup={popup} />;
      })}
    </div>
  );
}
export default ServerControllerPage;
