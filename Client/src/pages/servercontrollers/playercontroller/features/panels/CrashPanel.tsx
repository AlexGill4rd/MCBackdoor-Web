import { Tooltip } from '@mui/material';
import './OperatorPanelStyle.scss';
import './PanelStyle.scss';

import socketIOClient from "socket.io-client";
import IpAddress from '../../../../../IpAddress';
import { useEffect, useState } from 'react';
var ip = new IpAddress();
let socket = socketIOClient(`http://${ip.getIP()}:3001`)

function CrashPanel(props: {player: any;}){
    const [error, setError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("");

    function crashPlayer(){
        var data = {
            Player: props.player,
            Feature: "crash"
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
    function setInfoMessage(data: string){
        setMessage(data);
        setTimeout(function(){
            if (message !== data)
                setMessage("");
        }, 5000)
    }
    return (
        <>
            <div className='panel-header'>
                Gamemode Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='operatorpanel-container'>
                <div className='operatorpanel-buttons'>
                    <Tooltip title='Laat de speler zijn client crashen' onClick={() => crashPlayer()}>
                        <div className='operatorpanel-buttons-button'>Crash speler</div>
                    </Tooltip>
                </div>
                {error ? 
                <div className='message' style={{color: 'red'}}>{message}</div> :  
                 <div className='message' style={{color: "lime"}}>{message}</div>
                 }
                
            </div>
            
        </>
    );
}
export default CrashPanel;