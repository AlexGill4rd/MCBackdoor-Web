import { useEffect, useState } from 'react';
import { socket } from '../../../socket/socket';
import ServerTab from './ServerTab';

function ServerList(){
    const [servers, setServers] = useState<any>([]);

    useEffect(function loadServers(){
        socket.emit("client:get-servers")
    }, []);
    useEffect(function updateServers(){
        socket.on(`server:update-server`, data => {
            //MAKE NEW ARRAY
            var newServerList:any[] = [];

            var contained = false;
            //LOOP TO SEE IF A SERVER ALREADY EXISTS
            servers.map((server: any) => {
                if (server.Servername === data.Servername){
                    contained = true;
                    //IF THE SERVER TURN OFF, MAKE COPY OF SERVER AND CHANGE STATE. DATA IS KEPT THE SAME NOW
                    if (data.State === false){
                        var serverClone = server;
                        serverClone.State = data.State;
                        newServerList.push(serverClone);
                    }else newServerList.push(data);
                }else newServerList.push(server);
            });
            if (!contained)
                newServerList.push(data);
            //SET SERVER LIST TO NEW LIST WITH EDITED DATA
            setServers(newServerList);
        })
    }, [servers]);
    useEffect(function loadServerList(){
        socket.on(`server:server-list`, data => {
            setServers([]);
            data.map((json: any) => {
                setServers((servers: any) => [...servers, JSON.parse(json.JsonData)]);
            })        
        })
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