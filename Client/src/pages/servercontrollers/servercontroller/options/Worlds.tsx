import { useEffect, useState } from 'react';
import { socket } from '../../../../socket/socket';
import World from './worlds/World';
import './WorldsStyle.scss';

function Worlds(props: {Server: any}) {
    const [worlds, setWorlds] = useState<any[]>([]);

    useEffect(() => {
        function requestWorlds(){
            socket.emit("feature:server", socket.id, props.Server.Servername, "world-list", {})
        }
        function loadWorlds(){
            socket.on(`server:get-worlds`, data => {
                console.log(data);
                setWorlds(data)
            })
        }
        requestWorlds();
        loadWorlds();
    }, []);

    const [selectedWorld, setSelectedWorld] = useState<any>(undefined);
    function handleWorldClick(world: any){
        setSelectedWorld(world);
    }

    return (
        <div className='worlds'>
            <div className='worlds-header'>
                <span>Server Worlds</span>
            </div>
            <div className='worlds-container'>
                {worlds.map((world: any) => {
                    return (
                        <World World={world} onSelect={handleWorldClick} />
                    );
                })}
            </div>

            {selectedWorld && 
                <div className='worlds-information'>
                    <span>World Name: {selectedWorld.Worldname}</span>
                    <span>Seed: {selectedWorld.Seed}</span>
                    <span>Difficulty: {selectedWorld.Difficulty}</span>
                    <span>Entities: {selectedWorld.Entities}</span>
                    <span>FullTime: {selectedWorld.FullTime}</span>
                    <span>Gamerules: {selectedWorld.Gamerules}</span>
                    <span>Gametime: {selectedWorld.Gametime}</span>
                    <span>Active players:</span>
                    {selectedWorld.Players.map((player: any) => {
                        return (<span>- {player.Displayname}</span>);
                    })}
                    <span>Time: {selectedWorld.Time}</span>
                    <span>ViewDistance: {selectedWorld.ViewDistance}</span>
                    <span>MaxHeight: {selectedWorld.MaxHeight}</span>
                    <span>MinHeight: {selectedWorld.MinHeight}</span>
                    <span>UUID: {selectedWorld.UUID}</span>
                </div>
            }
    
        </div>
    );
}
export default Worlds;