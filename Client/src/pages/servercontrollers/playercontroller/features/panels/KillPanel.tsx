import { Tooltip } from '@mui/material';

import './PanelStyle.scss';
import './KillPanelStyle.scss';

import { useState } from 'react';
import { socket } from '../../../../../socket/socket';

import { FaSkull } from 'react-icons/fa';

function KillPanel(props: {Server: any, player: any;}){
    const [deathNote, setDeathNote] = useState<string>("");
    function killPlayer(){
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "kill", {"Message": deathNote});
        setDeathNote("");
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
            </div>
            
        </>
    );
}
export default KillPanel;