import { Tooltip } from '@mui/material';
import './OperatorPanelStyle.scss';
import './KickPanelStyle.scss';

import socketIOClient from "socket.io-client";
import IpAddress from '../../../../../IpAddress';
import { ChangeEvent, useEffect, useState } from 'react';
var ip = new IpAddress();
let socket = socketIOClient(`http://${ip.getIP()}:3001`)

function KickPanel(props: {player: any;}){
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [kickMessage, setKickMessage] = useState<string>("");

    function kickPlayer(message: string, e: any){
        var data = {
            Player: props.player,
            Feature: "kick",
            Message: message
        }
        setKickMessage("");
        socket.emit("client:features-change", data);
    }
    useEffect(function listenMessages(){
        socket.on(`server:features-change-message`, data => {
            if (data.includes("fout"))setError(true);
            else setError(false);
            setInfoMessage(data);
        })
    }, []);
    function setInfoMessage(data: string){
        setMessage(data);
        setTimeout(function(){
            if (message !== data)
                setMessage("");
        }, 5000)
    }
    function handleMessageChange (e: any) {
        setKickMessage(e.target.value)
    }
    return (
        <>
            <div className='panel-header'>
                Kick Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='kickpanel-container'>
                <form className='kickpanel-form'>
                    <input type="text" onChange={handleMessageChange} placeholder="Geef het kick bericht..." value={kickMessage} />
                    <Tooltip title='Laat de speler zijn client crashen' onClick={(e) => kickPlayer(kickMessage, e)}>
                        <div className='kickpanel-form-button'>Kick de speler</div>
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
export default KickPanel;