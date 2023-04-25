import { CircularProgress, Tooltip } from "@mui/material";
import "./OperatorPanelStyle.scss";
import "./PanelStyle.scss";

import { socket } from "../../../../../socket/socket";
import IServer from "../../../../../interfaces/IServer";
import IPlayer from "../../../../../interfaces/IPlayer";

function OperatorPanel(props: { server: IServer; player: IPlayer | null }) {
  function setPlayerOpStatus(status: boolean) {
    socket.emit(
      "feature:player",
      socket.id,
      props.server.id,
      props.player?.uuid,
      "OP",
      { Status: status }
    );
  }
  if (props.player === null) {
    return <CircularProgress />;
  }
  return (
    <>
      <div className="panel-header">
        Operator Panel - {props.player.displayname}
      </div>
      <div className="panel-line"></div>
      <div className="operatorpanel-container">
        <div className="operatorpanel-buttons">
          <Tooltip
            title="Geef de geselecteerde speler operator"
            onClick={() => setPlayerOpStatus(true)}
          >
            <div className="operatorpanel-buttons-button">Op Player</div>
          </Tooltip>
          <Tooltip
            title="Haal de operator bij de speler weg"
            onClick={() => setPlayerOpStatus(false)}
          >
            <div className="operatorpanel-buttons-button">Deop Player</div>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
export default OperatorPanel;
