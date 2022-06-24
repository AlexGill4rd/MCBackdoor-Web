import { useEffect, useState } from 'react';

import { Menu, MenuItem, MenuHeader } from "@szhsin/react-menu";
import { socket } from '../../../../socket/socket';
import './BannedPlayersStyle.scss';

import UndoIcon from '@mui/icons-material/Undo';
import InfoIcon from '@mui/icons-material/Info';
import InfoBannedModal from './banned/InfoBannedModal';

function BannedPlayers(props: {Server: any}) {
    const [bannedPlayers, setBannedPlayers] = useState<any[]>([]);
    const [shownBannedPlayers, setShownBannedPlayers] = useState<any[]>([]);
    const [bannedSearch, setBannedSearch] = useState<string>("");

    //UPDATE THE BANNED PLAYERS
    useEffect(function updateBannedPlayers(){
        socket.on(`server:get-banlist-${props.Server.Servername}`, players => {
            setBannedPlayers(players)
        });
    }, []);
    //REQUEST FOR BANNED PLAYERS
    useEffect(function loadPlayerList(){
        socket.emit("feature:server", socket.id, props.Server.Servername, "banned", {});
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
        setShownBannedPlayers(sort_by_key(shownList, "Displayname"));
    }, [bannedPlayers, bannedSearch]);

    //MENU HANDLERS
    function handleUnban(player: any){
        socket.emit("feature:server", socket.id, props.Server.Servername, "unban", {Player: player.UUID});
    }
    const [infoBannedModalOpen, setBannedModalOpen] = useState<boolean>(false);
    const [infoPlayer, setInfoPlayer] = useState<any>(undefined);
    
    function handlePlayerInfo(player: any){
        setInfoPlayer(player);
        setBannedModalOpen(true);
    }
    function handleCloseBannedModal(){
        setInfoPlayer(undefined)
        setBannedModalOpen(false);
    }
    function sort_by_key(array: any, key: any){
        return (array.sort(function(a:any,b:any){
            var x = a[key].toLowerCase() < b[key].toLowerCase()? -1:1; 
            return x; 
        }))
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
            {infoBannedModalOpen && <InfoBannedModal Player={infoPlayer} onCancel={handleCloseBannedModal} />}
        </div>
    );
}
export default BannedPlayers;