import { CircularProgress } from "@mui/material";
import "./PanelStyle.scss";

import "./SpelerDataPanelStyle.scss";

import { useEffect, useState } from "react";
import { socket } from "../../../../../socket/socket";
import IServer from "../../../../../interfaces/IServer";
import IPlayer from "../../../../../interfaces/IPlayer";

function SpelerDataPanel(props: { server: IServer; player: IPlayer }) {
  const [hearts, setHearts] = useState<any>([]);

  useEffect(() => {
    function requestPlayerData() {
      socket.emit(
        "feature:player",
        socket.id,
        props.server.id,
        props.player.uuid,
        "data",
        {}
      );
    }
    requestPlayerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    //SET PLAYER DATA
    //RESET HEARTS LIST (IMAGES)
    setHearts([]);
    //CALCULATE HEARTS
    var fullhearts = Math.floor(Math.ceil(props.player.health_level) / 2);
    var halfHearts = Math.ceil(props.player.health_level) % 2;
    var heartsgone = Math.floor(
      (20 - Math.ceil(props.player.health_level)) / 2
    );
    //ADD AMOUNT OF HEARTS TO ARRAY
    for (var i = 0; i < fullhearts; i++)
      setHearts((hearts: any) => [...hearts, "fullheart"]);
    for (var j = 0; j < halfHearts; j++)
      setHearts((hearts: any) => [...hearts, "halfheart"]);
    for (var k = 0; k < heartsgone; k++)
      setHearts((hearts: any) => [...hearts, "emptyheart"]);
  }, [props.player]);
  if (props.player === null) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <div className="panel-header">
          Speler Data Panel - {props.player.displayname}
        </div>
        <div className="panel-line"></div>
        <div className="spelerdata-container">
          <div className="spelerdata-data-subject">
            <span className="spelerdata-data-subject-title">Spelernaam:</span>
            <span>{props.player.displayname}</span>
          </div>
          <div className="spelerdata-data-subject">
            <span className="spelerdata-data-subject-title">Speler UUID:</span>
            <span>{props.player.uuid}</span>
          </div>
          <div className="spelerdata-data-subject">
            <span className="spelerdata-data-subject-title">Ip Address:</span>
            <span>{props.player.ip_address}</span>
          </div>
          <div className="spelerdata-data-subject">
            <span className="spelerdata-data-subject-title">Operator:</span>
            <span>{props.player.operator_state ? <>Ja</> : <>Nee</>}</span>
          </div>
          <div className="spelerdata-data-subject">
            <span className="spelerdata-data-subject-title">Health:</span>
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
              <div>
                {Math.ceil(props.player.health_level) / 2 + " Hartje(s)"}
              </div>
            </div>
          </div>
          <div className="spelerdata-data-subject">
            <span className="spelerdata-data-subject-title">Gamemode:</span>
            <span>{props.player.gamemode}</span>
          </div>
          <div className="spelerdata-data-subject">
            <span className="spelerdata-data-subject-title">Location:</span>
            <span>
              X: {props.player.location.x} Y: {props.player.location.y} Z:{" "}
              {props.player.location.z} World: X: {props.player.location.world}
            </span>
          </div>
          <div className="spelerdata-data-subject">
            <span className="spelerdata-data-subject-title">World:</span>
            <span>{props.player.location.world}</span>
          </div>
          <div className="spelerdata-data-subject">
            <span className="spelerdata-data-subject-title">Server IP:</span>
            <span>{props.player.server.ip_address}</span>
          </div>
        </div>
      </>
    );
  }
}
export default SpelerDataPanel;
