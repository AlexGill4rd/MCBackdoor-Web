import { useEffect, useState } from 'react';

import { Menu, MenuItem, MenuHeader } from "@szhsin/react-menu";
import { socket } from '../../../../socket/socket';
import './BannedPlayersStyle.scss';

import UndoIcon from '@mui/icons-material/Undo';
import InfoIcon from '@mui/icons-material/Info';
import IpAddress from '../../../../IpAddress';

function BannedPlayers(props: {Server: any}) {
    const [bannedPlayers, setBannedPlayers] = useState<any[]>([]);
    const [shownBannedPlayers, setShownBannedPlayers] = useState<any[]>([]);
    const [bannedSearch, setBannedSearch] = useState<string>("");

    //UPDATE THE BANNED PLAYERS
    useEffect(function updateBannedPlayers(){
        socket.on(`server:server-banned-${props.Server.Servername}`, data => {
            if (data.length <= 0){
                setBannedPlayers([])
                return;
            }
            var ip = new IpAddress();
            fetch(`http://${ip.getIP()}:8080/players/transform`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({Players: data, token: "6969"})
            }).then(res => res.json())
            .then(json => {
                setBannedPlayers(json)
            });
        });
    }, []);
    //REQUEST FOR BANNED PLAYERS
    useEffect(function loadPlayerList(){
        var data = {
            Servername: props.Server.Servername,
            Feature: "banned"
        }
        socket.emit("client:server-features", data);
    }, []);

    //BANNED PLAYER SORTING ON DISPLAYNAME
    function handleSearchChange(e:any){
        setBannedSearch(e.target.value)
    }
    useEffect(function updateShownPlayers() {
        var shownList:any[] = [];
        bannedPlayers.map((banned:any) => {
            if (banned.Displayname.toLowerCase().startsWith(bannedSearch.toLowerCase()) || bannedSearch === "")
                shownList.push(banned); 
        })
        setShownBannedPlayers(shownList);
    }, [bannedPlayers, bannedSearch]);

    //MENU HANDLERS
    function handleUnban(player: any){
        var data = {
            Servername: props.Server.Servername,
            Player: player.UUID,
            Feature: "unban"
        }
        socket.emit("client:server-features", data);
    }
    function handlePlayerInfo(player: any){

    }
    return (
        <div className='bannedpanel'>
            <div className='bannedpanel-sorting'>
                <input autoComplete="off" type="text" onChange={handleSearchChange} value={bannedSearch} id="bannedplayer" name="bannedplayer" placeholder="Zoek een speler..." />
            </div>
            <div className='bannedpanel-divider'>Banned Players</div>
            <div className='bannedpanel-banned'>
                <div className='bannedpanel-banned-list'>
                    {shownBannedPlayers.length > 0 ? shownBannedPlayers.map((banned: any) => {
                        return (
                            <Menu key={banned.UUID} className='item-contextmenu' menuButton={
                                <div className="bannedpanel-player">
                                    <div className="bannedpanel-player-icon">
                                        <img src={banned.Icon} />
                                    </div>
                                    <div className="bannedpanel-player-displayname">
                                        {banned.Displayname}
                                    </div>
                                </div>
                            }>
                                <MenuHeader>Optie's</MenuHeader>
                                <MenuItem className='item-context-button' onClick={() => handleUnban(banned)}><UndoIcon /><span>Unban player</span></MenuItem>
                                <MenuItem className='item-context-button' onClick={() => handlePlayerInfo(banned)}><InfoIcon /><span>Player Info</span></MenuItem>
                            </Menu>
                        );
                    }) : <div className='bannedpanel-banned-message'>Geen verbannen spelers gevonden</div>}
                </div>
            </div>
        </div>
    );
}
export default BannedPlayers;