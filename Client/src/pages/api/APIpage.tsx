import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../socket/socket";

function APIpage() {
    const { requestHeader } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [servers, setServers] = useState<any[]>([]);

    useEffect(() => {
        socket.emit("servers:get", (response: any) => {
            setIsLoaded(true);
            console.log(response)
            setServers(response)
        });
    }, [])

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {servers.map((server: any) => (
            <li key={server.id}>
              {server.id}
            </li>
          ))}
        </ul>
      );
    }
}
export default APIpage;