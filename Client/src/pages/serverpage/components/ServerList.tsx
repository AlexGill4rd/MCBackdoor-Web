import { useEffect, useState } from "react";
import { socket } from "../../../socket/socket";
import ServerTab from "./ServerTab";
import "./ServerListStyling.scss";
import { CircularProgress } from "@mui/material";
import IServer from "../../../interfaces/IServer";

function ServerList() {
  const [servers, setServers] = useState<any>([]);

  const [hostname, setHostname] = useState<string>("");

  useEffect(() => {
    function loadServers() {
      socket.emit("servers:get", (response: IServer[]) => {
        let newList = [];
        let counter = 0;
        for (let server of response) {
          if (counter >= 50) break;
          newList.push(server);
          counter++;
        }
        console.log(response);
        setServers(newList);
      });
      socket.on("servers:add", (response: IServer[]) => {
        let newList = [];
        let counter = 0;
        for (let server of response) {
          if (counter >= 50) break;
          newList.push(server);
          counter++;
        }
        setServers(newList);
      });
    }
    loadServers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputChange = (event: any) => {
    console.log(servers);
    setHostname(event.target.value);
  };

  if (servers.length > 0) {
    return (
      <div className="serverlist">
        <div className="serverlist-filtering">
          <label htmlFor="hostname">Hostname:</label>
          <input
            onChange={onInputChange}
            placeholder="Give hostname..."
            type="text"
          />
        </div>
        <div className="serverlist-list">
          {servers !== undefined ? (
            servers
              .filter((server: IServer) => server.ip_address.includes(hostname))
              .map((server: IServer, index: number) => (
                <div key={index}>{<ServerTab server={server} />}</div>
              ))
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    );
  } else
    return <div style={{ color: "gray" }}>No servers have been added...</div>;
}
export default ServerList;
