import { Tooltip } from '@mui/material';

import './WhitelistPanelStyle.scss';

import socketIOClient from "socket.io-client";
import IpAddress from '../../../../../IpAddress';
import { ChangeEvent, useEffect, useState } from 'react';
var ip = new IpAddress();
let socket = socketIOClient(`http://${ip.getIP()}:3001`)

function WhitelistPanel(props: {player: any;}){
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    
    const [whitelisted, setWhitelisted] = useState<boolean>(false);

    function handlePlayerWhitelist(state: boolean){
        setWhitelisted(state);
        var data = {
            Player: props.player,
            Feature: "whitelist",
            Status: whitelisted
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
                Whitelist Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='whitelistpanel-container'>
                <Tooltip title='Whitelist de speler' onClick={() => handlePlayerWhitelist(true)}>
                    <div className='whitelistpanel-form-button'>Whitelist Speler</div>
                </Tooltip>
                <Tooltip title='Un Whitelist de speler' onClick={() => handlePlayerWhitelist(false)}>
                    <div className='whitelistpanel-form-button'>UnWhitelist Speler</div>
                </Tooltip>
                {error ? 
                <div className='message' style={{color: 'red'}}>{message}</div> :  
                 <div className='message' style={{color: "lime"}}>{message}</div>
                }
                
            </div>
            
        </>
    );
}
export default WhitelistPanel;