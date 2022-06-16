import { Button, Tooltip } from '@mui/material';

import './IrriterenPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';
import Randomteleport from './irritatiecomponents/RandomTeleport';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ResetFoodLevel from './irritatiecomponents/ResetFoodLevel';
import WebSpawn from './irritatiecomponents/WebSpawn';
import HighSpeed from './irritatiecomponents/HighSpeed';
import Earrape from './irritatiecomponents/Earrape';
import Fire from './irritatiecomponents/Fire';
import Freeze from './irritatiecomponents/Freeze';
import Flip from './irritatiecomponents/Flip';
import LowHealth from './irritatiecomponents/LowHealth';
import Sudo from './irritatiecomponents/Sudo';
import Top from './irritatiecomponents/Top';
import Void from './irritatiecomponents/Void';
import Vanish from './irritatiecomponents/Vanish';
import SudoModal from './irritatiecomponents/Modals/SudoModal';

function IrriterenPanel(props: {player: any;}){
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const [actions, setActions] = useState<any[]>([]);

    //INISIALISATION
    function sendActions(){
        var data = {
            Player: props.player,
            Feature: "irriteren",
            Actions: actions,
            SudoCommand: ""
        }
        if (sudoMessage !== ""){
            data.SudoCommand = sudoMessage;
        }
        socket.emit("client:features-change", data);
    }
    useEffect(function listenMessages(){
        socket.on(`server:features-change-message`, data => {
            if (data.includes("fout"))setError(true);
            else setError(false);
            setInfoMessage(data);
        })
    }, []);
    function setInfoMessage(data: string){
        setMessage(data);
        setTimeout(function(){
            if (message !== data)
                setMessage("");
        }, 5000)
    }

    //FUNCTIONS
    function selectAction(actionString: string){
        if (actions.includes(actionString))
            setActions(actions.filter((action: any) => action !== actionString))
        else
            setActions((actions: any) => [...actions, actionString]);
    }

    //SUDO FUNCTIONS
    const [sudoModalOpen, setSudoModalOpen] = useState<boolean>(false);
    const [sudoSelected, setSudoSelected] = useState<boolean>(false);
    const [sudoMessage, setSudoMessage] = useState<string>("");

    function handleSudoClick(){
        if (sudoMessage !== ""){
            setSudoMessage("");
            setSudoSelected(false);
            selectAction("sudo-player");
        }else
            setSudoModalOpen(true);
    }
    function handleSetCommand(command: string){
        setSudoMessage(command);
        setSudoSelected(true);
        setSudoModalOpen(false);
        selectAction("sudo-player");
    }
    function handleModalClose(){
        setSudoModalOpen(false);
        setSudoSelected(false);
    }
    return (
        <>
            <div className='panel-header'>
                Irritatie Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='annoy-container'>
                <div className='annoy-items'>
                    <div className='annoy-items-list'>
                        <Randomteleport onClick={selectAction} />
                        <ResetFoodLevel onClick={selectAction} />
                        <Flip onClick={selectAction} />
                        <WebSpawn onClick={selectAction} />
                        <HighSpeed onClick={selectAction} />
                        <Earrape onClick={selectAction} />
                        <Fire onClick={selectAction} />
                        <Freeze onClick={selectAction} />
                        <LowHealth onClick={selectAction} />
                        <Sudo onClick={handleSudoClick} selected={sudoSelected} message={sudoMessage} />
                        <Top onClick={selectAction} />
                        <Void onClick={selectAction} />
                        <Vanish onClick={selectAction} />
                    </div>
                    <Tooltip title={"Voer al de geslecteerde acties uit!"}>
                        <Button onClick={sendActions} variant="contained" startIcon={<ArrowForwardIcon />}>
                            Voer acties uit
                        </Button>
                    </Tooltip>
                </div>
                {error ? 
                <div className='message' style={{color: 'red'}}>{message}</div> :  
                 <div className='message' style={{color: "lime"}}>{message}</div>
                 }
                 {sudoModalOpen && <SudoModal onAccept={handleSetCommand} onCancel={handleModalClose} />}
            </div>
            
        </>
    );
}
export default IrriterenPanel;