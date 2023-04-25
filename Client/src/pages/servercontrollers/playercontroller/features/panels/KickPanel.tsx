import { CircularProgress, Tooltip } from "@mui/material";

import "./PanelStyle.scss";
import "./KickPanelStyle.scss";

import { useState } from "react";
import { socket } from "../../../../../socket/socket";
import IServer from "../../../../../interfaces/IServer";
import IPlayer from "../../../../../interfaces/IPlayer";

function KickPanel(props: { server: IServer; player: IPlayer | null }) {
  const [kickMessage, setKickMessage] = useState<string>("");

  function kickPlayer(message: string, e: any) {
    var actionJSON = {
      Message: message,
    };
    socket.emit(
      "feature:player",
      socket.id,
      props.server.id,
      props.player?.uuid,
      "kick",
      actionJSON
    );
    setKickMessage("");
  }
  function handleMessageChange(e: any) {
    setKickMessage(e.target.value);
  }
  if (props.player === null) {
    return <CircularProgress />;
  }
  return (
    <>
      <div className="panel-header">
        Kick Panel - {props.player.displayname}
      </div>
      <div className="panel-line"></div>
      <div className="kickpanel-container">
        <form className="kickpanel-form">
          <input
            type="text"
            onChange={handleMessageChange}
            placeholder="Geef het kick bericht..."
            value={kickMessage}
          />
          <Tooltip
            title="Laat de speler zijn client crashen"
            onClick={(e) => kickPlayer(kickMessage, e)}
          >
            <div className="kickpanel-form-button">Kick de speler</div>
          </Tooltip>
        </form>
      </div>
    </>
  );
}
export default KickPanel;
