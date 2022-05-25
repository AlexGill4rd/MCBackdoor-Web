import { useEffect, useState } from 'react';
import IpAddress from '../../../IpAddress';
import ServerTab from './ServerTab';

function ServerList(){
    const [servers, setServers] = useState([]);

    useEffect(() => {
        var ip = new IpAddress();
        fetch(`http://${ip.getIP()}:8080/servers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token: "6969"})
        }).then(res => res.json())
        .then(json => setServers(json));
    }, []);
    return <>{
        servers.map((server: {Image: string, Name: string, State: boolean, id: number}) => <>{
            <ServerTab 
                serverImage={server.Image} 
                serverName={server.Name} 
                serverState={server.State} 
                serverID={server.id} 
                key={server.id}
            />
        }</>)
      }</>
}
export default ServerList;