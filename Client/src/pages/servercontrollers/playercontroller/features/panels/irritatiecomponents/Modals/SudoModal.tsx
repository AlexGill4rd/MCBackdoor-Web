import { useState } from 'react';
import './SudoModalStyle.scss';

function SudoModal(props: {onAccept: any, onCancel: any;}){

    const [command, setCommand] = useState<string>("");

    function handleCommandChange(e: any){
        setCommand(e.target.value);
    }
    return (
        <div className='sudomodal'>
            <div className='sudomodal-backdrop' onClick={() => props.onCancel()}></div>

            <div className='sudomodal-menu'>
                <div className='sudomodal-menu-title'>Geef het commando of message</div>
                <input type="text" onChange={handleCommandChange} placeholder="Geef het commando in..." value={command} />
            </div>
        </div>
    );
}
export default SudoModal;