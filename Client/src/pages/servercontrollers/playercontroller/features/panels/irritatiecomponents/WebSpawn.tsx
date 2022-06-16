import './PaneStyle.scss';

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useState } from 'react';

function WebSpawn(props: {onClick: any}){
    const [selected, setSelected] = useState<boolean>(false);

    function handleActionClick(){
        setSelected(!selected)
        props.onClick("web-player")
    }
    return (
        <div className="pane" onClick={handleActionClick} style={selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
            <AutoFixHighIcon />
            <div className='pane-title'>Spawn web</div>
            <div className='pane-description'>Spawn een web aan de voeten van de speler</div>
        </div>
    );
}
export default WebSpawn;