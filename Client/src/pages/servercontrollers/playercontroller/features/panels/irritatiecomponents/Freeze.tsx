import './PaneStyle.scss';

import SpeedIcon from '@mui/icons-material/Speed';
import { useState } from 'react';

function Freeze(props: {onClick: any}){
    const [selected, setSelected] = useState<boolean>(false);

    function handleActionClick(){
        setSelected(!selected)
        props.onClick("freeze-player")
    }
    return (
        <div className="pane" onClick={handleActionClick} style={selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
            <SpeedIcon />
            <div className='pane-title'>Freeze Player</div>
            <div className='pane-description'>Zorg ervoor dat de speler niet meer kan bewegen</div>
        </div>
    );
}
export default Freeze;