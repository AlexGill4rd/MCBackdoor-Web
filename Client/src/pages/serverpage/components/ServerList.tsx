import { Key, useEffect, useState } from 'react';
import IpAddress from '../../../IpAddress';
import ServerTab from './ServerTab';

import socketIOClient from "socket.io-client";
var ip = new IpAddress();
let socket = socketIOClient(`http://${ip.getIP()}:3001`)

function ServerList(){
    const [servers, setServers] = useState<any>([]);

    useEffect(() => {
        socket.emit("client:get-server");
        socket.on(`server:active-server`, data => {
            data.id = servers.length;
            setServers([...servers, data]);
        })
    }, []);
    return (
        servers.map((server: {id: number}) => 
        <div key={server.id}>{
            <ServerTab server={server}/>
        }</div>)
    );
}
export default ServerList;