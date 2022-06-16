import './PaneStyle.scss';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from 'react';

function Vanish(props: {onClick: any}){
    const [selected, setSelected] = useState<boolean>(false);

    function handleActionClick(){
        setSelected(!selected)
        props.onClick("vanish-player")
    }
    return (
        <div className="pane" onClick={handleActionClick} style={selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
            <ExitToAppIcon />
            <div className='pane-title'>Vanish</div>
            <div className='pane-description'>Maak de speler onzichtbaar</div>
        </div>
    );
}
export default Vanish;