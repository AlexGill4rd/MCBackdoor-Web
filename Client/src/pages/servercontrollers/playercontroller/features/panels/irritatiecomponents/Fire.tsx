import './PaneStyle.scss';

import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useState } from 'react';

function Fire(props: {onClick: any}){
    const [selected, setSelected] = useState<boolean>(false);

    function handleActionClick(){
        setSelected(!selected)
        props.onClick("fire-player")
    }
    return (
        <div className="pane" onClick={handleActionClick} style={selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
            <LocalFireDepartmentIcon />
            <div className='pane-title'>Fire Player</div>
            <div className='pane-description'>Steek de speler in vluur en vlam</div>
        </div>
    );
}
export default Fire;