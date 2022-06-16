import './PaneStyle.scss';

import NoFoodIcon from '@mui/icons-material/NoFood';
import { useState } from 'react';

function ResetFoodLevel(props: {onClick: any}){
    const [selected, setSelected] = useState<boolean>(false);

    function handleActionClick(){
        setSelected(!selected)
        props.onClick("reset-food")
    }
    return (
        <div className="pane" onClick={handleActionClick} style={selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
            <NoFoodIcon />
            <div className='pane-title'>Reset Food</div>
            <div className='pane-description'>Zet het foodlevel van de speler op 0</div>
        </div>
    );
}
export default ResetFoodLevel;