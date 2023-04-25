import { CircularProgress, Tooltip } from "@mui/material";

import "./GamemodePanelStyle.scss";

import { socket } from "../../../../../socket/socket";

import { FaRegLightbulb } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaBaby } from "react-icons/fa";
import IServer from "../../../../../interfaces/IServer";
import IPlayer from "../../../../../interfaces/IPlayer";

function GamemodePanel(props: { server: IServer; player: IPlayer | null }) {
  function setPlayerGamemode(gamemode: string) {
    socket.emit(
      "feature:player",
      socket.id,
      props.server.id,
      props.player?.uuid,
      "gamemode",
      { Gamemode: gamemode }
    );
  }
  if (props.player === null) {
    return <CircularProgress />;
  }
  return (
    <>
      <div className="panel-header">
        Gamemode Panel - {props.player.displayname}
      </div>
      <div className="panel-line"></div>
      <div className="gamemodepanel-container">
        <div className="gamemodepanel-buttons">
          <Tooltip
            title="Verander de gamemode van de speler naar creative"
            onClick={() => setPlayerGamemode("creative")}
          >
            <div className="gamemodepanel-buttons-button">
              <FaRegLightbulb />
              Gamemode Creative
            </div>
          </Tooltip>
          <Tooltip
            title="Verander de gamemode van de speler naar survival"
            onClick={() => setPlayerGamemode("survival")}
          >
            <div className="gamemodepanel-buttons-button">
              <FaHandsHelping />
              Gamemode Survival
            </div>
          </Tooltip>
          <Tooltip
            title="Verander de gamemode van de speler naar spectator"
            onClick={() => setPlayerGamemode("spectator")}
          >
            <div className="gamemodepanel-buttons-button">
              <FaRegEye />
              Gamemode Spectator
            </div>
          </Tooltip>
          <Tooltip
            title="Verander de gamemode van de speler naar adventure"
            onClick={() => setPlayerGamemode("adventure")}
          >
            <div className="gamemodepanel-buttons-button">
              <FaBaby />
              Gamemode Adventure
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
export default GamemodePanel;
