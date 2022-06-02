import { Tooltip } from '@mui/material';
import './PanelStyle.scss';

import './InventoryPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

import { FaCarCrash } from 'react-icons/fa';

function InventoryPanel(props: {player: any, server: any;}){
    const [error, setError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("");

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

    useEffect(function loadInventories(){
        var data = {
            Player: props.player,
            Feature: "inventory",
            Servername: props.server.Address
        }
        socket.emit("client:features-change", data);
    })

    return (
        <>
            <div className='panel-header'>
                Crash Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='crashpanel-container'>
                <div className='crashpanel-buttons'>
                    <Tooltip title='Laat de speler zijn client crashen' onClick={() => crashPlayer()}>
                        <div className='crashpanel-buttons-button'><FaCarCrash />Crash speler</div>
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
export default InventoryPanel;