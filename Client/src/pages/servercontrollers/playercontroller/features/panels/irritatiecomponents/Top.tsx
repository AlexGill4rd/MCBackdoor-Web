import './PaneStyle.scss';

import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useState } from 'react';

function Top(props: {onClick: any}){
    const [selected, setSelected] = useState<boolean>(false);

    function handleActionClick(){
        setSelected(!selected)
        props.onClick("top-player")
    }
    return (
        <div className="pane" onClick={handleActionClick} style={selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
            <FlightTakeoffIcon />
            <div className='pane-title'>Teleport Up</div>
            <div className='pane-description'>Laat de speler de wolken eens van dichtbij zien</div>
        </div>
    );
}
export default Top;