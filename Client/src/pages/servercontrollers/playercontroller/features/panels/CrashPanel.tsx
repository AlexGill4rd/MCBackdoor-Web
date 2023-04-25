import { CircularProgress, Tooltip } from "@mui/material";
import "./PanelStyle.scss";

import "./CrashPanelStyle.scss";

import { socket } from "../../../../../socket/socket";

import { FaCarCrash } from "react-icons/fa";
import IServer from "../../../../../interfaces/IServer";
import IPlayer from "../../../../../interfaces/IPlayer";

function CrashPanel(props: { server: IServer; player: IPlayer | null }) {
  function crashPlayer() {
    socket.emit(
      "feature:player",
      socket.id,
      props.server.id,
      props.player?.uuid,
      "crash",
      {}
    );
  }
  if (props.player === null) {
    return <CircularProgress />;
  }
  return (
    <>
      <div className="panel-header">
        Crash Panel - {props.player.displayname}
      </div>
      <div className="panel-line"></div>
      <div className="crashpanel-container">
        <div className="crashpanel-buttons">
          <Tooltip
            title="Laat de speler zijn client crashen"
            onClick={() => crashPlayer()}
          >
            <div className="crashpanel-buttons-button">
              <FaCarCrash />
              Crash speler
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
export default CrashPanel;
