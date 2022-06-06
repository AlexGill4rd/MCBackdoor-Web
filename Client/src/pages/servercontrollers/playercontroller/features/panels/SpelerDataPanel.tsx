import { Tooltip } from '@mui/material';
import './PanelStyle.scss';

import './SpelerDataPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

function SpelerDataPanel(props: {player: any, server: any;}){
    const [error, setError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("");

    const [playerData, setPlayerData] = useState<any>(null);
    const [hearts, setHearts] = useState<any>([]);

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
    useEffect(function requestPlayerData(){
        var data = {
            Player: props.player,
            Feature: "data",
            Servername: props.server.Address
        }
        socket.emit("client:player-data", data);
    }, []);
    useEffect(function playerDataUpdate(){
        socket.on(`server:player-data-mc`, data => {
            if (data.UUID !== props.player.UUID)return;
            setPlayerData(data);
            setHearts([]);
            var fullhearts = Math.floor(Math.ceil(data.Health) / 2);
            var halfHearts = Math.ceil(data.Health) % 2;
            var heartsgone = (20 - Math.ceil(data.Health))/2;
            for (var i = 0; i < fullhearts; i++){
                setHearts((hearts: any) => [...hearts, "fullheart"])
            }
            for (var i = 0; i < halfHearts; i++){
                setHearts((hearts: any) => [...hearts, "halfheart"])  
            }
            for (var i = 0; i < heartsgone; i++){
                setHearts((hearts: any) => [...hearts, "emptyheart"])  
            }
        })
    }, []);
    if (playerData === null){
        return <>Speler data aan het ophalen...</>
    }else{
        return (
            <>
                <div className='panel-header'>
                    Speler Data Panel - {props.player.Displayname}
                </div>
                <div className='panel-line'></div>
                <div className='spelerdata-container'>
                    <div className='spelerdata-data-subject'>
                        <span className='spelerdata-data-subject-title'>Spelernaam:</span>
                        <span>{props.player.Displayname}</span>
                    </div>
                    <div className='spelerdata-data-subject'>
                        <span className='spelerdata-data-subject-title'>Speler UUID:</span>
                        <span>{props.player.UUID}</span>
                    </div>
                    <div className='spelerdata-data-subject'>
                        <span className='spelerdata-data-subject-title'>Ip Address:</span>
                        <span>{playerData.Ip}</span>
                    </div>
                    <div className='spelerdata-data-subject'>
                        <span className='spelerdata-data-subject-title'>Operator:</span>
                        <span>{playerData.Operator ? <>Ja</> : <>Nee</>}</span>
                    </div>
                    <div className='spelerdata-data-subject'>
                        <span className='spelerdata-data-subject-title'>Health:</span>
                        <div className='spelerdata-data-subject-hearts'>
                            <div>
                                {
                                    hearts.map((hearttype: string, index: number) => {
                                        if (hearttype === "fullheart"){
                                            return <img key={index} src={process.env.PUBLIC_URL + "/icons/health/fullheart.png"} />
                                        }else if (hearttype === "halfheart"){
                                            return <img key={index} src={process.env.PUBLIC_URL + "/icons/health/halfheart.png"} />
                                        }else if (hearttype === "emptyheart"){
                                            return <img key={index} src={process.env.PUBLIC_URL + "/icons/health/emptyheart.png"} />
                                        }
                                    })
                                }
                            </div>
                            <div>{Math.ceil(playerData.Health)/2 + " Hartje(s)"}</div>
                        </div>
                    </div>
                    <div className='spelerdata-data-subject'>
                        <span className='spelerdata-data-subject-title'>Gamemode:</span>
                        <span>{playerData.Gamemode}</span>
                    </div>
                    <div className='spelerdata-data-subject'>
                        <span className='spelerdata-data-subject-title'>Location:</span>
                        <span>{playerData.Location}</span>
                    </div>
                    <div className='spelerdata-data-subject'>
                        <span className='spelerdata-data-subject-title'>World:</span>
                        <span>{playerData.World}</span>
                    </div>
                    <div className='spelerdata-data-subject'>
                        <span className='spelerdata-data-subject-title'>Server:</span>
                        <span>{playerData.Servername}</span>
                    </div>
                    {error ? 
                    <div className='message' style={{color: 'red'}}>{message}</div> :  
                     <div className='message' style={{color: "lime"}}>{message}</div>
                     }
                    
                </div>
                
            </>
        );
    }
}
export default SpelerDataPanel;