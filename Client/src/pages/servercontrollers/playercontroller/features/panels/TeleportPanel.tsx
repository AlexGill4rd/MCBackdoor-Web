import { Tooltip } from '@mui/material';

import './TeleportPanelStyle.scss';

import socketIOClient from "socket.io-client";
import IpAddress from '../../../../../IpAddress';
import { useEffect, useRef, useState } from 'react';
var ip = new IpAddress();
let socket = socketIOClient(`http://${ip.getIP()}:3001`)

function TeleportPanel(props: {player: any, Address: string;}){
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    
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
            setError(true);
            setInfoMessage("Geef al de data in!");
            return;
        }
        var data = {
            Player: props.player,
            Feature: "teleport",
            Location: location
        }
        socket.emit("client:features-change", data);
    }
    useEffect(function listenMessages(){
        socket.on(`server:features-change-message`, data => {
            if (data.includes("fout"))setError(true);
            else setError(false);
            setInfoMessage(data);
        })
    }, []);
    useEffect(function loadWorlds(){
        socket.emit("client:mcserver-getworlds", props.Address);
    }, []);
    useEffect(function updateWorlds(){
        socket.on("server:mcserver-getworlds-list", data => {
            setWorlds(data.replace("[", "").replace("]", "").split(","));
        });
    }, []);
    useEffect(function updateActiveWorld(){
        if(worlds.length > 0) setWorld(worlds[0]);
    }, [worlds]);

    function setInfoMessage(data: string){
        setMessage(data);
        setTimeout(function(){
            if (message !== data)
                setMessage("");
        }, 5000)
    }

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
                {error ? 
                <div className='message' style={{color: 'red'}}>{message}</div> :  
                 <div className='message' style={{color: "lime"}}>{message}</div>
                 }
                
            </div>
            
        </>
    );
}
export default TeleportPanel;