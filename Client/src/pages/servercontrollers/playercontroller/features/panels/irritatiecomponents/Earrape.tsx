import './PaneStyle.scss';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useState } from 'react';

function Earrape(props: {onClick: any}){
    const [selected, setSelected] = useState<boolean>(false);

    function handleActionClick(){
        setSelected(!selected)
        props.onClick("earrape-player")
    }
    return (
        <div className="pane" onClick={handleActionClick} style={selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
            <VolumeUpIcon />
            <div className='pane-title'>Earrape</div>
            <div className='pane-description'>Speelt fucking hard geluid af</div>
        </div>
    );
}
export default Earrape;