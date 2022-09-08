import { useEffect, useState } from 'react';
import { socket } from '../../../socket/socket';
import ServerTab from './ServerTab';

function ServerList(){
    const [servers, setServers] = useState<any>([]);

    useEffect(() => {
        async function loadServers(){
            socket.emit("servers:get", (response: any) => {
                console.log(response);
                setServers(response)
            });
        }
        loadServers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (servers.length > 0){
        return (
            servers.map((server: any, index: number) => 
            <div key={index}>{
                <ServerTab server={server.JsonData}/>
            }</div>)
        );
    }else
        return <div>Geen servers actief!</div>
}
export default ServerList;