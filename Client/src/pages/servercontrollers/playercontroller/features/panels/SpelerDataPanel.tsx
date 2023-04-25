import { CircularProgress } from "@mui/material";
import "./PanelStyle.scss";

import "./SpelerDataPanelStyle.scss";

import { useEffect, useState } from "react";
import { socket } from "../../../../../socket/socket";
import IServer from "../../../../../interfaces/IServer";
import IPlayer from "../../../../../interfaces/IPlayer";

function SpelerDataPanel(props: { server: IServer; player: IPlayer | null }) {
  const [hearts, setHearts] = useState<any>([]);
  const [player, setPlayer] = useState<IPlayer | null>(props.player);

  useEffect(() => {
    function requestPlayerData() {
      socket.emit(
        "feature:player",
        socket.id,
        props.server.id,
        player?.uuid,
        "data",
        {}
      );
    }
    function updatePlayer() {
      socket.on(
        `server:player-update-${player?.uuid}`,
        (updatedPlayer: IPlayer) => {
          setPlayer(updatedPlayer);
        }
      );
    }
    updatePlayer();
    requestPlayerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (player === null) return;
    //SET PLAYER DATA
    //RESET HEARTS LIST (IMAGES)
    setHearts([]);
    //CALCULATE HEARTS
    var fullhearts = Math.floor(Math.ceil(player.health_level) / 2);
    var halfHearts = Math.ceil(player.health_level) % 2;
    var heartsgone = Math.floor((20 - Math.ceil(player.health_level)) / 2);
    //ADD AMOUNT OF HEARTS TO ARRAY
    for (var i = 0; i < fullhearts; i++)
      setHearts((hearts: any) => [...hearts, "fullheart"]);
    for (var j = 0; j < halfHearts; j++)
      setHearts((hearts: any) => [...hearts, "halfheart"]);
    for (var k = 0; k < heartsgone; k++)
      setHearts((hearts: any) => [...hearts, "emptyheart"]);
  }, [player]);
  if (player === null) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <div className="panel-header">
          Speler Data Panel - {player.displayname}
        </div>
        <div className="panel-line"></div>
        <div className="spelerdata-container">
          <div className="spelerdata-data-subject">
            <p className="spelerdata-data-subject-title">Spelernaam:</p>
            <span>{player.displayname}</span>
          </div>
          <div className="spelerdata-data-subject">
            <p className="spelerdata-data-subject-title">Speler UUID:</p>
            <span>{player.uuid}</span>
          </div>
          <div className="spelerdata-data-subject">
            <p className="spelerdata-data-subject-title">Ip Address:</p>
            <span>{player.ip_address}</span>
          </div>
          <div className="spelerdata-data-subject">
            <p className="spelerdata-data-subject-title">Operator:</p>
            <span>{player.operator_state ? <>Ja</> : <>Nee</>}</span>
          </div>
          <div className="spelerdata-data-subject">
            <p className="spelerdata-data-subject-title">Health:</p>
            <div className="spelerdata-data-subject-hearts">
              <div>
                {hearts.map((hearttype: string, index: number) => {
                  if (hearttype === "fullheart") {
                    return (
                      <img
                        key={index}
                        src={
                          process.env.PUBLIC_URL + "/icons/health/fullheart.png"
                        }
                        alt="Full heart"
                      />
                    );
                  } else if (hearttype === "halfheart") {
                    return (
                      <img
                        key={index}
                        src={
                          process.env.PUBLIC_URL + "/icons/health/halfheart.png"
                        }
                        alt="Half heart"
                      />
                    );
                  } else
                    return (
                      <img
                        key={index}
                        src={
                          process.env.PUBLIC_URL +
                          "/icons/health/emptyheart.png"
                        }
                        alt="Empty heart"
                      />
                    );
                })}
              </div>
              <div>{Math.ceil(player.health_level) / 2 + " Hartje(s)"}</div>
            </div>
          </div>
          <div className="spelerdata-data-subject">
            <p className="spelerdata-data-subject-title">Gamemode:</p>
            <span>{player.gamemode}</span>
          </div>
          <div className="spelerdata-data-subject">
            <p className="spelerdata-data-subject-title">Location:</p>
            <p>
              X: <span>{Math.round(player.location.x)} </span>Y:
              <span>{Math.round(player.location.y)} </span>
              Z: <span>{Math.round(player.location.z)}</span> <br /> World:
              <span> {player.location.world}</span>
            </p>
          </div>
          <div className="spelerdata-data-subject">
            <p className="spelerdata-data-subject-title">World:</p>
            <span>{player.location.world}</span>
          </div>
          <div className="spelerdata-data-subject">
            <p className="spelerdata-data-subject-title">Server IP:</p>
            <span>{player.server.ip_address}</span>
          </div>
        </div>
      </>
    );
  }
}
export default SpelerDataPanel;
