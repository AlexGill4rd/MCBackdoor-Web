import { CircularProgress, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { socket } from "../../../../socket/socket";

import "./PlayerStyling.scss";
import IPlayer from "../../../../interfaces/IPlayer";

function Player(props: {
  player: IPlayer;
  onPlayerClick: any;
  selectedPlayer: IPlayer | null;
}) {
  const [background, setBackground] = useState<string>("white");
  const [player, setPlayer] = useState<IPlayer>(props.player);

  useEffect(() => {
    function loadPlayerIcon() {
      socket.on(`server:player-update-${player.uuid}`, (data) => {
        setPlayer(data);
      });
    }
    function updatePlayerInfo() {
      socket.on(`server:player-update-${props.player.uuid}`, (player) => {
        setPlayer(player);
      });
    }
    updatePlayerInfo();
    loadPlayerIcon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(
    function updateBackground() {
      if (props.selectedPlayer != null) {
        if (props.selectedPlayer.displayname === player.displayname) {
          if (background === "lime") {
            setBackground("white");
            props.onPlayerClick(null);
          } else setBackground("lime");
        } else setBackground("white");
      } else setBackground("white");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [props.selectedPlayer]
  );
  function copyToClipboard(ip: string) {
    alert("Gekopieerd naar je clipboard!");
    setTimeout(
      async () => await window.navigator.clipboard.writeText(ip),
      3000
    );
  }
  function onPlayerClick() {
    if (props.selectedPlayer === player) props.onPlayerClick(null);
    else props.onPlayerClick(player);
  }
  if (player.ip_address === undefined) {
    return (
      <div
        className="playertab noselect"
        style={{ backgroundColor: background }}
        onClick={onPlayerClick}
      >
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div
        className="playertab noselect"
        style={{ backgroundColor: background }}
        onClick={onPlayerClick}
      >
        <div className="playertab-icon">
          <img src={player.favicon} alt="Player icon" />
        </div>
        <div className="playertab-verticalline">|</div>
        <Tooltip title={"UUID: " + player.uuid}>
          <div className="playertab-playername">{player.displayname}</div>
        </Tooltip>
        <div className="playertab-verticalline">|</div>
        <Tooltip title="Player operator status">
          <div className="playertab-status">
            OP: {player.operator_state === true ? <>Ja</> : <>Neen</>}
          </div>
        </Tooltip>
        <div className="playertab-verticalline">|</div>
        <Tooltip
          onClick={() => copyToClipboard(player.ip_address)}
          title={
            <div style={{ textAlign: "center" }}>
              Het publiek IP van de speler
              <br />
              Click om naar het klipbord te kopiëren
            </div>
          }
        >
          <div className="playertab-ip">Ip: {player.ip_address}</div>
        </Tooltip>
      </div>
    );
  }
}
export default Player;
