import { useEffect, useState } from 'react';
import { socket } from '../../../socket/socket';
import ServerTab from './ServerTab';

function ServerList(){
    const [servers, setServers] = useState<any>([]);

    useEffect(() => {
        function loadServers(){
            socket.emit("servers:request-deactive", (response: any) => {
                response.map((server:any) => (
                    setServers((servers:any) => [...servers, JSON.parse(server.JsonData)])
                ))
                socket.emit("servers:request-active");
            });
        }
        function listenActiveServers(){
            socket.on(`server:active-server`, data => {
                var newServerList:any[] = [];
                var isNewServer = true;
                servers.forEach((server:any) => {
                    if (server.id === data.id){
                        isNewServer = false;
                        newServerList.push(data)
                    }else newServerList.push(server)
                })
                if (isNewServer)
                    newServerList.push(data)
                setServers(newServerList);
            });
        }
        loadServers();
        listenActiveServers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (servers.length > 0){
        return (
            servers.map((server: any, index: number) => 
            <div key={index}>{
                <ServerTab server={server}/>
            }</div>)
        );
    }else
        return <div>Geen servers actief!</div>
}
export default ServerList;