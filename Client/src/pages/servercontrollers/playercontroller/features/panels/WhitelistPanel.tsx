import { CircularProgress, Tooltip } from "@mui/material";

import "./WhitelistPanelStyle.scss";

import { socket } from "../../../../../socket/socket";
import IServer from "../../../../../interfaces/IServer";
import IPlayer from "../../../../../interfaces/IPlayer";

function WhitelistPanel(props: { server: IServer; player: IPlayer | null }) {
  function handlePlayerWhitelist(state: boolean) {
    socket.emit(
      "feature:player",
      socket.id,
      props.server.id,
      props.player?.uuid,
      "whitelist",
      { Status: state }
    );
  }
  if (props.player === null) {
    return <CircularProgress />;
  }
  return (
    <>
      <div className="panel-header">
        Whitelist Panel - {props.player.displayname}
      </div>
      <div className="panel-line"></div>
      <div className="whitelistpanel-container">
        <Tooltip
          title="Whitelist de speler"
          onClick={() => handlePlayerWhitelist(true)}
        >
          <div className="whitelistpanel-form-button">Whitelist Speler</div>
        </Tooltip>
        <Tooltip
          title="Un Whitelist de speler"
          onClick={() => handlePlayerWhitelist(false)}
        >
          <div className="whitelistpanel-form-button">UnWhitelist Speler</div>
        </Tooltip>
      </div>
    </>
  );
}
export default WhitelistPanel;
