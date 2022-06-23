import { Tooltip } from '@mui/material';

import './GamemodePanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

import { FaRegLightbulb } from 'react-icons/fa';
import { FaHandsHelping } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';
import { FaBaby } from 'react-icons/fa';

function GamemodePanel(props: {Server:any, player: any;}){
    function setPlayerGamemode(gamemode: string){
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "gamemode", {"Gamemode": gamemode});
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
            </div>
            
        </>
    );
}
export default GamemodePanel;