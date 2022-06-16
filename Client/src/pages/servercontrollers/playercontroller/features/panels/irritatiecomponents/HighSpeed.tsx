import './PaneStyle.scss';

import SpeedIcon from '@mui/icons-material/Speed';
import { useState } from 'react';

function HighSpeed(props: {onClick: any}){
    const [selected, setSelected] = useState<boolean>(false);

    function handleActionClick(){
        setSelected(!selected)
        props.onClick("speed-player")
    }
    return (
        <div className="pane" onClick={handleActionClick} style={selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
            <SpeedIcon />
            <div className='pane-title'>High Speed</div>
            <div className='pane-description'>Zet de speler snelheid naar maximum voor 5 seconden</div>
        </div>
    );
}
export default HighSpeed;