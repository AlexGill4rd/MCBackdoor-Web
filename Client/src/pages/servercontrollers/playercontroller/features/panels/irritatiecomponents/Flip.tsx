import './PaneStyle.scss';

import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import { useState } from 'react';

function Flip(props: {onClick: any}){
    const [selected, setSelected] = useState<boolean>(false);

    function handleActionClick(){
        setSelected(!selected)
        props.onClick("flip-player")
    }
    return (
        <div className="pane" onClick={handleActionClick} style={selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
            <ThreeSixtyIcon />
            <div className='pane-title'>Draai de speler</div>
            <div className='pane-description'>Draai de speler voor 180° om zijn X-as</div>
        </div>
    );
}
export default Flip;