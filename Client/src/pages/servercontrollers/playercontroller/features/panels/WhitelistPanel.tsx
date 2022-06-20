import { Tooltip } from '@mui/material';

import './WhitelistPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

function WhitelistPanel(props: {player: any;}){
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    function handlePlayerWhitelist(state: boolean){
        var data = {
            Player: props.player,
            Feature: "whitelist",
            Status: state
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