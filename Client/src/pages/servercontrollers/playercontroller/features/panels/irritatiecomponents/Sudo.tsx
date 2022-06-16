import './PaneStyle.scss';

import FiberNewIcon from '@mui/icons-material/FiberNew';
import { useEffect, useState } from 'react';
import SudoModal from './Modals/SudoModal';

function Sudo(props: {onClick: any}){
    const [selected, setSelected] = useState<boolean>(false);

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    function handleActionClick(){
        if (selected)
            setSelected(false)
        else
            setModalIsOpen(true);     
    }
    function handleCancel(){
        setModalIsOpen(false);
        setSelected(false);
    }
    useEffect(() => {
    }, [modalIsOpen])
    function handleAccept(){
        setModalIsOpen(false);
        setSelected(true);
        props.onClick("sudo-player", message);
    }
    return (
        <div className="pane" onClick={handleActionClick} style={selected ? {backgroundColor:"green"} : {backgroundColor:"#3180E8"}}>
            <FiberNewIcon />
            <div className='pane-title'>Sudo</div>
            <div className='pane-description'>Laat de speler een chat bericht sturen of een commando uitvoeren</div>
            {modalIsOpen && <SudoModal onAccept={handleAccept} onCancel={handleCancel} />}
        </div>
    );
}
export default Sudo;