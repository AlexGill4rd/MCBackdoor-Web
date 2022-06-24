import { Tooltip } from '@mui/material';

import './TeleportPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

function TeleportPanel(props: {Server: any, player: any}){
    const [worlds, setWorlds] = useState<any>([]);

    const [world, setWorld] = useState<string>();
    const [x, setX] = useState<number>();
    const [y, setY] = useState<number>();
    const [z, setZ] = useState<number>();


    function teleportPlayer(){
        const location = {
            World: world,
            X: x,
            Y: y,
            Z: z
        }
        if(location.World === undefined || location.X === undefined || location.Y === undefined || location.Z === undefined){
            socket.emit("feature:player-log", socket.id, "Niet al de waarden zijn ingegeven!", "warning");
            return;
        }
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "teleport", {"Location": location});
    }
    useEffect(() => {
        function requestWorlds(){
            socket.emit("feature:server", socket.id, props.Server.Servername, "world-list", {});
        }
        function updateWorlds(){
            socket.on(`server:get-worlds`, worldArray => {
                setWorlds(worldArray);
            });
        }
        requestWorlds();
        updateWorlds();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(function updateActiveWorld(){
        if(worlds.length > 0) setWorld(worlds[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [worlds]);

    //Handlers
    function handleWorldChange (e: any) {
        setWorld(e.target.value);
    }
    function handleXChange(e: any){
        setX(e.target.value)
    }
    function handleYChange(e: any){
        setY(e.target.value)
    }
    function handleZChange(e: any){
        setZ(e.target.value)
    }
    return (
        <>
            <div className='panel-header'>
                Teleport Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='teleportpanel-container'>
                <form className='teleportpanel-form'>
                    <label>World:</label>
                    <select id='world-container' name="worlds" onChange={handleWorldChange}>
                        {worlds.map(function(world: string){
                            return (<option key={world}>{world}</option>);
                        })}
                    </select>
                    <label>X Coördinaat:</label>
                    <input type="text" onChange={handleXChange} placeholder="Geef de X coördinaat" />
                    <label>Y Coördinaat:</label>
                    <input type="text" onChange={handleYChange} placeholder="Geef de Ycoördinaat" />
                    <label>Z Coördinaat:</label>
                    <input type="text" onChange={handleZChange} placeholder="Geef de Z coördinaat" />

                    <Tooltip title='Teleporteer de speler naar deze locatie' onClick={() => teleportPlayer()}>
                        <div className='teleportpanel-form-button'>Teleporteer speler</div>
                    </Tooltip>
                </form>              
            </div>
            
        </>
    );
}
export default TeleportPanel;