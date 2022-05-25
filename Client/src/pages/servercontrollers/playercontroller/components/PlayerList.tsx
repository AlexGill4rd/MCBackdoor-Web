import { useEffect, useState } from "react";
import IpAddress from "../../../../IpAddress";
import Player from './Player';

function PlayerList(props: {server: any, activePlayer: any, onPlayerClick: any;}){
    const [players, setPlayers] = useState([]);
    useEffect(() => {
        if (props.server != null){
            var ip = new IpAddress();
            fetch(`http://${ip.getIP()}:8080/servers/${props.server.id}/players`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({serverID: props.server.id})
            }).then(res => res.json())
            .then(json => {
                setPlayers(json)
            });
        }
    }, [props.server, props.activePlayer]);

    return <>{
        players.map((player: {playerName: string}) => {
            return <Player 
                player={player} 
                key={player.playerName}
                onPlayerClick={props.onPlayerClick(player)} 
                activePlayer={props.activePlayer}
            />
        })
      }</>
}
export default PlayerList;