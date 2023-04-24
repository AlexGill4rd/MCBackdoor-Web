import { useEffect, useState } from "react";
import IServer from "../../../../interfaces/IServer";
import { socket } from "../../../../socket/socket";
import Player from "./Player";

function PlayerList(props: {
  server: IServer;
  onPlayerClick: any;
  selectedPlayer: any;
}) {
  const [players, setPlayers] = useState<any>([]);

  useEffect(() => {
    function updatePlayers() {
      socket.on(`server:get-playerlist-${props.server.id}`, (players) => {
        setPlayers(players);
      });
    }
    updatePlayers();
  }, []);
  useEffect(
    function loadPlayers() {
      console.log(props.server.id);
      socket.emit(
        "feature:server",
        socket.id,
        props.server.id,
        "playerlist",
        {}
      );
    },
    [props.server]
  );
  if (players.length <= 0) {
    return <div className="playerlist-noplayers">Geen spelers online!</div>;
  } else {
    return players.map((player: { UUID: any; Displayname: any }) => (
      <div key={player.UUID}>
        {
          <Player
            player={player}
            onPlayerClick={props.onPlayerClick}
            selectedPlayer={props.selectedPlayer}
          />
        }
      </div>
    ));
  }
}
export default PlayerList;
