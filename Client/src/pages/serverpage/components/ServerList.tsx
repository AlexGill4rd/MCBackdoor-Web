import { Key, useEffect, useState } from 'react';
import IpAddress from '../../../IpAddress';
import ServerTab from './ServerTab';

import socketIOClient from "socket.io-client";
import { stringify } from 'querystring';
var ip = new IpAddress();
let socket = socketIOClient(`http://${ip.getIP()}:3001/`)

function ServerList(){
    const [servers, setServers] = useState<any>([]);

    useEffect(() => {
        socket.emit("client:get-servers");
        socket.on(`server:active-server`, data => {
            setServers((servers: any) => [...servers, data]);
        })
    }, []);

    let prevServer = {
        State: false,
        Name: ""
    };
    useEffect(function updateServers(){
        socket.on(`server:server-disconnect`, data => {
            servers.map( (server: any) => {
                if (server.Name === data.Name){
                    prevServer = server;
                }         
            })
            prevServer.State = false;
            setServers((servers: any) => servers.filter((server: any) => server === prevServer.Name));
            setServers((servers: any) => [...servers, prevServer]);
        })
    });
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