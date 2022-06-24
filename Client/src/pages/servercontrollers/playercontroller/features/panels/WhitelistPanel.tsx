import { Tooltip } from '@mui/material';

import './WhitelistPanelStyle.scss';

import { socket } from '../../../../../socket/socket';

function WhitelistPanel(props: {Server: any, player: any;}){
    function handlePlayerWhitelist(state: boolean){
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "whitelist", {"Status": state});
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
            </div>
            
        </>
    );
}
export default WhitelistPanel;