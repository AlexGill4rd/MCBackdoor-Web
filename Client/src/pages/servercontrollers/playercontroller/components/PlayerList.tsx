import { useEffect, useState } from "react";
import IServer from "../../../../interfaces/IServer";
import { socket } from "../../../../socket/socket";
import Player from "./Player";
import IPlayer from "../../../../interfaces/IPlayer";

export default function PlayerList(props: {
  server: IServer;
  onPlayerClick: any;
  selectedPlayer: IPlayer | null;
}) {
  const [players, setPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    function updatePlayers() {
      socket.on(`server:get-playerlist-${props.server.id}`, (players) => {
        setPlayers(players);
        console.log(players);
      });
    }
    function loadPlayers() {
      socket.emit(
        "feature:server",
        socket.id,
        props.server.id,
        "playerlist",
        {}
      );
    }
    loadPlayers();
    updatePlayers();
  }, []);

  if (players.length <= 0) {
    return (
      <div className="playerlist-noplayers">
        There are currently no players online
      </div>
    );
  } else {
    return (
      <div>
        {players.map((player: IPlayer) => {
          return (
            <div key={player.uuid}>
              {
                <Player
                  player={player}
                  onPlayerClick={props.onPlayerClick}
                  selectedPlayer={props.selectedPlayer}
                />
              }
            </div>
          );
        })}
      </div>
    );
  }
}
