import { Tooltip } from '@mui/material';
import './OperatorPanelStyle.scss';
import './PanelStyle.scss';

import { socket } from '../../../../../socket/socket';

function OperatorPanel(props: {Server: any, player: any;}){
    function setPlayerOpStatus(status: boolean){
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "OP", {"Status": status});
    }
    return (
        <>
            <div className='panel-header'>
                Operator Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='operatorpanel-container'>
                <div className='operatorpanel-buttons'>
                    <Tooltip title='Geef de geselecteerde speler operator' onClick={() => setPlayerOpStatus(true)}>
                        <div className='operatorpanel-buttons-button'>Op Player</div>
                    </Tooltip>
                    <Tooltip title='Haal de operator bij de speler weg' onClick={() => setPlayerOpStatus(false)}>
                        <div className='operatorpanel-buttons-button'>Deop Player</div>
                    </Tooltip>
                </div>    
            </div>
            
        </>
    );
}
export default OperatorPanel;