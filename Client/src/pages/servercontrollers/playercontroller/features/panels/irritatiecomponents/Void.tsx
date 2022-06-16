import './PaneStyle.scss';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from 'react';

function Void(props: {onClick: any}){
    const [selected, setSelected] = useState<boolean>(false);

    function handleActionClick(){
        setSelected(!selected)
        props.onClick("void-player")
    }
    return (
        <div className="pane" onClick={handleActionClick} style={selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
            <ExitToAppIcon />
            <div className='pane-title'>Void</div>
            <div className='pane-description'>Verwijder al de blokken onder de speler</div>
        </div>
    );
}
export default Void;