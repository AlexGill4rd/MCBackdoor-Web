import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import IpAddress from "../../../../IpAddress";

import './PlayerStyling.scss';

function Player(props: {player: any, onPlayerClick: any, selectedPlayer: any;}){
    const [background, setBackground] = useState<string>("white");
    const player = props.player;

    useEffect(function loadPlayerIcon() {
        var ip = new IpAddress();
        fetch(`http://${ip.getIP()}:8080/minecraft/player/icon`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({displayname: player.Displayname})
        }).then(res => res.json())
        .then(json => {
            player.Image = json.Image
        });
    }, [props.selectedPlayer]);
    useEffect(function updateBackground(){
        if (props.selectedPlayer != null){
            console.log(props.selectedPlayer.Displayname)
            if (props.selectedPlayer.Displayname === player.Displayname){
                if (background === "lime"){
                    setBackground("white");
                    props.onPlayerClick(null)
                }else setBackground("lime");
            }else setBackground("white");
        }else setBackground("white");
    }, [props.selectedPlayer]);
    return (
        <div className="playertab" style={{backgroundColor: background}} onClick={() => props.onPlayerClick(player)}>
            <div className="playertab-icon"><img src={player.Image} /></div>
            <div className='playertab-verticalline'>|</div>
            <Tooltip title={"UUID: " + player.UUID}>
                <div className="playertab-playername">{player.Displayname}</div>
            </Tooltip>
            <div className='playertab-verticalline'>|</div>
            <Tooltip title='Player operator status'>
                <div className="playertab-status">OP: {player.Op}</div>
            </Tooltip> 
            <div className='playertab-verticalline'>|</div>
            <Tooltip title='Het publiek IP van de speler'>
                <div className="playertab-ip">Ip: {player.Ip}</div>
            </Tooltip> 
        </div>
    );
}
export default Player;