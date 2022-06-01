import { useEffect, useState } from "react";
import { socket } from "../../../../socket/socket";
import Player from './Player';

function PlayerList(props: {server: any, onPlayerClick: any, selectedPlayer: any;}){
    const [players, setPlayers] = useState<any>([]);

    useEffect(function loadPlayers(){
        socket.emit("client:server-player-list", props.server.id)
    }, []);
    useEffect(function updatePlayers(){
        socket.on(`server:mcserver-player-list`, data => {
            console.log(data);
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