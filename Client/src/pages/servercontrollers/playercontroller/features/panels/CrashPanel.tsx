import { Tooltip } from '@mui/material';
import './PanelStyle.scss';

import './CrashPanelStyle.scss';

import { socket } from '../../../../../socket/socket';

import { FaCarCrash } from 'react-icons/fa';

function CrashPanel(props: {Server: any, player: any;}){
    function crashPlayer(){
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "crash", {});
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
            </div>      
        </>
    );
}
export default CrashPanel;