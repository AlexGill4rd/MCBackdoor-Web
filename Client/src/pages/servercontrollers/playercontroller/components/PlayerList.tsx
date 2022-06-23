import { useEffect, useState } from "react";
import { socket } from "../../../../socket/socket";
import Player from './Player';

function PlayerList(props: {server: any, onPlayerClick: any, selectedPlayer: any;}){
    const [players, setPlayers] = useState<any>([]);
    const [validSelected, setValidSelected] = useState<boolean>(false);

    useEffect(function updatePlayers(){
        socket.on(`server:get-playerlist-${props.server.Servername}`, players => {
            console.log(players);
            players.map((player: any) => {
                if (props.selectedPlayer !== null){
                    if (player.Displayname === props.selectedPlayer.Displayname){
                        setValidSelected(true);
                    }
                }

            });
            if (!validSelected){
                props.onPlayerClick(null);
            }
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