import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import PlayerList from "./components/PlayerList";
import FeatureButton from "./features/FeatureButton";
import OperatorPanel from "./features/panels/OperatorPanel";
import "./PlayerControllerPageStyling.scss";

import { FaUsers } from "react-icons/fa";

import GamemodePanel from "./features/panels/GamemodePanel";
import CrashPanel from "./features/panels/CrashPanel";
import KickPanel from "./features/panels/KickPanel";
import TeleportPanel from "./features/panels/TeleportPanel";
import WhitelistPanel from "./features/panels/WhitelistPanel";
import { socket } from "../../../socket/socket";
import KillPanel from "./features/panels/KillPanel";
import BanPanel from "./features/panels/BanPanel";
import PMSpamPanel from "./features/panels/PMSpamPanel";
import LeakPanel from "./features/panels/LeakPanel";
import SpelerDataPanel from "./features/panels/SpelerDataPanel";
import InventoryPanel from "./features/panels/InventoryPanel";
import ExperiencePanel from "./features/panels/ExperiencePanel";
import IrriterenPanel from "./features/panels/IrriterenPanel";
import { CircularProgress } from "@mui/material";

import Loading from "../Loading";
import SimplePopup from "../../../globaltsx/SimplePopup";
import ArmorPanel from "./features/panels/ArmorPanel";
import IServer from "../../../interfaces/IServer";
import IPopup from "../../../interfaces/IPopup";
import Background from "../../../globalscss/background/Background";
import IPlayer from "../../../interfaces/IPlayer";

function PlayerControllerPage() {
  const { serverid } = useParams();
  const [loadedPanel, setLoadedPanel] = useState<any>(null);

  const [server, setServer] = useState<IServer | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);

  useEffect(() => {
    function loadServer() {
      socket.emit("server:get", serverid, (response: IServer) => {
        setServer(response);
      });
    }
    function updateServer() {
      socket.on(`server:updated-server-${serverid}`, (data) => {
        setServer(data);
      });
    }
    function listenPopups() {
      socket.on(`feature:playerpanel-log`, (popup: IPopup) => {
        handlePopup(popup);
      });
    }
    loadServer();
    updateServer();
    listenPopups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(
    function checkServerStatus() {
      socket.on(`server:disable-server-${serverid}`, (data) => {
        setServer(data);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [server]
  );
  //Panel open
  const handleFeatureClick = (panelName: any) => {
    if (selectedPlayer !== null && server !== null) setLoadedPanel(panelName);
  };
  const handlePlayerClick = (player: IPlayer) => {
    setLoadedPanel(null);
    setSelectedPlayer(player);
    if (player === null) setLoadedPanel(null);
  };

  //POPUP SYSTEM
  const [popups, setPopUps] = useState<IPopup[]>([]);
  const handlePopup = (popup: IPopup) => {
    setPopUps((popups: any) => [...popups, popup]);
  };
  if (server !== null) {
    if (!server.state) {
      return <Loading to="/controller/servers/" />;
    } else {
      return (
        <div className="controller-container">
          <Background />
          <div className="controller-players">
            <div className="controller-players-header">
              <div className="controller-players-header-icon">
                <FaUsers style={{ color: "white" }} />
              </div>
              <div className="controller-players-header-playercount">
                {server.players_max !== undefined
                  ? server.players_online + " / " + server.players_max
                  : "- / 0"}
              </div>
              <Link
                className="controller-players-header-back"
                to={"/controller/servers/" + serverid}
              >
                Ga terug
              </Link>
            </div>
            <div className="controller-players-list">
              {server !== null ? (
                <PlayerList
                  server={server}
                  onPlayerClick={handlePlayerClick}
                  selectedPlayer={selectedPlayer}
                />
              ) : (
                <CircularProgress />
              )}
            </div>
          </div>
          <div className="controller-features">
            <FeatureButton
              title="Operator"
              description="Instellingen voor het beheren van de operator status van de speler"
              onClick={() =>
                handleFeatureClick(
                  <OperatorPanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Gamemode"
              description="Pas de gamemode aan van de speler"
              onClick={() =>
                handleFeatureClick(
                  <GamemodePanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Crash"
              description="Laat de speler zijn client crashen"
              onClick={() =>
                handleFeatureClick(
                  <CrashPanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Kick"
              description="Kick de speler van de server"
              onClick={() =>
                handleFeatureClick(
                  <KickPanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Teleport"
              description="Teleporteer de speler naar een bepaalde locatie"
              onClick={() =>
                handleFeatureClick(
                  <TeleportPanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Whitelist"
              description="Pas de whitelist status van de speler aan"
              onClick={() =>
                handleFeatureClick(
                  <WhitelistPanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Kill"
              description="Vermoord de speler"
              onClick={() =>
                handleFeatureClick(
                  <KillPanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Ban"
              description="Verban de speler van de server"
              onClick={() =>
                handleFeatureClick(
                  <BanPanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Private Message Spam"
              description="Spam de speler vol met verschillende willekeurige berichten"
              onClick={() =>
                handleFeatureClick(
                  <PMSpamPanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Leaken"
              description="Leak de gegevens van de speler zijn account"
              onClick={() =>
                handleFeatureClick(
                  <LeakPanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Irriteren"
              description="Irriteer de speler met wat toys"
              onClick={() =>
                handleFeatureClick(
                  <IrriterenPanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Speler Data"
              description="Bekijk al de informatie over de speler"
              onClick={() =>
                handleFeatureClick(
                  <SpelerDataPanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Inventory"
              description="Bekijk en pas de inventarissen van de speler aan"
              onClick={() =>
                handleFeatureClick(
                  <InventoryPanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Experience"
              description="Geef de speler experience of verwijder ze"
              onClick={() =>
                handleFeatureClick(
                  <ExperiencePanel server={server} player={selectedPlayer} />
                )
              }
            />
            <FeatureButton
              title="Armor Customizer"
              description="Pas het armor van de speler aan"
              onClick={() =>
                handleFeatureClick(
                  <ArmorPanel server={server} player={selectedPlayer} />
                )
              }
            />
          </div>
          <div className="controller-panel">
            {
              loadedPanel !== null && selectedPlayer !== null ? (
                loadedPanel //Laadt panel in
              ) : (
                <>Selecteer een speler</>
              ) //Laad panel niet in, maar geef instructie
            }
          </div>
          {popups.map((popup, i) => {
            return <SimplePopup key={i} popup={popup} />;
          })}
        </div>
      );
    }
  } else {
    return <Loading to="/controller/servers/" />;
  }
}
export default PlayerControllerPage;
