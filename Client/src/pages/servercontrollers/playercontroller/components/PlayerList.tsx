import { useEffect, useState } from "react";
import { socket } from "../../../../socket/socket";
import Player from './Player';

function PlayerList(props: {server: any, onPlayerClick: any, selectedPlayer: any;}){
    const [players, setPlayers] = useState<any>([]);

    useEffect(function loadPlayers(){
        socket.emit("feature:server", socket.id, props.server.Servername, "playerlist", {})
    }, [props.server]);
    useEffect(function updatePlayers(){
        socket.on(`server:get-playerlist`, players => {
            setPlayers(players);
        })
    }, []);
    if (players.length <= 0){
        return ("Geen spelers online!")
    }else{
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
}
export default PlayerList;