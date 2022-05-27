import { useEffect, useState } from "react";
import Player from './Player';

import socketIOClient from "socket.io-client";
import IpAddress from "../../../../IpAddress";
var ip = new IpAddress();
let socket = socketIOClient(`http://${ip.getIP()}:3001`)

function PlayerList(props: {serverid: any, onPlayerClick: any, selectedPlayer: any;}){
    const [players, setPlayers] = useState<any>([]);

    useEffect(function loadPlayers(){
        socket.emit("client:server-player-list", props.serverid)
    }, []);
    useEffect(function updatePlayers(){
        socket.on(`server:mcserver-player-list`, data => {
            setPlayers(JSON.parse(data));
        })
    }, []);
    return (
        players.map((player: { UUID: any; Displayname: any; }) => 
            <div key={player.UUID}>
                {
                <Player 
                    player={player} 
                    onPlayerClick={props.onPlayerClick} 
                    selectedPlayer={props.selectedPlayer}
                />
                }
            </div>
        )
    );
}
export default PlayerList;