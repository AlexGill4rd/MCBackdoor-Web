import { Tooltip } from '@mui/material';
import './PanelStyle.scss';

import './LeakPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

import { FaFileUpload } from 'react-icons/fa';

function LeakPanel(props: {player: any;}){
    const [error, setError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("");

    function leakPlayer(){
        var data = {
            Player: props.player,
            Feature: "leak"
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
                Leak Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='leakpanel-container'>
                <div className='leakpanel-buttons'>
                    <Tooltip title='Leak de data van de speler in de chat' onClick={() => leakPlayer()}>
                        <div className='leakpanel-buttons-button'><FaFileUpload />Leak Speler</div>
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
export default LeakPanel;