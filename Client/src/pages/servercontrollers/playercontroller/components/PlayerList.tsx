import { useEffect, useState } from "react";
import { socket } from "../../../../socket/socket";
import Player from './Player';

function PlayerList(props: {server: any, onPlayerClick: any, selectedPlayer: any;}){
    const [players, setPlayers] = useState<any>([]);
    const [validSelected, setValidSelected] = useState<boolean>(false);

    useEffect(function loadPlayers(){
        if (props.server.Address !== undefined){
            socket.emit("client:server-player-list", props.server.Address);
        }
    }, [props.server]);
    useEffect(function updatePlayers(){
        socket.on(`server:mcserver-player-list`, data => {
            JSON.parse(data).map((player: { Displayname: any; }) => {
                if (props.selectedPlayer !== null){
                    if (player.Displayname === props.selectedPlayer.Displayname){
                        setValidSelected(true);
                    }
                }
            });
            if (!validSelected){
                props.onPlayerClick(null);
            }
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