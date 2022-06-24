import { CircularProgress } from '@mui/material';
import './PanelStyle.scss';

import './SpelerDataPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

function SpelerDataPanel(props: {Server: any, player: any}){
    const [playerData, setPlayerData] = useState<any>(null);
    const [hearts, setHearts] = useState<any>([]);

    useEffect(() => {
        function requestPlayerData(){
            socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "data", {});
        }
        function updatePlayerInfo(){
            socket.on(`server:player-update-${props.player.UUID}`, data => {
                //SET PLAYER DATA
                setPlayerData(data);
                //RESET HEARTS LIST (IMAGES)
                setHearts([]);
                //CALCULATE HEARTS
                var fullhearts = Math.floor(Math.ceil(data.Health) / 2);
                var halfHearts = Math.ceil(data.Health) % 2;
                var heartsgone = Math.floor((20 - Math.ceil(data.Health))/2);
                //ADD AMOUNT OF HEARTS TO ARRAY
                for (var i = 0; i < fullhearts; i++)
                    setHearts((hearts: any) => [...hearts, "fullheart"])              
                for (var j = 0; j < halfHearts; j++)
                    setHearts((hearts: any) => [...hearts, "halfheart"])                           
                for (var k = 0; k < heartsgone; k++)
                    setHearts((hearts: any) => [...hearts, "emptyheart"])                      
            })
        }
        requestPlayerData();
        updatePlayerInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (playerData === null){
        return <CircularProgress />
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
                                            return <img key={index} src={process.env.PUBLIC_URL + "/icons/health/fullheart.png"} alt="Full heart" />
                                        }else if (hearttype === "halfheart"){
                                            return <img key={index} src={process.env.PUBLIC_URL + "/icons/health/halfheart.png"} alt="Half heart" />
                                        }else
                                            return <img key={index} src={process.env.PUBLIC_URL + "/icons/health/emptyheart.png"} alt="Empty heart" />
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
                </div>   
            </>
        );
    }
}
export default SpelerDataPanel;