import { Tooltip } from '@mui/material';
import './PanelStyle.scss';

import './KillPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

import { FaSkull } from 'react-icons/fa';

function KillPanel(props: {player: any;}){
    const [error, setError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("");
    const [deathNote, setDeathNote] = useState<string>("");


    function killPlayer(){
        var data = {
            Player: props.player,
            Feature: "kill",
            Message: deathNote
        }
        setDeathNote("");
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
    function handleDeathNoteChange (e: any) {
        setDeathNote(e.target.value);
    }
    return (
        <>
            <div className='panel-header'>
                Kill Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='killpanel-container'>
                <form className='killpanel-form'>
                        <input type="text" onChange={handleDeathNoteChange} placeholder="Geef de deathnote mee..." value={deathNote} />
                        <Tooltip title='Zet de speler zijn health op 0' onClick={() => killPlayer()}>
                            <div className='killpanel-form-button'><FaSkull style={{marginRight: 10}} />Vermoord speler</div>
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
export default KillPanel;