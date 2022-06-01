import { Tooltip } from '@mui/material';
import './PanelStyle.scss';

import './CrashPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

import { FaCarCrash } from 'react-icons/fa';

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
export default CrashPanel;