import { Tooltip } from '@mui/material';
import './OperatorPanelStyle.scss';
import './KickPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

function KickPanel(props: {Server: any, player: any;}){
    const [kickMessage, setKickMessage] = useState<string>("");

    function kickPlayer(message: string, e: any){
        var actionJSON = {
            Message: message
        }
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "kick", actionJSON);
        setKickMessage("");
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
            </div>
            
        </>
    );
}
export default KickPanel;