import './PaneStyle.scss';

import CachedIcon from '@mui/icons-material/Cached';
import { useState } from 'react';

function Randomteleport(props: {onClick: any}){
    const [selected, setSelected] = useState<boolean>(false);

    function handleActionClick(){
        setSelected(!selected)
        props.onClick("random-teleport")
    }
    return (
        <div className="pane" onClick={handleActionClick} style={selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
            <CachedIcon />
            <div className='pane-title'>Random Teleport</div>
            <div className='pane-description'>Teleporteer de speler naar een willekeurige locatie</div>
        </div>
    );
}
export default Randomteleport;