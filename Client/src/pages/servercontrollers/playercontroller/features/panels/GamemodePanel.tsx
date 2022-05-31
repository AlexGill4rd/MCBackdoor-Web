import { Tooltip } from '@mui/material';
import './OperatorPanelStyle.scss';
import './PanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

function GamemodePanel(props: {player: any;}){
    const [error, setError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("");

    function setPlayerGamemode(gamemode: string){
        var data = {
            Player: props.player,
            Feature: "gamemode",
            Gamemode: gamemode
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
    return (
        <>
            <div className='panel-header'>
                Gamemode Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='operatorpanel-container'>
                <div className='operatorpanel-buttons'>
                    <Tooltip title='Verander de gamemode van de speler naar creative' onClick={() => setPlayerGamemode("creative")}>
                        <div className='operatorpanel-buttons-button'>Gamemode Creative</div>
                    </Tooltip>
                    <Tooltip title='Verander de gamemode van de speler naar survival' onClick={() => setPlayerGamemode("survival")}>
                        <div className='operatorpanel-buttons-button'>Gamemode Survival</div>
                    </Tooltip>
                    <Tooltip title='Verander de gamemode van de speler naar spectator' onClick={() => setPlayerGamemode("spectator")}>
                        <div className='operatorpanel-buttons-button'>Gamemode Spectator</div>
                    </Tooltip>
                    <Tooltip title='Verander de gamemode van de speler naar adventure' onClick={() => setPlayerGamemode("adventure")}>
                        <div className='operatorpanel-buttons-button'>Gamemode Adventure</div>
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
export default GamemodePanel;