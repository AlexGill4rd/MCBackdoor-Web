import './PaneStyle.scss';

import FiberNewIcon from '@mui/icons-material/FiberNew';
import { Tooltip } from '@mui/material';

function Sudo(props: {onClick: any, selected: boolean, message: string}){
    return (
        <Tooltip title={props.selected ? "Message/Command: " + props.message : ""} placement="top" disableInteractive>
            <div className="pane" onClick={() => props.onClick()} style={props.selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
                <FiberNewIcon />
                <div className='pane-title'>Sudo</div>
                <div className='pane-description'>Laat de speler een chat bericht sturen of een commando uitvoeren</div>
            </div>
        </Tooltip>
    );
}
export default Sudo;