import { Button, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { socket } from '../../../../socket/socket';
import GameruleModal from './worlds/GameruleModal';
import World from './worlds/World';
import './WorldsStyle.scss';

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
function niceBytes(x: any){
    let l = 0, n = parseInt(x, 10) || 0;
    while(n >= 1024 && ++l){
        n = n/1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

function Worlds(props: {Server: any}) {
    const [worlds, setWorlds] = useState<any[]>([]);
    const [selectedWorld, setSelectedWorld] = useState<any>();

    useEffect(() => {
        function requestWorlds(){
            socket.emit("feature:server", socket.id, props.Server.Servername, "world-list", {})
        }
        function loadWorlds(){
            socket.on(`server:get-worlds`, data => {
                setWorlds(data)
            })
        }
        requestWorlds();
        loadWorlds();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (selectedWorld !== undefined){
            worlds.forEach((world: any) => {
                if (world.Worldname === selectedWorld.Worldname){
                    setSelectedWorld(world);
                    return;
                }
            })
        }
    }, [worlds]);

    //Gamerule change modal
    function handleWorldClick(world: any){
        setSelectedWorld(world);
    }
    const [gameruleModalIsOpen, setGameruleModalIsOpen] = useState<boolean>(false);
    const [editGamerule, setEditGamerule] = useState<any>(undefined);
    function handleGameruleClick(gamerule: any){
        if (props.Server.State){
            setGameruleModalIsOpen(true)
            setEditGamerule(gamerule);
        }else
            socket.emit("feature:server-log", socket.id, "Je kan geen gamerules aanpassen wanneer de server uit staat!", "error", "Server disabled");   
    }
    function sluitGameruleModal(){
        setEditGamerule(undefined);
        setGameruleModalIsOpen(false)
    }
    function handleGameruleChange(gamerule: string, value: any, world: string){
        sluitGameruleModal();
        if (props.Server.State){
            var data = {
                Gamerule: gamerule,
                Value: value,
                World: world
            }
            socket.emit("feature:server", socket.id, props.Server.Servername, "gamerule-update", data)
        } else
            socket.emit("feature:server-log", socket.id, "Je kan geen gamerules aanpassen wanneer de server uit staat!", "error", "Server disabled");   
        
    }
    function handleWorldDelete() {
        var data = {
            World: selectedWorld
        }
        socket.emit("feature:server", socket.id, props.Server.Servername, "world-delete", data)
    }
    function handleWorldDownload() {
        var data = {
            World: selectedWorld
        }
        socket.emit("feature:server", socket.id, props.Server.Servername, "world-download", data)
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
                                <label>Folder Size:</label>
                                <input readOnly type='text' value={niceBytes(selectedWorld.Size)} />
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
                            <div className='worlds-information-info'>
                                <Button 
                                    variant="contained" 
                                    sx={{
                                        width: "100%",
                                        marginTop: "10px"
                                    }}
                                    onClick={handleWorldDownload}
                                >
                                    Download World
                                </Button> 
                            </div>
                            <div className='worlds-information-info'>
                                <Button 
                                    variant="contained" 
                                    sx={{
                                        width: "100%",
                                        marginTop: "10px"
                                    }}
                                    onClick={handleWorldDelete}
                                >
                                    Delete World
                                </Button> 
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
                                    <div onClick={() => handleGameruleClick(gamerule)} key={gamerule.Gamerule} className='worlds-information-gamerules-gamerule'>
                                        <div>{gamerule.Gamerule}</div>
                                        <div>:</div>
                                        <div>{gamerule.Value.toString()}</div>
                                    </div>
                                );
                            })}
                            
                        </div>
                    </div>
                </div>
            }
            {gameruleModalIsOpen && <GameruleModal Gamerule={editGamerule} onAccept={handleGameruleChange} onCancel={sluitGameruleModal} />}
        </div>
    );
}
export default Worlds;