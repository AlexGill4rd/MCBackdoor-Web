import './PaneStyle.scss';

import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { useState } from 'react';

function LowHealth(props: {onClick: any}){
    const [selected, setSelected] = useState<boolean>(false);

    function handleActionClick(){
        setSelected(!selected)
        props.onClick("health-player")
    }
    return (
        <div className="pane" onClick={handleActionClick} style={selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
            <HeartBrokenIcon />
            <div className='pane-title'>Low Health</div>
            <div className='pane-description'>Zet de speler zijn health op 1</div>
        </div>
    );
}
export default LowHealth;