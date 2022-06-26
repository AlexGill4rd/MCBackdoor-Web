import { Tooltip } from '@mui/material';
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        <World key={world.UUID} World={world} onSelect={handleWorldClick} />
                    );
                })}
            </div>

            {selectedWorld && 
                <div className='worlds-information'>
                    <div className='worlds-information-left'>
                        <label>Server Data</label>
                        <div className='worlds-information-data'>
                            <div className='worlds-information-info'>
                                <label>Servername:</label>
                                <input readOnly type='text' value={selectedWorld.Worldname} />
                            </div>
                            <div className='worlds-information-info'>
                                <label>Seed:</label>
                                <input readOnly type='text' value={selectedWorld.Seed} />
                            </div>
                            <div className='worlds-information-info'>
                                <label>Difficulty:</label>
                                <input readOnly type='text' value={selectedWorld.Difficulty} />
                            </div>
                            <div className='worlds-information-info'>
                                <label>Times:</label>
                                <input readOnly type='text' value={selectedWorld.FullTime + " Fulltime"} />
                                <input readOnly type='text' value={selectedWorld.Time + " Time"} />
                                <input readOnly type='text' value={selectedWorld.Gametime + " Gametime"} />
                            </div>
                            <div className='worlds-information-info'>
                                <label>ViewDistance:</label>
                                <input readOnly type='text' value={selectedWorld.ViewDistance} />
                            </div>
                            <div className='worlds-information-info'>
                                <label>MaxHeight:</label>
                                <input readOnly type='text' value={selectedWorld.MaxHeight} />
                            </div>
                            <div className='worlds-information-info'>
                                <label>MinHeight:</label>
                                <input readOnly type='text' value={selectedWorld.MinHeight} />
                            </div>
                            <div className='worlds-information-info'>
                                <label>UUID:</label>
                                <input readOnly type='text' value={selectedWorld.UUID} />
                            </div>
                        </div>
                    </div>
                    <div className='worlds-information-middle'>
                        <label>Players</label>
                        <div className='worlds-information-players'>
                            {selectedWorld.Players.map((player: any) => {
                                return (
                                    <div key={player.UUID} className='worlds-information-players-player'>
                                        <Tooltip title={"UUID: " + player.UUID} placement="top" disableInteractive>
                                            <span>{player.Displayname}</span>
                                        </Tooltip>
                                    </div>
                                );
                            })}
                            
                        </div>
                    </div>
                    <div className='worlds-information-right'>
                        <label>Gamerules</label>
                        <div className='worlds-information-gamerules'>
                            {selectedWorld.Gamerules.map((gamerule: any) => {
                                return (
                                    <span key={gamerule} className='worlds-information-gamerules-gamerule'>{gamerule}</span>
                                );
                            })}
                            
                        </div>
                    </div>
                </div>
            }
    
        </div>
    );
}
export default Worlds;