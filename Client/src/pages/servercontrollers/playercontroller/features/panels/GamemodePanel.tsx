import { Tooltip } from '@mui/material';

import './GamemodePanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

import { FaRegLightbulb } from 'react-icons/fa';
import { FaHandsHelping } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';
import { FaBaby } from 'react-icons/fa';

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
            <div className='gamemodepanel-container'>
                <div className='gamemodepanel-buttons'>
                    <Tooltip title='Verander de gamemode van de speler naar creative' onClick={() => setPlayerGamemode("creative")}>
                        <div className='gamemodepanel-buttons-button'><FaRegLightbulb />Gamemode Creative</div>
                    </Tooltip>
                    <Tooltip title='Verander de gamemode van de speler naar survival' onClick={() => setPlayerGamemode("survival")}>
                        <div className='gamemodepanel-buttons-button'><FaHandsHelping />Gamemode Survival</div>
                    </Tooltip>
                    <Tooltip title='Verander de gamemode van de speler naar spectator' onClick={() => setPlayerGamemode("spectator")}>
                        <div className='gamemodepanel-buttons-button'><FaRegEye />Gamemode Spectator</div>
                    </Tooltip>
                    <Tooltip title='Verander de gamemode van de speler naar adventure' onClick={() => setPlayerGamemode("adventure")}>
                        <div className='gamemodepanel-buttons-button'><FaBaby />Gamemode Adventure</div>
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