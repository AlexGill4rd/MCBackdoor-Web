import { useEffect, useState } from 'react';
import IpAddress from '../../../IpAddress';
import { socket } from '../../../socket/socket';
import ServerTab from './ServerTab';

function ServerList(){
    const [servers, setServers] = useState<any>([]);

    useEffect(function loadServers(){
        var ip = new IpAddress();
        fetch(`http://${ip.getIP()}:8080/servers/get`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token: "6969"})
        }).then(res => res.json())
        .then(json => setServers(json));
    }, []);
    useEffect(function updateServers(){
        socket.on(`server:update-servers`, data => {
            var ip = new IpAddress();
            fetch(`http://${ip.getIP()}:8080/servers/get`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({token: "6969"})
            }).then(res => res.json())
            .then(json => setServers(json));
        })
    }, []);
    if (servers.length > 0){
        return (
            servers.map((server: {id: number}) => 
            <div key={server.id}>{
                <ServerTab server={server}/>
            }</div>)
        );
    }else{
        return <div>Geen servers actief!</div>
    }
}
export default ServerList;