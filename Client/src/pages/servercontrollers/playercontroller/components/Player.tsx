import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import IpAddress from "../../../../IpAddress";

import './PlayerStyling.scss';

function Player(props: {player: any, onPlayerClick: any, activePlayer: any;}){
    const [playerUUID, setPlayerUUID] = useState<any>(" ");
    const [playerImage, setPlayerImage] = useState<any>();
    const [background, setBackground] = useState<string>("white");

    useEffect(() => {
        if (playerUUID === " "){
            var ip = new IpAddress();
            fetch(`http://${ip.getIP()}:8080/minecraft/player`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({playerName: props.player.playerName})
            }).then(res => res.json())
            .then(json => {
                setPlayerUUID(json.playerUUID);
                setPlayerImage(json.playerImage);            
            });
        }
        if (props.activePlayer != null){
            if (props.activePlayer.playerName === props.player.playerName){
                if (background === "lime"){
                    setBackground("white");
                    props.onPlayerClick(null)
                }else setBackground("lime");
            }else setBackground("white");
        }else setBackground("white");
        
    }, [props.activePlayer]);
    return (
        <div className="playertab" style={{backgroundColor: background}} onClick={() => props.onPlayerClick(props.player)}>
            <div className="playertab-icon"><img src={playerImage} /></div>
            <div className='playertab-verticalline'>|</div>
            <Tooltip title={"UUID: " + playerUUID}>
                <div className="playertab-playername">{props.player.playerName}</div>
            </Tooltip>
            <div className='playertab-verticalline'>|</div>
            <Tooltip title='Player operator status'>
                <div className="playertab-status">OP: {props.player.op}</div>
            </Tooltip> 
            <div className='playertab-verticalline'>|</div>
            <Tooltip title='Het publiek IP van de speler'>
                <div className="playertab-ip">Ip: {props.player.ipAddress}</div>
            </Tooltip> 
        </div>
    );
}
export default Player;