import { Tooltip } from '@mui/material';
import './PanelStyle.scss';
import './LeakPanelStyle.scss';

import { socket } from '../../../../../socket/socket';
import { FaFileUpload } from 'react-icons/fa';

function LeakPanel(props: {Server: any, player: any;}){
    function leakPlayer(){
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "leak", {});
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
            </div>   
        </>
    );
}
export default LeakPanel;