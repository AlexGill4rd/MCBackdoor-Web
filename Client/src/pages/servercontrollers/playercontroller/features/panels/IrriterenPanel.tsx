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

function IrriterenPanel(props: {player: any;}){
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [experience, setExperience] = useState<number>(0);

    const [actions, setActions] = useState<any[]>([]);

    //INISIALISATION
    function sendActions(){
        var data = {
            Player: props.player,
            Feature: "irriteren",
            Actions: actions
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
    function selectAction(action: string){
        if (actions.includes(action))
            setActions(actions.filter((action: any) => action !== action))
        else
            setActions((actions: any) => [...actions, action]);
    }
    useEffect(() => {
        console.log(actions)
    }, [actions])
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
                        <Sudo onClick={selectAction} />
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
            </div>
            
        </>
    );
}
export default IrriterenPanel;